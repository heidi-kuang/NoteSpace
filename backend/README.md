This is an API that uses PyMuPDF to add side margins to PDFs.
Users have these options:
- margin_ratio: float (default: 0.5). Add this percentage of the original width as margin
- clip_rhs: float (default: 0.0). Clip off right-hand side of the page by this percentage of the original width
- clip_lhs: float (default: 0.0). Clip off left-hand side of the page by this percentage of the original width
- anchor: string (default: "left"). Where to anchor the original content. Options: "left", "center", "right"
- desc: string (default: "1"). For naming the output file, used for debugging purposes.

I'm hosting this on Render.
