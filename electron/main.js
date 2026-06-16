const path = require("node:path");
const { app, BrowserWindow, shell, systemPreferences } = require("electron");

app.commandLine.appendSwitch("disable-renderer-backgrounding");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1180,
    height: 900,
    minWidth: 960,
    minHeight: 720,
    title: "Posture Pulse",
    backgroundColor: "#0f1b2e",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      backgroundThrottling: false
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  mainWindow.loadFile(path.join(__dirname, "..", "index.html"));
}

async function requestCameraAccess() {
  if (process.platform !== "darwin") {
    return;
  }

  const status = systemPreferences.getMediaAccessStatus("camera");
  if (status === "not-determined") {
    await systemPreferences.askForMediaAccess("camera");
  }
}

app.whenReady().then(async () => {
  await requestCameraAccess();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
