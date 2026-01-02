# OpenAnime

# OpenAnime Linux Client

**The missing piece for Linux users.**

OpenAnime is a dedicated Linux desktop client for [OpenAnime](https://openani.me). While Android and Windows have native apps, Linux users often struggle with browser compatibility—especially enabling **WebGPU** functionality which is disabled by default on many Linux browsers.

This client solves that problem. It's a "Plug & Play" solution that brings full **WebGPU & Vulkan** hardware acceleration to Linux out of the box, ensuring the best possible streaming performance.

![OpenAnime Icon](icon512.png)

## 🚀 Features

*   **Hardware Acceleration**: Built on Electron with WebGPU and Vulkan enabled for smooth 4K playback.
*   **Color Accuracy**: Forced `sRGB` color profile to prevent video color corruption on high-res displays.
*   **Immersive UI**: Borderless window with custom "traffic light" controls (Minimize, Maximize, Close) that **auto-hide** in fullscreen.
*   **Plug & Play**: Single-file AppImage. No installation requirements.
*   **Smart Controls**: Green button toggles "Real Fullscreen" immediately. Focusing logic prevents accidental double-clicks.

## 📥 Installation

### Option 1: AppImage (Recommended)
1.  Download the `.AppImage` from [Releases](../../releases).
2.  Make it executable:
    ```bash
    chmod +x OpenAnime-1.0.0.AppImage
    ```
3.  Run it!

    **System Integration (Desktop Entry & Icon)**:
    To add OpenAnime to your application menu:
    1.  Download `install.sh` from the repository (or Releases).
    2.  Place it in the same folder as the AppImage.
    3.  Run:
        ```bash
        chmod +x install.sh
        ./install.sh
        ```

### Option 2: AUR (Arch Linux)
OpenAnime is available on the AUR as `openanime-bin`.
```bash
yay -S openanime-bin
```

### Option 3: Flatpak
Coming soon to Flathub.
```bash
flatpak install com.openanime.app
```

## 🛠️ Build from Source

Requirements: `node`, `npm`.

1.  **Clone**:
    ```bash
    git clone https://github.com/tuanapi/OpenAnime-Linux-Desktop-App.git
    cd OpenAnime-Linux-Desktop-App
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Run (Dev)**:
    ```bash
    npm start
    ```
4.  **Build (AppImage)**:
    ```bash
    npm run dist
    ```
    ```
    Output will be in `dist/`.

5.  **Install to System (Optional)**:
    ```bash
    ./packaging/install.sh
    ```

## ⚠️ Known Issues

### WebGPU Colors on Linux
Enabling the **WebGPU (Performance Mode)** option is experimental and heavily dependent on your system drivers. On some configurations (especially with 4K/HDR content), this mode may cause:
*   **Inverted Colors** (Red/Blue swapped)
*   **Washed out / Grayish colors**

**Solution:** If you experience this, press `Shift + O` to reset the configuration, restart the app, and select **"Kapat (Renk Doğruluğu)"** when prompted. This forces the standard, color-accurate rendering pipeline.

## 📜 License
MIT
