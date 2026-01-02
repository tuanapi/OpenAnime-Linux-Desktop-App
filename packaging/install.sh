#!/bin/bash

# OpenAnime AppImage Installer
# ----------------------------
# Installs the AppImage, Icon, and Desktop Entry for the current user.

APP_NAME="OpenAnime"
ICON_NAME="openanime"
APP_FILENAME="OpenAnime-1.0.0.AppImage"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "📦 Installing $APP_NAME..."

# 1. Verify files exist
if [ ! -f "$SCRIPT_DIR/$APP_FILENAME" ]; then
    echo "❌ Error: Could not find '$APP_FILENAME' in the current directory."
    exit 1
fi
# Check for icon (optional but recommended)
if [ ! -f "$SCRIPT_DIR/linux-unpacked/resources/app/icon512.png" ] && [ ! -f "$SCRIPT_DIR/icon512.png" ]; then
   # Try to find icon in typical build locations or current dir
   if [ -f "$SCRIPT_DIR/../icon512.png" ]; then
        ICON_PATH="$SCRIPT_DIR/../icon512.png"
   elif [ -f "$SCRIPT_DIR/icon512.png" ]; then
        ICON_PATH="$SCRIPT_DIR/icon512.png"
   else
        echo "⚠️ Warning: Icon file not found. Desktop entry might miss the icon."
   fi
else
   # If we are in dist/ and icon is in root or we dragged it here
   if [ -f "$SCRIPT_DIR/icon512.png" ]; then
       ICON_PATH="$SCRIPT_DIR/icon512.png"
   elif [ -f "$SCRIPT_DIR/../icon512.png" ]; then
       ICON_PATH="$SCRIPT_DIR/../icon512.png"
   fi
fi

# 2. Move AppImage to a permanent location
INSTALL_DIR="$HOME/.local/bin"
mkdir -p "$INSTALL_DIR"
cp "$SCRIPT_DIR/$APP_FILENAME" "$INSTALL_DIR/$APP_FILENAME"
chmod +x "$INSTALL_DIR/$APP_FILENAME"
echo "   -> Copied AppImage to $INSTALL_DIR"

# 3. Install Icon
if [ -n "$ICON_PATH" ]; then
    ICON_DEST_DIR="$HOME/.local/share/icons/hicolor/512x512/apps"
    mkdir -p "$ICON_DEST_DIR"
    cp "$ICON_PATH" "$ICON_DEST_DIR/$ICON_NAME.png"
    echo "   -> Installed icon to $ICON_DEST_DIR"
    
    # Update cache if command exists
    if command -v gtk-update-icon-cache &>/dev/null; then
        gtk-update-icon-cache "$HOME/.local/share/icons/hicolor" &>/dev/null
    fi
fi

# 4. Create Desktop Entry
DESKTOP_DIR="$HOME/.local/share/applications"
mkdir -p "$DESKTOP_DIR"
cat > "$DESKTOP_DIR/openanime.desktop" <<EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=$APP_NAME
Comment=Stream Anime (WebGPU)
Exec=$INSTALL_DIR/$APP_FILENAME
Icon=$ICON_NAME
Terminal=false
Categories=AudioVideo;Video;Player;
StartupWMClass=$APP_NAME
EOF
chmod +x "$DESKTOP_DIR/openanime.desktop"
echo "   -> Created desktop entry at $DESKTOP_DIR/openanime.desktop"

# Refresh database
update-desktop-database "$DESKTOP_DIR" &>/dev/null

echo "✅ Installation Complete!"
echo "   You can now find '$APP_NAME' in your applications menu."
