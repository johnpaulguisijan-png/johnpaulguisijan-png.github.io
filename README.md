# johnpaulguisijan-png.github.io

Portfolio site for **John Paul Guisijan** — Shopify growth engineer.
Single-file static site, no build step. GitHub Pages serves `index.html` from the repo root.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The entire site — HTML, CSS, and JS in one file. |
| `johnpaul.jpg` | Portrait used in the hero. |
| `*.jpg` | Live-store screenshots (`joovy.jpg`, `king-and-fifth.jpg`, …). |

**All files live at the repo root — no subfolders.** GitHub Pages is case-sensitive, so keep every
filename lowercase, exactly as referenced in `index.html`.

## Adding video previews

Each project card plays a short screen recording on hover (desktop) or when scrolled into view
(mobile). It falls back to the screenshot if no video exists, so you can add these one at a time.

Upload an `.mp4` to the repo root using the **same base name** as the screenshot:

| Project | Screenshot | Video to add |
|---------|-----------|--------------|
| King & Fifth *(featured)* | `king-and-fifth.jpg` | `king-and-fifth.mp4` |
| Joovy *(featured)* | `joovy.jpg` | `joovy.mp4` |
| CosMedical *(featured)* | `cosmedical.jpg` | `cosmedical.mp4` |
| Omada Golf | `omadagolf.jpg` | `omadagolf.mp4` |
| Baby Delight | `babydelight.jpg` | `babydelight.mp4` |
| Zenbodi | `zenbodi.jpg` | `zenbodi.mp4` |
| Stencil Stop | `stencilstop.jpg` | `stencilstop.mp4` |
| ElectroGum | `electrogum.jpg` | `electrogum.mp4` |
| Phantom Farms Brewing | `phantomfarms.jpg` | `phantomfarms.mp4` |
| PowerPets | `powerpets.jpg` | `powerpets.mp4` |
| BoughtNex | `boughtnex.jpg` | `boughtnex.mp4` |
| ShopMachete | *(none — site is password-protected)* | `shopmachete.mp4` |
| Petspace | *(none — no public URL)* | `petspace.mp4` |

### Recording one

Open the live store in Chrome at 1440×900 in an incognito window (no bookmarks bar, no extensions).
Record 8–12 seconds of slow, deliberate scrolling through the hero and a product section. It loops,
so make the first and last frame similar. Windows: `Win + Alt + R`. Mac: `Cmd + Shift + 5`.

### Compressing (do this — keep the site fast)

Target **under 2 MB per clip**. GitHub Pages has a soft 1 GB repo limit, but the real constraint is
your visitors' patience.

```bash
ffmpeg -i raw.mp4 -vf "scale=1280:-2,fps=24" -c:v libx264 -crf 30 -preset slow \
  -movflags +faststart -an joovy.mp4
```

`-an` strips audio (the videos are muted anyway).

## Before you publish — outstanding items

- **Testimonials are placeholders.** The three quotes attributed to "Andrew K.", "Sarah J." and
  "Marcus V." are not real client statements. Search `data-placeholder="testimonial"` in
  `index.html`. Replace with genuine quotes or delete the section.
- **Some metrics are illustrative.** Search `data-edit="metric"` and swap in real figures from
  Shopify Analytics / Lighthouse.
