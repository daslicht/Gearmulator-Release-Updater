# Gearmulator Release Updater v1.0.0

## 🎉 Initial Release

A desktop application for viewing, filtering, and automatically installing Gearmulator plugin releases from GitHub.

---

## 🌟 Features

### Smart Filtering & Discovery
- **Platform Filter**: macOS, Windows, Linux
- **Format Filter**: AU, VST3, VST2, CLAP, LV2
- **Product Filter**: Individual checkboxes for all Gearmulator products
  - JE8086, NodalRed2x, Osirus, OsirusFX, OsTIrus, OsTIrusFX, Vavra, VavraFX, Xenia, XeniaFX
- **Updates Only Filter**: Show only plugins with available updates

### Installation Status (macOS only)
- ✓ **Installed** - Plugin is currently installed
- 🔄 **Update Available** - Newer version available
- ○ **Not Installed** - Plugin not yet installed

Automatically scans:
- `/Library/Audio/Plug-Ins/Components` (AU)
- `/Library/Audio/Plug-Ins/VST` (VST2)
- `/Library/Audio/Plug-Ins/VST3` (VST3)
- `/Library/Audio/Plug-Ins/CLAP` (CLAP)

### One-Click Installation (macOS only)
Enable "Install after download" to automatically:
1. Download the selected plugin
2. Extract the archive
3. Replace old version with new one
4. Apply `xattr -cr` to remove quarantine attributes
5. Refresh plugin status

### Customization
- **Dark/Light Mode**: Toggle with moon/sun button
- **Language**: Switch between English and German
- Settings persist between sessions

---

## 📦 Installation Options

### Option 1: Ready-to-Use Builds (Recommended)

**macOS:**
1. Download `GRU-macOS-1.0.0.zip`
2. Extract the archive
3. Remove quarantine attributes by running in Terminal:
   ```bash
   xattr -cr GRU.app
   ```
4. Run `GRU.app`

**Windows:**
1. Download `GRU-Windows-1.0.0.zip`
2. Extract and run `GRU.exe`

### Option 2: Use Your Own NW.js

**From Repository:**
```bash
git clone https://github.com/daslicht/Gearmulator-Release-Updater.git
/path/to/nw Gearmulator-Release-Updater/app.nw
```

**From Release:**
1. Download `app.nw.zip`
2. Extract the `app.nw` folder
3. Run with your NW.js installation

---

## 🖥️ Platform Support

### macOS
**Full feature set:**
- ✅ Installation status detection
- ✅ One-click automatic installation
- ✅ Automatic security attribute removal
- ✅ "Updates Only" filter
- ✅ Plugin directory scanning

### Windows & Linux
**Download functionality:**
- ✅ Browse and filter all releases
- ✅ Download plugins
- ⚠️ Manual installation required
- ⚠️ No automatic status detection

---

## 🛠️ Technical Details

- **Framework**: NW.js (Chromium + Node.js)
- **UI**: HTML5/CSS3 with responsive design
- **Backend**: Vanilla JavaScript (no dependencies)
- **Data Source**: GitHub API (dsp56300/gearmulator)

---

## 📋 What's Included

### In This Release:

**For macOS Users:**
- `GRU-macOS-1.0.0.zip` - Complete macOS application bundle

**For Windows Users:**
- `GRU-Windows-1.0.0.zip` - Complete Windows application

**For All Platforms:**
- `app.nw.zip` - Source code for use with your own NW.js installation

---

## 🔧 Repository Structure

The repository now contains:
- `app.nw/` - Source code (works on all platforms with NW.js)
- `release/` - macOS build for local testing
- Platform-specific builds are distributed via GitHub Releases

---

## 📝 Known Limitations

- Windows/Linux: No automatic installation or status detection
- macOS: May request admin privileges for security attribute removal
- Requires internet connection to fetch releases from GitHub

---

## 🙏 Credits

- **Gearmulator** by dsp56300: https://github.com/dsp56300/gearmulator
- Built with NW.js
- UI inspired by modern macOS design

---

## 📄 License

This is a utility application for managing Gearmulator plugins.
Gearmulator is developed by dsp56300.

---

## 🐛 Bug Reports & Feature Requests

Please report issues on GitHub:
https://github.com/daslicht/Gearmulator-Release-Updater/issues

---

**Made with ❤️ for the Gearmulator community**
