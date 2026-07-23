# Favourites (desktop app)

A real desktop version of the Favourites app, built with Electron. Unlike the browser
version in `../app/`, this has no permission prompts to fight — once you pick your data
file the first time, it's remembered permanently (via a small config file Electron
manages itself), and every future launch just opens straight to your tiles, connected
and ready to save, no click required.

This is a fork of the browser version, not a replacement for it — `../app/favourites.html`
still works standalone with nothing installed. This version trades that "just a file,
nothing to install" simplicity for a much more reliable connect experience, at the cost
of needing Node/Electron installed to build and run it.

## Try it (development mode)

Requires [Node.js](https://nodejs.org) installed.

```
cd electron
npm install
npm start
```

First launch: click **Open existing file** (if you already have a `favourites-data.json`
from the browser version — this is a straight import, same format) or **Create new
file**. Every launch after that opens straight to your tiles automatically.

## What's different from the browser version

- **No repeated "reconnect" prompts.** The remembered file path lives in a real local
  config file (`%APPDATA%\Favourites\config.json` on Windows), not browser storage, so
  it isn't affected by whatever's wiping your Edge profile between sessions.
- **A name, always visible.** Click the ✎ next to the title to label this file (e.g.
  "Joos's Favourites") — shown in the header at all times, along with the full path of
  the connected file, so it's always obvious which database you're in.
- **File menu → Switch Data File…** to point the app at a different file without
  reinstalling anything, and **Reveal Data File in Folder** to jump straight to it in
  Explorer.
- Save verification and the backup-download safety net both carry over unchanged from
  the browser version — a save is still confirmed by reading the file back, and a red
  banner with a backup button still appears if something's actually wrong.
- Everything else (tiles, folders, drag-and-drop, search, Quick Launch, icon fetching)
  is identical to the browser version — same code, same behavior.

## Building a distributable

```
npm run dist
```

This uses `electron-builder` to produce a Windows installer (NSIS) and a portable `.exe`
in `electron/dist/`. **I haven't been able to run this build step myself** — the sandbox
this was written in blocks downloading the Electron binary at all (an organization
network policy, not a bug), so `npm install` and everything downstream of it needs to
run on your own machine to actually try this. The source code is syntax-checked and the
file-saving logic is unit-tested in isolation, but the app itself — the window opening,
the file pickers, the menu — has not been run end to end by me. Please treat this as an
untested first cut to try, not a finished, verified build.

## Distributing to colleagues

Once built, `npm run dist` produces a normal Windows installer/exe — send that instead of
a folder of files. Each colleague gets their own independent install with their own
remembered data file, same as the browser version's "one app per person" model.
