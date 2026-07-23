const { app, BrowserWindow, ipcMain, dialog, shell, Menu } = require("electron");
const path = require("path");
const fs = require("fs/promises");

const CONFIG_PATH = path.join(app.getPath("userData"), "config.json");

async function readConfig() {
  try {
    return JSON.parse(await fs.readFile(CONFIG_PATH, "utf8"));
  } catch {
    return {};
  }
}

async function writeConfig(partial) {
  const current = await readConfig();
  const next = { ...current, ...partial };
  await fs.mkdir(path.dirname(CONFIG_PATH), { recursive: true });
  await fs.writeFile(CONFIG_PATH, JSON.stringify(next, null, 2), "utf8");
  return next;
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 760,
    minWidth: 640,
    minHeight: 480,
    title: "Favourites",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });
  mainWindow.loadFile(path.join(__dirname, "renderer", "index.html"));

  const menu = Menu.buildFromTemplate([
    {
      label: "File",
      submenu: [
        {
          label: "Switch Data File…",
          click: () => mainWindow.webContents.send("menu-switch-file"),
        },
        {
          label: "Reveal Data File in Folder",
          click: async () => {
            const { dataFilePath } = await readConfig();
            if (dataFilePath) shell.showItemInFolder(dataFilePath);
          },
        },
        { type: "separator" },
        { role: "quit" },
      ],
    },
    { role: "editMenu" },
    {
      label: "View",
      submenu: [{ role: "reload" }, { role: "toggleDevTools" }],
    },
  ]);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// ---------- IPC: data file access ----------
// Unlike the browser version, there's no permission model to fight here --
// once a path is remembered, every future launch reads it directly, no prompt.

ipcMain.handle("get-last-path", async () => {
  const { dataFilePath } = await readConfig();
  return dataFilePath || null;
});

ipcMain.handle("remember-path", async (_event, filePath) => {
  await writeConfig({ dataFilePath: filePath });
});

ipcMain.handle("read-file", async (_event, filePath) => {
  return fs.readFile(filePath, "utf8");
});

// Writes, then reads the file back and compares -- catches the same class of
// silent-failure (antivirus/EDR/sync-client interference) the web version guards
// against, just implemented with real filesystem calls instead of browser APIs.
ipcMain.handle("write-file-verified", async (_event, filePath, text) => {
  await fs.writeFile(filePath, text, "utf8");
  const readBack = await fs.readFile(filePath, "utf8");
  if (readBack !== text) {
    throw new Error(
      "File on disk doesn't match what was just written -- something is reverting or blocking the save (antivirus/EDR and synced-folder tools are common causes)."
    );
  }
});

ipcMain.handle("choose-open", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: "Open your favourites data file",
    filters: [{ name: "Favourites data", extensions: ["json"] }],
    properties: ["openFile"],
  });
  if (result.canceled || result.filePaths.length === 0) return null;
  return result.filePaths[0];
});

ipcMain.handle("choose-save-new", async () => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: "Create your favourites data file",
    defaultPath: "favourites-data.json",
    filters: [{ name: "Favourites data", extensions: ["json"] }],
  });
  if (result.canceled || !result.filePath) return null;
  return result.filePath;
});

ipcMain.handle("choose-backup-save", async () => {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const result = await dialog.showSaveDialog(mainWindow, {
    title: "Save backup",
    defaultPath: `favourites-data-backup-${stamp}.json`,
    filters: [{ name: "Favourites data", extensions: ["json"] }],
  });
  if (result.canceled || !result.filePath) return null;
  return result.filePath;
});
