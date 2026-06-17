# old.osipov.ru recovery notes

## Current project
- Project root: /Users/ilya000/Dropbox/Claude My/old.osipov.ru
- Intended GitHub Pages domain: `old.osipov.ru`
- Site files outside `_backup`: 231
- Archive/no-git files inside `_backup`: 313
- HTML pages: 58

## Important recovered items
- `hookdump.zip` recovered locally and copied to project root; deliberately unignored so it is part of the public project.
- `hookdump.zip` SHA-256: `4a28eff0883fda50483cd559ee5ce54e06d0248683db0b22ab61e8d5b58bbeb5`.
- HookDump source/project folders copied into `_backup/no-git/hookdump/`.
- Full local source candidate copied into `_backup/no-git/local-source-candidates/ILYA.NN.RU-from-NNRUComp-2004`.
- Wayback metadata for both `old.osipov.ru` and `www.ilya.nn.ru` is in `_backup/wayback-metadata/`.
- Added six files from `www.ilya.nn.ru` Wayback: `clock2.htm`, `clock3.htm`, `foto/cz_3.jpg`, `c.dashb1.gif`, `c.rol.gif`, `c.sunset.gif`.
- Added compatibility aliases `dashb1.gif`, `rol.gif`, `sunset.gif`, plus local `globe.gif` and `view.gif` candidates.

## Site file types
- .arj: 1
- .class: 1
- .gif: 55
- .htm: 56
- .html: 2
- .jpg: 9
- .js: 1
- .md: 3
- .zip: 101
- [no ext]: 2

## Recovered from a fuller local archive (April 2007 copy)
Source: `…/Личные документы/Архив старья и ерунды/(раб комп) апрел 2007/ilya000/ilya-nnru/Sites/ILYA.NN.RU`
(and `…/2007/ilya000/ilya-nnru/.../REF`). These files were missing from the
original "From NNRUComp 12-06-2004" source and recovered here. Clock-face GIFs
were stored under DOS 8.3 names (`CROUND~1.GIF`, `CNZ~1.GIF`, `CDASHB~2..7.GIF`);
identity confirmed by byte-for-byte hash match against the already-restored
faces (`CROL~1.GIF` == `rol.gif`, `CDASHB~1.GIF` == `dashb1.gif`, etc.).
- `Clockconkit.class` (now in `original-java/`)
- `round1.gif`, `nz.gif` + `NZ.GIF`, `dashb2.gif`..`dashb7.gif`, `bpswd.gif`

## Still missing local targets (genuinely lost / impossible on static hosting)
- `cgi-bin/Count.cgi` — server-side WWWcount (Count.cgi) hit-counter in
  `display=clock` mode; dynamic CGI, cannot exist on a static host.
- `ref/k_io_63.zip`, `ref/k_io_96.zip`..`ref/k_io_100.zip` — never present in
  any local copy (the fullest REF holds only `k_io_01..95`, minus 63); gaps in
  the original collection.
- `xxxxxx.gif` — placeholder-named clock face; no real file found in any copy.

The broken relative link `www.ilya.nn.ru` in `t_tkod.htm` was repaired to
`http://old.osipov.ru/`.

## Suggested source cleanup / move candidates
Do not delete immediately. After manual verification, these old source folders are likely duplicate sources because their relevant contents were copied into `_backup/no-git`:
- `/Users/ilya000/Dropbox/D-Documents/Архив/2007/iLya/From NNRUComp 12-06-2004/Sites/ILYA.NN.RU`
- `/Users/ilya000/Dropbox/D-Documents/Архив/2007/iLya/From NNRUComp 12-06-2004/hookproj`
- `/Users/ilya000/Dropbox/D-Documents/Архив/2007/iLya/From MedservisComp/MY_PROG/HOOK`

## Safety
HookDump files are preserved as historical artifacts only. Do not execute the Windows binaries on a live machine.

## Backup layout

`_backup/` is ignored by git and contains all collected source material and metadata. The restored static site lives in the project root.

- `_backup/wayback-metadata/` - Internet Archive CDX/manifests/audits.
- `_backup/no-git/hookdump/` - HookDump local historical files and Delphi/Pascal project material.
- `_backup/no-git/local-source-candidates/ILYA.NN.RU-from-NNRUComp-2004/` - local source copy used to fill missing files.
