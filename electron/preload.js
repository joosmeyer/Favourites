const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("favouritesAPI", {
  getLastPath: () => ipcRenderer.invoke("get-last-path"),
  rememberPath: (filePath) => ipcRenderer.invoke("remember-path", filePath),
  readFile: (filePath) => ipcRenderer.invoke("read-file", filePath),
  writeFileVerified: (filePath, text) => ipcRenderer.invoke("write-file-verified", filePath, text),
  chooseOpen: () => ipcRenderer.invoke("choose-open"),
  chooseSaveNew: () => ipcRenderer.invoke("choose-save-new"),
  chooseBackupSave: () => ipcRenderer.invoke("choose-backup-save"),
  writeFile: (filePath, text) => ipcRenderer.invoke("write-file-verified", filePath, text),
  onSwitchFileRequested: (callback) => ipcRenderer.on("menu-switch-file", callback),
});
