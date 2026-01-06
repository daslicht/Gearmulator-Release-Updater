# Gearmulator Release Updater

[🇬🇧 English Version](README.md)

> ⚠️ **Disclaimer**: Dieses Projekt ist zu 100% vibe coded. Ich könnte es auch per Hand machen, aber das dauert länger und so habe ich mehr Zeit für andere wichtige Sachen wie z.B. Musik machen.
>
> 🤝 **Pull Requests sind willkommen**, besonders wenn jemand Windows- und Linux-Builds hinzufügen mag!

Eine Desktop-Anwendung zum Anzeigen, Filtern und automatischen Installieren von Gearmulator Plugin-Releases von GitHub (automatische Installation: nur macOS).

## Features

### 🎯 Intelligente Filterung
- **Plattform-Filter**: macOS, Windows, Linux
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

## Plattform-Hinweise

### macOS
**Vollständiger Funktionsumfang:**
- Erkennung des Installations-Status (installiert/Update verfügbar)
- Automatische Plugin-Installation mit einem Klick
- Automatisches Entfernen von Sicherheitsattributen (`xattr -cr`)
- "Nur Updates" Filter
- Scannen von Plugin-Verzeichnissen

### Windows & Linux
**Nur Download-Funktionalität:**
- Durchsuchen und Filtern aller Gearmulator-Releases
- Manuelles Herunterladen von Plugins
- Manuelle Installation erforderlich (entpacken und in Plugin-Verzeichnisse kopieren)
- Keine automatische Status-Erkennung oder Installation

Die grundlegenden Such- und Filter-Funktionen funktionieren auf allen Plattformen. Die automatischen Installations-Features sind macOS-spezifisch aufgrund von Plattform-Unterschieden im Plugin-Management und der Sicherheitsbehandlung.

## Installation

### macOS (Empfohlen)
1. Laden Sie `GRU-macOS-[version].zip` von [Releases](https://github.com/daslicht/gearmulator-release-updater/releases) herunter
2. Entpacken und starten Sie `GRU.app`

### Windows (Empfohlen)
1. Laden Sie `GRU-Windows-[version].zip` von [Releases](https://github.com/daslicht/gearmulator-release-updater/releases) herunter
2. Entpacken und starten Sie `GRU.exe`

### Eigenes NW.js verwenden (Alle Plattformen)
Wenn Sie NW.js installiert haben, können Sie die App direkt aus dem Repository ausführen:

1. Repository klonen:
   ```bash
   git clone https://github.com/daslicht/gearmulator-release-updater.git
   ```
2. Mit Ihrer NW.js Installation ausführen:
   ```bash
   /pfad/zu/nw gearmulator-release-updater/app.nw
   ```

Alternativ können Sie `app.nw.zip` von [Releases](https://github.com/daslicht/gearmulator-release-updater/releases) herunterladen, wenn Sie das Repository nicht klonen möchten.

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
├── app.nw/                             # Quellcode (NW.js App)
│   ├── package.json                    # NW.js Konfiguration
│   ├── index.html                      # Haupt-HTML-Datei
│   ├── style.css                       # Styling mit Dark/Light Mode
│   ├── app.js                          # Anwendungslogik
│   └── icon.png                        # App-Icon
├── release/                            # Lokale Builds (nicht in git)
│   └── GRU.app                         # macOS Build
├── icon.svg                            # Quell-Icon (Vektor)
├── icon.png                            # Icon PNG (1024x1024)
├── icon.icns                           # macOS Icon-Datei
├── create-icon.sh                      # Icon-Generierungs-Script
├── .gitignore                          # Git Ignore Datei
├── README.md                           # Englische Dokumentation
└── README_DE.md                        # Diese Datei (Deutsch)
```

## Entwicklung

### Voraussetzungen
- macOS (für automatische Installations-Features)
- NW.js von https://nwjs.io/

### Im Entwicklungsmodus ausführen
```bash
/pfad/zu/nw app.nw
```

### Code bearbeiten
Alle Quelldateien befinden sich im `app.nw/` Ordner:
- `app.js` - Haupt-Anwendungslogik
- `index.html` - UI-Struktur
- `style.css` - Styling und Themes
- `package.json` - App-Konfiguration

### Releases erstellen

1. **Für macOS**: `app.nw` mit NW.js macOS Distribution verpacken
2. **Für Windows**: `app.nw` mit NW.js Windows Distribution verpacken
3. GitHub Release erstellen:
   ```bash
   gh release create v1.0.0 \
     GRU-macOS-1.0.0.zip \
     GRU-Windows-1.0.0.zip \
     app.nw.zip \
     --title "Release v1.0.0" \
     --notes "Release-Notizen hier"
   ```

### Repository vs. Releases

- **Repository**: Enthält nur Quellcode (`app.nw/`) und Assets
- **Releases**: Plattform-spezifische Builds werden als GitHub Releases veröffentlicht
- Der `release/` Ordner wird von git ignoriert (`.gitignore`) für lokale Tests

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
