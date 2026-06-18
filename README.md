# old.osipov.ru

This repository is a restored static archive of Ilya Osipov's early personal
website from the late 1990s and early 2000s.

The goal of this project is historical preservation rather than modernization.
The site intentionally keeps its original table-based layout, small GIF assets,
period banners, old counters, ZIP/ARJ downloads, and the slightly chaotic charm
of a personal homepage from that era.

## Published Site

The restored site is intended to be published at:

https://old.osipov.ru

GitHub Pages configuration is included:

- `CNAME` points to `old.osipov.ru`
- `.nojekyll` disables Jekyll processing
- the static site is served directly from the repository root

## What Was Restored

The restoration combines several sources:

- local historical copies of the original site
- Internet Archive / Wayback Machine captures
- recovered images, archives, clock assets, and old program downloads
- original HTML snapshots preserved under `original-html/`

The active restored pages live in the repository root. They are lightly repaired
so they work as a static site on modern hosting while staying visually and
structurally close to the originals.

Notable restoration work includes:

- preserving the original Russian and English pages
- recovering many old GIF/JPG assets and downloadable archives
- restoring the HookDump 2.8 pages and download
- replacing dead Java applet clocks with a canvas-based reconstruction
- restoring period banner rotation
- hiding or neutralizing broken external counters and images where necessary
- repointing some dead historical links to Internet Archive snapshots

## Repository Layout

- `index.html` — restored Russian homepage
- `proge.htm` — English programs page
- `prog.htm` — Russian programs page
- `anec*.htm`, `a_*.htm` — restored humor/anecdote sections
- `clock*.htm` — restored clock pages
- `ref/` — restored coursework/reference archive
- `foto/` — restored photo materials
- `original-html/` — preserved original HTML versions for comparison
- `original-java/` — preserved Java applet/class artifacts
- `archive.css` — compatibility CSS used to keep old pages usable
- `clock-canvas.js` — modern canvas replacement for old Java clock applets
- `era-banners.js` — recreated period-style banner rotation
- `fix-images.js` — small compatibility helper for broken historical images
- `RECOVERY_NOTES.md` — detailed restoration notes and source provenance
- `RESTORATION_AUDIT.md` — restoration audit generated during recovery
- `_backup/` — ignored local backup/source material, not part of the public site

## Local Preview

From the repository root:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173/
```

## Historical Fidelity

This project deliberately does not try to make the old site feel modern.
Small layout quirks, old fonts, broken-era link culture, counters, banner
placements, and table layouts are part of the artifact.

Changes are limited to:

- making pages load on static hosting
- recovering missing assets where possible
- documenting places where dynamic CGI/Java-era behavior cannot be reproduced
- keeping dangerous or obsolete executable material as historical downloads only

## Known Limitations

Some original functionality cannot be reproduced exactly on GitHub Pages:

- server-side CGI counters are gone
- external guestbooks and banner networks are mostly dead
- Java applets no longer run in modern browsers
- a few archive files from the original `ref/` collection remain missing

See `RECOVERY_NOTES.md` for details.

## Safety Note

Some preserved downloads are historical Windows software archives. They are kept
for archival purposes only. Do not run old binaries on a live machine.
