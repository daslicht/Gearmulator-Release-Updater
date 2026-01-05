# Gearmulator Release Updater

[🇬🇧 English Version](README.md)

Eine Desktop-Anwendung zum Anzeigen, Filtern und automatischen Installieren von Gearmulator Plugin-Releases von GitHub.

## Features

### 🎯 Intelligente Filterung
- **Format-Filter**: AU, VST3, VST2, CLAP, LV2
- **Produkt-Filter**: Individuelle Checkboxen für alle Gearmulator-Produkte
  - JE8086, NodalRed2x, Osirus, OsirusFX, OsTIrus, OsTIrusFX, Vavra, VavraFX, Xenia, XeniaFX
- **Nur Updates**: Zeigt nur Plugins mit verfügbaren Updates an

### 🔄 Installations-Status
- ✓ **Installiert** - Plugin ist derzeit installiert
- 🔄 **Update verfügbar** - Neuere Version ist zum Download verfügbar
- ○ **Nicht installiert** - Plugin ist noch nicht installiert

Vergleicht automatisch installierte Plugins mit verfügbaren Releases durch Scannen von:
- `/Library/Audio/Plug-Ins/Components` (AU)
- `/Library/Audio/Plug-Ins/VST` (VST2)
- `/Library/Audio/Plug-Ins/VST3` (VST3)
- `/Library/Audio/Plug-Ins/CLAP` (CLAP)

### 🛠️ Automatische Installation
Aktivieren Sie "Install after download" um automatisch:
1. Das ausgewählte Plugin herunterzuladen
2. Das Archiv zu entpacken
3. Die alte Version durch die neue zu ersetzen
4. `xattr -cr` anzuwenden, um macOS Quarantäne-Attribute zu entfernen
5. Den Plugin-Status zu aktualisieren

### 🎨 Anpassung
- **Dark/Light Mode**: Umschalten mit dem Mond/Sonnen-Button
- **Sprache**: Wechseln zwischen Englisch und Deutsch mit dem DE/EN-Button
- Einstellungen werden lokal gespeichert und bleiben zwischen Sessions erhalten

### 📊 Statistiken
- Zeigt gefilterte vs. gesamt Downloads an
- Sehen Sie Release-Version und Veröffentlichungsdatum
- Dateigrößen und Download-Zähler

## Installation

### Option 1: Verwenden Sie das mitgelieferte NW.js-Bundle
Doppelklicken Sie einfach auf `GRU.app`, um die Anwendung zu starten.

### Option 2: Verwenden Sie Ihr eigenes NW.js
1. NW.js herunterladen von: https://nwjs.io/
2. Ausführen mit:
   ```bash
   /pfad/zu/nw /pfad/zu/gearmulator-release-updater/nwjs.app/Contents/Resources/app.nw
   ```

## Verwendung

### Grundlegende Verwendung
1. Die App lädt automatisch die neuesten Gearmulator-Releases beim Start
2. Nutzen Sie die Filter-Dropdowns um Ihre Suche einzugrenzen
3. Aktivieren/Deaktivieren Sie Produkte um nur das Gewünschte anzuzeigen
4. Klicken Sie auf **Download** um ein Plugin herunterzuladen

### Automatische Installation
1. Aktivieren Sie **🛠️ Install after download**
2. Klicken Sie auf **Download** bei einem beliebigen Plugin
3. Warten Sie, bis Download und Installation abgeschlossen sind
4. Die App aktualisiert sich automatisch und zeigt den neuen Status an

**Hinweis**: Die automatische Installation kann Administrator-Rechte anfordern, um Sicherheitsattribute anzuwenden.

### Tastenkombinationen
- **F12** oder **Cmd+Option+I**: Developer Tools umschalten

## Technologie-Stack

- **NW.js**: Desktop-Anwendungs-Framework
- **HTML5/CSS3**: Modernes, responsives UI
- **Vanilla JavaScript**: Keine Abhängigkeiten
- **GitHub API**: Lädt Release-Daten von dsp56300/gearmulator
- **Node.js APIs**: Dateisystem-Zugriff und Shell-Befehle

## Projekt-Struktur

```
gearmulator-release-updater/
├── nwjs.app/                           # NW.js Anwendungs-Bundle
│   └── Contents/Resources/app.nw/
│       ├── package.json                # NW.js Konfiguration
│       ├── index.html                  # Haupt-HTML-Datei
│       ├── style.css                   # Styling mit Dark/Light Mode
│       ├── app.js                      # Anwendungslogik
│       └── icon.png                    # App-Icon
├── icon.svg                            # Quell-Icon (Vektor)
├── icon.png                            # Icon PNG (1024x1024)
├── icon.icns                           # macOS Icon-Datei
├── create-icon.sh                      # Icon-Generierungs-Script
├── download.command                    # Original Download-Script
├── README.md                           # Englische Dokumentation
└── README_DE.md                        # Diese Datei (Deutsch)
```

## Entwicklung

### Voraussetzungen
- macOS (für automatische Installations-Features)
- NW.js (enthalten in nwjs.app)

### App ausführen
Doppelklick auf `nwjs.app` oder vom Terminal aus:
```bash
open nwjs.app
```

### Im Entwicklungsmodus ausführen
```bash
/pfad/zu/nw nwjs.app/Contents/Resources/app.nw
```

### Code bearbeiten
Alle Quelldateien befinden sich in `nwjs.app/Contents/Resources/app.nw/`:
- `app.js` - Haupt-Anwendungslogik
- `index.html` - UI-Struktur
- `style.css` - Styling und Themes
- `package.json` - App-Konfiguration

### Icons erstellen
Führen Sie das enthaltene Script aus, um App-Icons zu generieren:
```bash
./create-icon.sh
```

## Konfiguration

Die App speichert Präferenzen in localStorage:
- **Theme**: `dark` oder `light`
- **Sprache**: `de` oder `en`

## Lizenz

Dies ist eine Utility-Anwendung zur Verwaltung von Gearmulator-Plugins.
Gearmulator wird entwickelt von dsp56300: https://github.com/dsp56300/gearmulator

## Credits

- **Gearmulator** von dsp56300
- Erstellt mit NW.js
- UI inspiriert von modernen macOS Design-Mustern

---

Gemacht mit ❤️ für die Gearmulator-Community
