const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const URL = "https://openani.me";
const CONFIG_PATH = path.join(app.getPath("userData"), "gpu-config.json");

// --- 1. Read Config Sync (Before App Ready) ---
let gpuConfig = { useWebGPU: false, skipDialog: false };

// Check for Persistent Config
try {
  if (fs.existsSync(CONFIG_PATH)) {
    const data = fs.readFileSync(CONFIG_PATH, "utf8");
    const parsed = JSON.parse(data);

    // We found a config, so we use it for this session.
    gpuConfig = parsed;
    gpuConfig.skipDialog = true;

    // CRITICAL: If this was a one-time session (remember=false), delete the file NOW.
    // This ensures next launch is clean.
    if (!parsed.remember) {
      try {
        fs.unlinkSync(CONFIG_PATH);
      } catch (e) { console.error("Failed to delete temp config:", e); }
    }
  }
} catch (e) {
  console.error("Config read error:", e);
}

// --- 2. Apply Flags based on Config ---
if (gpuConfig.useWebGPU) {
  // Enhanced Performance Configuration: Enables Vulkan and WebGPU features.
  // Note: May impact color rendering correctness on specific Linux drivers.
  app.commandLine.appendSwitch("enable-features", "Vulkan");
  app.commandLine.appendSwitch("enable-unsafe-webgpu");
  app.commandLine.appendSwitch("ignore-gpu-blocklist");
  app.commandLine.appendSwitch("disable-features", "VulkanVideoDecoder,VulkanVideoDecode");
} else {
  // Compatibility Configuration: Disables hardware acceleration features 
  // to ensure standard rendering compliance and color accuracy.
  app.commandLine.appendSwitch("disable-features", "Vulkan");
}
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

  // Lock navigation
  mainWindow.webContents.on("will-navigate", (e, url) => {
    if (!url.startsWith(URL)) e.preventDefault();
  });
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith(URL)) return { action: "deny" };
    return { action: "allow" };
  });

  mainWindow.loadURL(URL);

  // Handle Keyboard Shortcuts locally (Focused Window Only)
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.type !== 'keyDown') return;

    // ESC -> Quit Application
    if (input.key === 'Escape') {
      app.quit();
    }

    // Shift + O -> Reset Config & Restart (opens dialog)
    if (input.key.toLowerCase() === 'o' && input.shift) {
      try {
        if (fs.existsSync(CONFIG_PATH)) fs.unlinkSync(CONFIG_PATH);
      } catch (e) { }
      app.relaunch();
      app.exit(0);
    }
  });
}

function createSelectionWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 350,
    icon: path.join(__dirname, "icon512.png"),
    // Keep frame for dialog? Or false looks better. Let's do true for "System" feel or false for style. User likes borderless.
    frame: false,
    resizable: false,
    center: true,
    webPreferences: {
      nodeIntegration: true, // For simple IPC in dialog
      contextIsolation: false
    }
  });
  win.loadFile("gpu-dialog.html");
}

app.whenReady().then(() => {
  // If we have a valid config (either remembered or just selected), start app
  if (gpuConfig.skipDialog) {
    createMainWindow();
  } else {
    // No config? Show dialog.
    createSelectionWindow();
  }
});

ipcMain.on('gpu-selection', (event, data) => {
  // data = { enable: boolean, remember: boolean }

  // Always write the decision to file first
  try {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify({
      useWebGPU: data.enable,
      remember: data.remember
    }));
  } catch (e) { console.error("Write error", e); }

  // 2. Handle Action
  if (data.enable) {
    // Enable -> Restart app
    // Use spawn for AppImage to avoid FUSE mount conflicts
    if (process.env.APPIMAGE) {
      // Spawn detached child process
      spawn(process.env.APPIMAGE, [], {
        detached: true,
        stdio: 'ignore'
      }).unref();

      // Exit after brief delay to let child start
      setTimeout(() => app.exit(0), 100);
    } else {
      app.relaunch();
      app.exit(0);
    }
  } else {
    // Disable -> No relaunch needed (defaults are safe)
    createMainWindow();

    // Then close dialog
    const dialogWin = BrowserWindow.fromWebContents(event.sender);
    if (dialogWin) dialogWin.close();
  }
});

// IPC for Main Window Controls
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
