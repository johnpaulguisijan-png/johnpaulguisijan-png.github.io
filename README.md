# Project video previews

Each project card looks for a short screen recording here. Until you add one, the card shows a
branded "Preview loading" placeholder — so nothing looks broken and you can add these one at a time.
Start with the three featured cases at the top of the Work section; they get the most attention.

## Filenames (must match exactly)

| Project                | Video                 | Poster still         |
|------------------------|-----------------------|----------------------|
| King & Fifth *(featured)* | `king-and-fifth.mp4` | `king-and-fifth.jpg` |
| Joovy *(featured)*     | `joovy.mp4`           | `joovy.jpg`          |
| CosMedical *(featured)*| `cosmedical.mp4`      | `cosmedical.jpg`     |
| Omada Golf             | `omadagolf.mp4`       | `omadagolf.jpg`      |
| Baby Delight           | `babydelight.mp4`     | `babydelight.jpg`    |
| Zenbodi                | `zenbodi.mp4`         | `zenbodi.jpg`        |
| Stencil Stop           | `stencilstop.mp4`     | `stencilstop.jpg`    |
| ElectroGum             | `electrogum.mp4`      | `electrogum.jpg`     |
| Phantom Farms Brewing  | `phantomfarms.mp4`    | `phantomfarms.jpg`   |
| PowerPets              | `powerpets.mp4`       | `powerpets.jpg`      |
| ShopMachete            | `shopmachete.mp4`     | `shopmachete.jpg`    |
| BoughtNex              | `boughtnex.mp4`       | `boughtnex.jpg`      |
| Petspace               | `petspace.mp4`        | `petspace.jpg`       |

## How to record one (about 5 minutes per project)

1. Open the live site in Chrome at 1440×900, hide bookmarks, use an incognito window so no
   extensions or profile chrome appear.
2. Record 8–12 seconds: land on the homepage, scroll smoothly through the hero and one
   product/collection section, hover a product, open the cart. Slow, deliberate movement —
   fast scrolling looks cheap.
3. Trim to the best 8–12 seconds. It loops, so make the first and last frame similar.

Windows: `Win + Alt + R` (Xbox Game Bar) or ShareX. Mac: `Cmd + Shift + 5`.

## Compress before you ship

Aim for **under 2 MB per clip** — the whole point is that the site stays fast. With ffmpeg:

```bash
ffmpeg -i raw.mp4 -vf "scale=1280:-2,fps=24" -c:v libx264 -crf 30 -preset slow \
  -movflags +faststart -an king-and-fifth.mp4
```

`-an` strips the audio track (the videos are muted anyway, so audio is pure dead weight).

## Poster stills

Grab a frame from the same recording so the still and the video match:

```bash
ffmpeg -i king-and-fifth.mp4 -vf "select=eq(n\,0)" -q:v 3 king-and-fifth.jpg
```

## Playback behaviour (already built into the page)

- Video is only downloaded once the card scrolls into view — nothing loads above the fold.
- Desktop: plays on hover, pauses on leave.
- Mobile/touch: plays while the card is on screen, pauses when it scrolls away.
- Missing or broken file: the placeholder (or poster still) stays put, silently.
