# Gearmulator Release Updater

A desktop application for viewing, filtering, and automatically installing Gearmulator plugin releases from GitHub (automatic installation: macOS only).

## Features

### Smart Filtering
- **Platform Filter**: macOS, Windows, Linux
- **Format Filter**: AU, VST3, VST2, CLAP, LV2
- **Product Filter**: Individual checkboxes for all Gearmulator products
  - JE8086, NodalRed2x, Osirus, OsirusFX, OsTIrus, OsTIrusFX, Vavra, VavraFX, Xenia, XeniaFX
- **Updates Only**: Show only plugins with available updates

### Installation Status
- ✓ **Installed** - Plugin is currently installed
- **Update Available** - Newer version is available for download
- ○ **Not Installed** - Plugin is not yet installed

Automatically compares installed plugins with available releases by scanning:
- `/Library/Audio/Plug-Ins/Components` (AU)
- `/Library/Audio/Plug-Ins/VST` (VST2)
- `/Library/Audio/Plug-Ins/VST3` (VST3)
- `/Library/Audio/Plug-Ins/CLAP` (CLAP)

### Automatic Installation
Enable "Install after download" to automatically:
1. Download the selected plugin
2. Extract the archive
3. Replace the old version with the new one
4. Apply `xattr -cr` to remove macOS quarantine attributes
5. Refresh plugin status

### Customization
- **Dark/Light Mode**: Toggle with the moon/sun button
- **Language**: Switch between English and German with the DE/EN button
- Settings are saved locally and persist between sessions

### Statistics
- View filtered vs. total download counts
- See release version and publication date
- File sizes and download counts

## Platform Notes

### macOS
**Full feature set including:**
- Installation status detection (installed/update available)
- Automatic plugin installation with one click
- Automatic security attribute removal (`xattr -cr`)
- "Updates Only" filter
- Plugin directory scanning

### Windows & Linux
**Download functionality only:**
- Browse and filter all Gearmulator releases
- Download plugins manually
- Manual installation required (extract and copy to plugin directories)
- No automatic status detection or installation

The core browsing and filtering features work on all platforms. Automatic installation features are macOS-specific due to platform differences in plugin management and security handling.

## Installation

### macOS (Recommended)
1. Download `GRU-macOS-[version].zip` from [Releases](https://github.com/daslicht/gearmulator-release-updater/releases)
2. Extract and run `GRU.app`

### Windows (Recommended)
1. Download `GRU-Windows-[version].zip` from [Releases](https://github.com/daslicht/gearmulator-release-updater/releases)
2. Extract and run `GRU.exe`

### Use your own NW.js (All Platforms)
If you have NW.js installed, you can run the app directly from the repository:

1. Clone this repository:
   ```bash
   git clone https://github.com/daslicht/gearmulator-release-updater.git
   ```
2. Run with your NW.js installation:
   ```bash
   /path/to/nw gearmulator-release-updater/app.nw
   ```

Alternatively, download `app.nw.zip` from [Releases](https://github.com/daslicht/gearmulator-release-updater/releases) if you don't want to clone the repository.

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
├── app.nw/                             # Source code (NW.js app)
│   ├── package.json                    # NW.js configuration
│   ├── index.html                      # Main HTML file
│   ├── style.css                       # Styling with dark/light mode
│   ├── app.js                          # Application logic
│   └── icon.png                        # App icon
├── release/                            # Local builds (not in git)
│   └── GRU.app                         # macOS build
├── .gitignore                          # Git ignore file
├── README.md                           # This file (English)
└── README_DE.md                        # German documentation
```

## Development

### Prerequisites
- macOS (for automatic installation features)
- NW.js from https://nwjs.io/

### Running in Development Mode
```bash
/path/to/nw app.nw
```

### Editing the Code
All source files are in the `app.nw/` folder:
- `app.js` - Main application logic
- `index.html` - UI structure
- `style.css` - Styling and themes
- `package.json` - App configuration

### Building Releases

1. **For macOS**: Package `app.nw` with NW.js macOS distribution
2. **For Windows**: Package `app.nw` with NW.js Windows distribution
3. Create a GitHub Release:
   ```bash
   gh release create v1.0.0 \
     GRU-macOS-1.0.0.zip \
     GRU-Windows-1.0.0.zip \
     app.nw.zip \
     --title "Release v1.0.0" \
     --notes "Release notes here"
   ```

### Repository vs. Releases

- **Repository**: Contains only source code (`app.nw/`) and assets
- **Releases**: Platform-specific builds are published as GitHub Releases
- The `release/` folder is ignored by git (`.gitignore`) for local testing


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
