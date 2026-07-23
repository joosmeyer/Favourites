# Favourites

A replacement for the Edge favourites bar that keeps working even when Edge wipes its
profile every session. It's a single web page (`favourites.html`) that saves your tiles
straight to a JSON file on disk — not inside the browser — so nothing gets lost between
sessions.

## Setup (one time)

1. Put this whole `app` folder somewhere on your shared drive (or anywhere else you like —
   your OneDrive, a local folder, etc).
2. Double-click `favourites.html`. It opens in your default browser.
3. Click **✨ Create new file** and save it as `favourites-data.json` in the same folder
   (the picker will suggest that name — just confirm the location).
4. Start adding sites with **+ Add**. Every change saves to that JSON file automatically.

## Quick Launch

The **🚀 Quick Launch** row under the header lets you group a handful of your favourites
under one named button — e.g. a "Morning Routine" button that opens your mail, calendar,
and ticket board all at once. Click **+ New**, name it, and tick which pages it should
open. Click the button itself to launch everything in it (each page opens in a new tab);
hover it for edit/delete icons. Quick Launch groups just reference your existing tiles,
so add the sites as favourites first, then group them.

## Launching apps, not just websites

When adding or editing a favourite, set **Type** to **💻 App / local link** instead of
Website. The link field then accepts a Windows-registered link type instead of a URL —
e.g. `outlook:`, `slack://open`, `teams:`, `zoommtg://`, `spotify:`. Clicking the tile
asks Windows to open that app directly, the same way clicking a Zoom or Slack link in an
email does.

This only works for apps that register a link type like that — most major apps do, but
there's no browser-safe way to launch an arbitrary `.exe` with no such link type.
Browsers deliberately block web pages from launching arbitrary local programs; a
registered link type is the one sanctioned exception. If you're not sure whether an app
has one, a quick web search for "*app name* URL scheme" or "*app name* URI handler"
usually turns it up.

### Make it feel like a single icon

Right-click `favourites.html` → **Send to → Desktop (create shortcut)**. You can rename
the shortcut and give it a custom icon via the shortcut's **Properties → Change Icon**
(Windows ships a star icon inside `imageres.dll` and `shell32.dll` if you want one).
Pin that shortcut to your taskbar or Start menu — that's your one-click favourites bar.

## Requirements

Needs a recent version of Microsoft Edge or Google Chrome (the app uses the File System
Access API to save directly to disk). If your browser doesn't support it, the app will
say so clearly on launch rather than failing silently.

## Sharing with colleagues

Give a colleague a copy of this whole `app` folder. Each person keeps their own
`favourites-data.json` — this is one app per person, not a shared live file, so there's
nothing to conflict over. If you improve `favourites.html` later (a bug fix, a new
feature), you can hand out just that updated file — everyone's own data file is untouched
since it's stored separately.

## Notes

- The first time you open the app on a given machine, and after any full browser
  restart, you'll get a single "Reconnect" click before it can save again — this is a
  browser security requirement, not a bug.
- Site icons are fetched once when you add a tile and stored permanently in the JSON, so
  the app doesn't need the internet to display them later (sites with no accessible
  favicon get a plain initials icon instead).
- Opening the same `favourites-data.json` in two windows and editing both at once will
  overwrite whichever saves last — this app isn't a real-time sync tool.
- If a Quick Launch group only opens its first page, your browser's pop-up blocker
  probably caught the rest — allow pop-ups for this page (Edge/Chrome will show a blocked
  icon in the address bar the first time this happens).
