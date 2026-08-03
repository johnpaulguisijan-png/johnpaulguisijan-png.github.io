# johnpaulguisijan-png.github.io

Portfolio site for **John Paul Guisijan** — Shopify developer & conversion specialist.
Single-file static site, no build step. GitHub Pages serves `index.html` from the repo root.
All assets live at the root (GitHub Pages is case-sensitive — keep filenames lowercase).

`resume.html` is the CV/résumé page (brand-matched, print-to-PDF ready). It's linked from the
site footer and contact section, and lives at `johnpaulguisijan-png.github.io/resume.html`.

## Featured case studies (3)

| Brand | Screenshot | Video to add (optional) |
|-------|-----------|-------------------------|
| Baby Delight | `babydelight.jpg` | `babydelight.mp4` |
| Omada Golf | `omadagolf.jpg` | `omadagolf.mp4` |
| Stencil Stop | `stencilstop.jpg` | `stencilstop.mp4` |

## More work (one grid)

`vestnetz` · `homirie` · `cozeymaison` · `requipco` · `kopelit` · `joovy` · `zenbodi` · `electrogum` · `phantomfarms` · `phantomfarms-com`

Note: `phantomfarms.jpg` = Phantom Farms **Brewing** (phantomfarmsbrewing.com);
`phantomfarms-com.jpg` = Phantom Farms **farm & bakery** (phantomfarms.com) — two different stores.

(each has a matching `.jpg`; add a same-named `.mp4` for a hover video)

## Video previews

Each card plays a short screen recording on hover (desktop) / in-view (mobile), and falls back
to the screenshot if no video exists — so you can add them one at a time. Record 8–12 seconds of
slow scrolling in an incognito Chrome window, then compress under 2 MB:

```bash
ffmpeg -i raw.mp4 -vf "scale=1280:-2,fps=24" -c:v libx264 -crf 30 -preset slow \
  -movflags +faststart -an vestnetz.mp4
```

## Before relying on it publicly — edit checklist

- **Metrics** — figures marked `data-edit="metric"` (in the case-study KPIs) are illustrative.
  Replace with real numbers where you have them, or keep the qualitative labels.
- **Testimonials** — the section "Why brands work with me" sells on substance. When you have
  REAL client quotes, search `REAL TESTIMONIALS GO HERE` in `index.html` for a ready template.
- **CV** — search `CV SLOT` in the About section to add real credentials.
