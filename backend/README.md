This is an API that uses PyMuPDF to manipulate pdfs.
Users have these options:
- margin_ratio: float (default: 0.5). Add this percentage of the original width as margin
- clip_rhs: float (default: 0.0). Clip right-hand side of the page by this percentage
- anchor: string (default: "left"). Where to anchor the original content. Options: "left", "center", "right"
- desc: string (default: "1"). For naming the output file, used for debugging purposes.

I'm hosting this on Render.
