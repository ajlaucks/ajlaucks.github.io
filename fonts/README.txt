# fonts/

Place your Basier Square font files in this folder.

Required files (exact names must match):
  BasierSquare-Regular.woff2
  BasierSquare-Regular.woff
  BasierSquare-SemiBold.woff2
  BasierSquare-SemiBold.woff

These are referenced in style.css via @font-face.
If your font files have different names, either rename them
or update the src: paths in the @font-face blocks at the
top of style.css to match.

If you only have .woff2 files (no .woff), that is fine —
delete the woff lines from the @font-face blocks in style.css.
woff2 is supported by all modern browsers.
