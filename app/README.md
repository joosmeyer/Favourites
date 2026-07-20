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
