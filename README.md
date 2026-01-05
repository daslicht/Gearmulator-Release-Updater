# Gearmulator Release Updater

[🇩🇪 Deutsche Version](README_DE.md)

A desktop application for viewing, filtering, and automatically installing Gearmulator plugin releases from GitHub (automatic installation: macOS only).

## Features

### 🎯 Smart Filtering
- **Platform Filter**: macOS, Windows, Linux
- **Format Filter**: AU, VST3, VST2, CLAP, LV2
- **Product Filter**: Individual checkboxes for all Gearmulator products
  - JE8086, NodalRed2x, Osirus, OsirusFX, OsTIrus, OsTIrusFX, Vavra, VavraFX, Xenia, XeniaFX
- **Updates Only**: Show only plugins with available updates (macOS only)

### 🔄 Installation Status
- ✓ **Installed** - Plugin is currently installed (macOS only)
- 🔄 **Update Available** - Newer version is available for download (macOS only)
- ○ **Not Installed** - Plugin is not yet installed

Automatically compares installed plugins with available releases by scanning (macOS only):
- `/Library/Audio/Plug-Ins/Components` (AU)
- `/Library/Audio/Plug-Ins/VST` (VST2)
- `/Library/Audio/Plug-Ins/VST3` (VST3)
- `/Library/Audio/Plug-Ins/CLAP` (CLAP)

### 🛠️ Automatic Installation (macOS only)
Enable "Install after download" to automatically:
1. Download the selected plugin
2. Extract the archive
3. Replace the old version with the new one
4. Apply `xattr -cr` to remove macOS quarantine attributes
5. Refresh plugin status

### 🎨 Customization
- **Dark/Light Mode**: Toggle with the moon/sun button
- **Language**: Switch between English and German with the DE/EN button
- Settings are saved locally and persist between sessions

### 📊 Statistics
- View filtered vs. total download counts
- See release version and publication date
- File sizes and download counts

## Installation

### Option 1: Use the included NW.js bundle
Simply double-click `GRU.app` to run the application.

### Option 2: Use your own NW.js
1. Download NW.js from: https://nwjs.io/
2. Run with:
   ```bash
   /path/to/nw /path/to/gearmulator-release-updater/nwjs.app/Contents/Resources/app.nw
   ```

## Usage

### Basic Usage
1. The app automatically loads the latest Gearmulator releases on startup
2. Use the filter dropdowns to narrow down your search
3. Check/uncheck products to show only what you need
4. Click **Download** to download a plugin

### Automatic Installation
1. Enable **🛠️ Install after download**
2. Click **Download** on any plugin
3. Wait for the download and installation to complete
4. The app will automatically refresh and show updated status

**Note**: Automatic installation may request administrator privileges to apply security attributes.

### Keyboard Shortcuts
- **F12** or **Cmd+Option+I**: Toggle Developer Tools

## Technology Stack

- **NW.js**: Desktop application framework
- **HTML5/CSS3**: Modern, responsive UI
- **Vanilla JavaScript**: No dependencies
- **GitHub API**: Fetches release data from dsp56300/gearmulator
- **Node.js APIs**: File system access and shell commands

## Project Structure

```
gearmulator-release-updater/
├── nwjs.app/                           # NW.js application bundle
│   └── Contents/Resources/app.nw/
│       ├── package.json                # NW.js configuration
│       ├── index.html                  # Main HTML file
│       ├── style.css                   # Styling with dark/light mode
│       ├── app.js                      # Application logic
│       └── icon.png                    # App icon
├── icon.svg                            # Source icon (vector)
├── icon.png                            # Icon PNG (1024x1024)
├── icon.icns                           # macOS icon file
├── create-icon.sh                      # Icon generation script
├── download.command                    # Original download script
├── README.md                           # This file (English)
└── README_DE.md                        # German documentation
```

## Development

### Prerequisites
- macOS (for automatic installation features)
- NW.js (included in nwjs.app)

**Note**: The version in this repository is packaged as a macOS app (`GRU.app`). For Windows, the `app.nw` folder from `GRU.app/Contents/Resources/app.nw` must be manually copied into a Windows NW.js distribution.

### Running the App
Double-click `nwjs.app` or run from terminal:
```bash
open nwjs.app
```

### Running in Development Mode
```bash
/path/to/nw nwjs.app/Contents/Resources/app.nw
```

### Editing the Code
All source files are in `nwjs.app/Contents/Resources/app.nw/`:
- `app.js` - Main application logic
- `index.html` - UI structure
- `style.css` - Styling and themes
- `package.json` - App configuration

### Building Icons
Run the included script to generate app icons:
```bash
./create-icon.sh
```

## Configuration

The app stores preferences in localStorage:
- **Theme**: `dark` or `light`
- **Language**: `de` or `en`

## License

This is a utility application for managing Gearmulator plugins. 
Gearmulator is developed by dsp56300: https://github.com/dsp56300/gearmulator

## Credits

- **Gearmulator** by dsp56300
- Built with NW.js
- UI inspired by modern macOS design patterns

---

Made with ❤️ for the Gearmulator community
