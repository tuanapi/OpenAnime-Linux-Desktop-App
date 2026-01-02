const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const URL = "https://openani.me";

// --- GPU Configuration (WebGPU always enabled) ---
// Electron 35+ with Chromium 132+ fixes the 4K color bug on NVIDIA
app.commandLine.appendSwitch("enable-features", "Vulkan");
app.commandLine.appendSwitch("enable-unsafe-webgpu");
app.commandLine.appendSwitch("ignore-gpu-blocklist");
app.commandLine.appendSwitch("ozone-platform", "x11");

let mainWindow = null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: path.join(__dirname, "icon512.png"),
    frame: false,
    autoHideMenuBar: true,
    resizable: true,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
      sandbox: false,
      partition: "persist:openanime"
    }
  });

  // Lock navigation to openani.me
  mainWindow.webContents.on("will-navigate", (e, url) => {
    if (!url.startsWith(URL)) e.preventDefault();
  });
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith(URL)) return { action: "deny" };
    return { action: "allow" };
  });

  mainWindow.loadURL(URL);

  // Handle Keyboard Shortcuts
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.type !== 'keyDown') return;

    // ESC -> Quit Application
    if (input.key === 'Escape') {
      app.quit();
    }
  });
}

app.whenReady().then(() => {
  createMainWindow();
});

// IPC for Window Controls
ipcMain.on('window-control', (event, action) => {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  if (!win) return;

  switch (action) {
    case 'minimize': win.minimize(); break;
    case 'maximize': win.setFullScreen(!win.isFullScreen()); break;
    case 'close': win.close(); break;
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
