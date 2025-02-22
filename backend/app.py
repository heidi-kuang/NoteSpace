import os
import fitz  # PyMuPDF
from flask import Flask, request, send_file
from flask_cors import CORS
from utils import log_tmp_contents

# note: run pip list --format=freeze > requirements.txt to update dependencies

app = Flask(__name__)
CORS(app, expose_headers="Content-Disposition", origins=["https://notespace-wheat.vercel.app", "http://localhost:5173"])

# Detect if running locally or in production. 
# If testing locally, before `flask run`, run `export FLASK_ENV=development`
IS_LOCAL = os.getenv("FLASK_ENV") == "development"

UPLOAD_FOLDER = "uploads" if IS_LOCAL else "/tmp/uploads"
OUTPUT_FOLDER = "processed" if IS_LOCAL else "/tmp/processed"

if IS_LOCAL:
  # Ensure folders exist
  os.makedirs(UPLOAD_FOLDER, exist_ok=True)
  os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# Allowed file types
ALLOWED_EXTENSIONS = {"pdf"}

@app.route("/")
def home():
    return "PDF Margin API is running!"

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def add_margins(input_pdf_path, output_pdf_path, margin_ratio=0.5, clip_rhs=0.0, clip_lhs=0.0, anchor="left"):
    """
    Adds a right-hand margin to each page of the PDF.
    
    :param input_pdf_path: Path to input PDF file
    :param output_pdf_path: Path to output PDF file
    :param margin_ratio: Percentage of the original width to add as margin
    :param clip_rhs: Percentage of the right-hand side to clip (default: 0.0)
    """
    doc = fitz.open(input_pdf_path)
    new_doc = fitz.open()

    for page in doc:
        rect = page.rect  # Get original page dimensions

        # clip right hand side of pdf by clip_rhs% of the page width
        if (clip_rhs > 0.0):
            rect = fitz.Rect(rect.tl, (rect.tr[0] * (1 - clip_rhs), rect.br[1])) # new width is clipped, same height
        
        # clip left hand side of pdf by clip_lhs% of the page width
        if (clip_lhs > 0.0):
           print("clip_lhs: ", clip_lhs)
           print("rect before clipping: ", rect)
           rect = fitz.Rect((rect.tl[0] + rect.width * clip_lhs, rect.tl[1]), rect.br) # new width is clipped, same height
           print("rect after clipping: ", rect)
        
        page.set_cropbox(rect)  # Set the cropbox to the new dimensions

        new_width = rect.width * (1 + margin_ratio)  # desired total width
        new_rect = fitz.Rect(0, 0, new_width, rect.height) # new width, same height

        # Create a new blank page with the wider width
        new_page = new_doc.new_page(width=new_rect.width, height=new_rect.height)

        target_rect = None
        # Position the original content on the left (not centered)
        if anchor == "left":
          # target_rect = fitz.Rect(0, 0, rect.width, rect.height) # target rect is same as original rect
          target_rect = rect # target rect is same as original rect
        elif anchor == "center":
          target_rect = fitz.Rect((new_width - rect.width) / 2, 0, (new_width + rect.width) / 2, rect.height)
        elif anchor == "right":
          target_rect = fitz.Rect(new_width - rect.width, 0, new_width, rect.height)

        # Paste original page content
        new_page.show_pdf_page(target_rect, doc, page.number)

    new_doc.save(output_pdf_path)
    new_doc.close()
    doc.close()

# import fitz  # PyMuPDF

# def add_margins(input_pdf_path, output_pdf_path, margin_ratio=0.5):
#     """
#     Adds extra margin only to the right side of each page.
    
#     :param input_pdf_path: Path to the original PDF file
#     :param output_pdf_path: Path to the modified PDF file
#     :param margin_ratio: How much extra space to add (default: 50% of original width)
#     """
#     doc = fitz.open(input_pdf_path)
#     new_doc = fitz.open()

#     for page in doc:
#         original_rect = page.rect  # Get original page dimensions
#         margin_width = original_rect.width * margin_ratio  # Extra width to add

#         # Define new page dimensions (same height, but wider)
#         new_width = original_rect.width + margin_width
#         new_rect = fitz.Rect(0, 0, new_width, original_rect.height)

#         # Create a new blank page
#         new_page = new_doc.new_page(width=new_width, height=original_rect.height)

#         # Position the original content on the left (not centered)
#         target_rect = fitz.Rect(0, 0, original_rect.width, original_rect.height)
        
#         # Copy the original content onto the new page (anchored to the left)
#         new_page.show_pdf_page(target_rect, doc, page.number)

#     # Save modified PDF
#     new_doc.save(output_pdf_path)
#     new_doc.close()

"""
params:
- margin_ratio: float (default: 0.5). Add this percentage of the original width as margin
- clip_rhs: float (default: 0.0). Clip right-hand side of the page by this percentage
- anchor: string (default: "left"). Where to anchor the original content. Options: "left", "center", "right"
- desc: string (default: "1"). For naming the output file, used for debugging purposes.
"""
@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files: # "file" is form-data key
        return {"error": "No file part"}, 400

    file = request.files["file"]
    if file.filename == "":
        return {"error": "No selected file"}, 400
    
    # Get optional margin_ratio from form body (default: 0.5)
    margin_ratio = float(request.form.get("margin_ratio", 0.5))
    
    # Get optional clip_rhs from form body (default: 0.0)
    clip_rhs = float(request.form.get("clip_rhs", 0.0))

    # Get optional clip_rhs from form body (default: 0.0)
    clip_lhs = float(request.form.get("clip_lhs", 0.0))

    # Get optional anchor from form body (default: "left")
    anchor = request.form.get("anchor", "left")

    desc = request.form.get("desc", 1)

    if file and allowed_file(file.filename):
        input_path = os.path.join(UPLOAD_FOLDER, file.filename)

        # name the output file {input_file_name}_NoteSpace.pdf
        input_file_name, ext = os.path.splitext(file.filename)
        output_file_name = f"{input_file_name}_NoteSpace{ext}"

        output_path = os.path.join(OUTPUT_FOLDER, output_file_name)

        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        os.makedirs(OUTPUT_FOLDER, exist_ok=True)

        log_tmp_contents("Before saving the input file", UPLOAD_FOLDER) # print /tmp contents before saving file
        file.save(input_path)
        log_tmp_contents("After saving the input file", UPLOAD_FOLDER) # print /tmp contents after saving file

        add_margins(input_path, output_path, margin_ratio=margin_ratio, clip_rhs=clip_rhs, clip_lhs=clip_lhs, anchor=anchor)
        log_tmp_contents("After processing the file", OUTPUT_FOLDER) # print /tmp contents before after processing file

        return send_file(
           output_path, 
           mimetype="application/pdf", 
           as_attachment=False, 
           download_name=output_file_name
        )

    return {"error": "Invalid file type"}, 400

if __name__ == "__main__":
    app.run(debug=True, port=5000)
