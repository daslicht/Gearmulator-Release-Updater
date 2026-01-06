// Open DevTools on startup
if (typeof nw !== 'undefined') {
    //nw.Window.get().showDevTools();  //Show Dev console on start
}

// Node.js modules for file system access
const fs = require('fs');
const path = require('path');
const { execSync, exec } = require('child_process');
const os = require('os');

// Plugin installation paths
const PLUGIN_PATHS = {
    au: '/Library/Audio/Plug-Ins/Components',
    vst2: '/Library/Audio/Plug-Ins/VST',
    vst3: '/Library/Audio/Plug-Ins/VST3',
    clap: '/Library/Audio/Plug-Ins/CLAP'
};

const PLUGIN_EXTENSIONS = {
    au: '.component',
    vst2: '.vst',
    vst3: '.vst3',
    clap: '.clap'
};

// State
let allDownloads = [];
let releaseData = null;
let installedPlugins = {};
let currentLang = 'de';

// Translations
const translations = {
    de: {
        appTitle: 'Gearmulator Release Updater',
        appSubtitle: 'Aktuelle Releases mit Filter-Optionen',
        labelFormat: 'Format:',
        allFormats: 'Alle Formate',
        labelUpdatesOnly: '🔄 Nur Updates anzeigen',
        btnRefresh: '🔄 Aktualisieren',
        labelProducts: 'Produkte:',
        labelFiltered: 'Gefilterte Downloads:',
        labelTotal: 'Gesamt Downloads:',
        labelInstallAfter: '🛠️ Install after download',
        loading: 'Lade Releases...',
        errorLoading: 'Fehler beim Laden der Releases:',
        noReleases: 'Keine Releases gefunden',
        published: 'Veröffentlicht:',
        version: 'Version:',
        noResults: '🔍 Keine Downloads gefunden',
        tryOtherFilters: 'Versuchen Sie andere Filter-Einstellungen',
        download: '⬇️ Download',
        installed: '✓ Installiert',
        updateAvailable: '🔄 Update verfügbar',
        notInstalled: '○ Nicht installiert',
        downloading: 'Wird heruntergeladen...',
        installing: 'Wird installiert...',
        downloadComplete: 'Download abgeschlossen',
        installComplete: 'Installation abgeschlossen',
        error: 'Fehler'
    },
    en: {
        appTitle: 'Gearmulator Release Updater',
        appSubtitle: 'Current Releases with Filter Options',
        labelFormat: 'Format:',
        allFormats: 'All Formats',
        labelUpdatesOnly: '🔄 Show Updates Only',
        btnRefresh: '🔄 Refresh',
        labelProducts: 'Products:',
        labelFiltered: 'Filtered Downloads:',
        labelTotal: 'Total Downloads:',
        labelInstallAfter: '🛠️ Install after download',
        loading: 'Loading Releases...',
        loading: 'Loading Releases...',
        errorLoading: 'Error loading releases:',
        noReleases: 'No releases found',
        published: 'Published:',
        version: 'Version:',
        noResults: '🔍 No Downloads Found',
        tryOtherFilters: 'Try different filter settings',
        download: '⬇️ Download',
        installed: '✓ Installed',
        updateAvailable: '🔄 Update Available',
        notInstalled: '○ Not Installed',
        downloading: 'Downloading...',
        installing: 'Installing...',
        downloadComplete: 'Download Complete',
        installComplete: 'Installation Complete',
        error: 'Error'
    }
};

// DOM Elements
const platformFilter = document.getElementById('platformFilter');
const formatFilter = document.getElementById('formatFilter');
const refreshBtn = document.getElementById('refreshBtn');
const productCheckboxes = document.querySelectorAll('.product-checkbox');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const showUpdatesOnly = document.getElementById('showUpdatesOnly');
const langToggle = document.getElementById('langToggle');
const langIcon = document.querySelector('.lang-icon');
const installAfterDownload = document.getElementById('installAfterDownload');
const downloadsList = document.getElementById('downloadsList');
const loading = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const releaseInfo = document.getElementById('releaseInfo');
const releaseName = document.getElementById('releaseName');
const releaseDate = document.getElementById('releaseDate');
const releaseVersion = document.getElementById('releaseVersion');
const filteredCount = document.getElementById('filteredCount');
const totalCount = document.getElementById('totalCount');

// Event Listeners
platformFilter.addEventListener('change', () => {
    updateFormatOptions();
    updateInstallOption();
    applyFilters();
});

formatFilter.addEventListener('change', () => {
    updateInstallOption();
    applyFilters();
});

refreshBtn.addEventListener('click', fetchReleases);
productCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
});
themeToggle.addEventListener('click', toggleTheme);
showUpdatesOnly.addEventListener('change', applyFilters);
langToggle.addEventListener('click', toggleLanguage);

// Initialize
initTheme();
initLanguage();
updateFormatOptions(); // Set initial format options based on platform
updateInstallOption(); // Set initial visibility of install option
scanInstalledPlugins();
fetchReleases();

// Initialize language from localStorage
function initLanguage() {
    currentLang = localStorage.getItem('language') || 'de';
    updateLanguage();
}

// Toggle language
function toggleLanguage() {
    currentLang = currentLang === 'de' ? 'en' : 'de';
    localStorage.setItem('language', currentLang);
    updateLanguage();
    applyFilters(); // Reapply filters to update display
}

// Update UI language
function updateLanguage() {
    const t = translations[currentLang];
    
    // Update static texts
    document.getElementById('appTitle').textContent = t.appTitle;
    document.getElementById('appSubtitle').textContent = t.appSubtitle;
    document.getElementById('labelFormat').textContent = t.labelFormat;
    document.getElementById('labelUpdatesOnly').textContent = t.labelUpdatesOnly;
    document.getElementById('btnRefresh').textContent = t.btnRefresh;
    document.getElementById('labelProducts').textContent = t.labelProducts;
    document.getElementById('labelFiltered').textContent = t.labelFiltered;
    document.getElementById('labelTotal').textContent = t.labelTotal;
    document.getElementById('labelInstallAfter').textContent = t.labelInstallAfter;
    document.getElementById('loading').textContent = t.loading;
    
    // Update select option
    const allFormatsOption = formatFilter.querySelector('[data-i18n="allFormats"]');
    if (allFormatsOption) allFormatsOption.textContent = t.allFormats;
    
    // Update language icon
    langIcon.textContent = currentLang.toUpperCase();
}

// Get translated text
function t(key) {
    return translations[currentLang][key] || key;
}

// Scan for installed plugins
function scanInstalledPlugins() {
    installedPlugins = {};
    
    for (const [format, pluginPath] of Object.entries(PLUGIN_PATHS)) {
        try {
            if (fs.existsSync(pluginPath)) {
                const files = fs.readdirSync(pluginPath);
                const extension = PLUGIN_EXTENSIONS[format];
                
                files.forEach(file => {
                    if (file.endsWith(extension)) {
                        const fullPath = path.join(pluginPath, file);
                        const stats = fs.statSync(fullPath);
                        const baseName = file.replace(extension, '');
                        
                        const key = `${baseName}-${format}`;
                        installedPlugins[key] = {
                            name: baseName,
                            format: format,
                            path: fullPath,
                            modifiedDate: stats.mtime,
                            size: stats.size
                        };
                    }
                });
            }
        } catch (error) {
            console.warn(`Could not scan ${pluginPath}:`, error);
        }
    }
    
    console.log('Installed plugins:', installedPlugins);
}

// Initialize theme from localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// Toggle between light and dark mode
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

// Update theme icon
function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Fetch Gearmulator releases from GitHub API
async function fetchReleases() {
    loading.style.display = 'block';
    errorDiv.style.display = 'none';
    releaseInfo.style.display = 'none';
    downloadsList.innerHTML = '';

    // Rescan installed plugins
    scanInstalledPlugins();

    try {
        // Fetch all releases
        const response = await fetch('https://api.github.com/repos/dsp56300/gearmulator/releases?per_page=1');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const releases = await response.json();
        if (!releases || releases.length === 0) {
            throw new Error(t('noReleases'));
        }
        
        const data = releases[0]; // Get the first (latest) release
        releaseData = data;
        
        // Parse release data
        parseReleaseData(data);
        
        // Display release info
        displayReleaseInfo(data);
        
        // Apply filters
        applyFilters();

    } catch (error) {
        console.error('Error fetching releases:', error);
        errorDiv.textContent = `${t('errorLoading')} ${error.message}`;
        errorDiv.style.display = 'block';
    } finally {
        loading.style.display = 'none';
    }
}

// Parse release data and extract download information
function parseReleaseData(data) {
    allDownloads = data.assets.map(asset => {
        const name = asset.name;
        const parsed = parseFileName(name);
        
        // Check if plugin is installed
        const installKey = `${parsed.product}-${parsed.format}`;
        const installed = installedPlugins[installKey];
        const assetDate = new Date(asset.updated_at);
        
        let installStatus = 'not-installed';
        if (installed) {
            if (assetDate > installed.modifiedDate) {
                installStatus = 'update-available';
            } else {
                installStatus = 'installed';
            }
        }
        
        return {
            name: name,
            url: asset.browser_download_url,
            size: formatFileSize(asset.size),
            sizeBytes: asset.size,
            platform: parsed.platform,
            format: parsed.format,
            arch: parsed.arch,
            product: parsed.product,
            downloadCount: asset.download_count,
            installStatus: installStatus,
            installedInfo: installed || null,
            assetDate: assetDate
        };
    });
}

// Parse file name to extract platform, format, architecture, and product
function parseFileName(fileName) {
    const nameLower = fileName.toLowerCase();
    let platform = 'unknown';
    let format = 'unknown';
    let arch = 'unknown';
    let product = 'unknown';

    // Determine product (check longer names first to avoid partial matches)
    const products = ['NodalRed2x', 'OsirusFX', 'OsTIrusFX', 'OsTIrus', 'Osirus', 'VavraFX', 'Vavra', 'XeniaFX', 'Xenia', 'JE8086'];
    for (const prod of products) {
        if (fileName.includes(prod)) {
            product = prod;
            break;
        }
    }

    // Determine platform
    if (nameLower.includes('win') || nameLower.includes('windows')) {
        platform = 'windows';
    } else if (nameLower.includes('macos') || nameLower.includes('osx') || nameLower.includes('darwin')) {
        platform = 'macos';
    } else if (nameLower.includes('linux')) {
        platform = 'linux';
    }

    // Determine format (check in specific order)
    if (nameLower.includes('vst3')) {
        format = 'vst3';
    } else if (nameLower.includes('vst2') || nameLower.includes('vst_')) {
        format = 'vst2';
    } else if (nameLower.includes('au') || nameLower.includes('audiounit')) {
        format = 'au';
    } else if (nameLower.includes('clap')) {
        format = 'clap';
    } else if (nameLower.includes('lv2')) {
        format = 'lv2';
    }

    // Determine architecture
    if (nameLower.includes('x64') || nameLower.includes('x86_64') || nameLower.includes('amd64')) {
        arch = 'x64';
    } else if (nameLower.includes('ia32') || nameLower.includes('x86')) {
        arch = 'ia32';
    } else if (nameLower.includes('arm64') || nameLower.includes('aarch64')) {
        arch = 'arm64';
    }

    return { platform, format, arch, product };
}

// Display release information
function displayReleaseInfo(data) {
    releaseInfo.style.display = 'block';
    releaseName.textContent = data.name || data.tag_name;
    
    const date = new Date(data.published_at);
    const dateStr = currentLang === 'de' ? date.toLocaleDateString('de-DE') : date.toLocaleDateString('en-US');
    releaseDate.textContent = `📅 ${t('published')} ${dateStr}`;
    releaseVersion.textContent = `🏷️ ${t('version')} ${data.tag_name}`;
}

// Apply filters to downloads
function updateFormatOptions() {
    const platform = platformFilter.value;
    const currentFormat = formatFilter.value;
    const formatOptions = formatFilter.querySelectorAll('option');
    
    formatOptions.forEach(option => {
        const platforms = option.getAttribute('data-platforms');
        
        // Always show "all" option
        if (option.value === 'all') {
            option.style.display = 'block';
            option.disabled = false;
            return;
        }
        
        // Show/hide based on platform compatibility
        if (platforms && platforms.includes(platform)) {
            option.style.display = 'block';
            option.disabled = false;
        } else {
            option.style.display = 'none';
            option.disabled = true;
        }
    });
    
    // If current format is not available for selected platform, reset to "all"
    const currentOption = formatFilter.querySelector(`option[value="${currentFormat}"]`);
    if (currentOption && currentOption.disabled) {
        formatFilter.value = 'all';
    }
}

function updateInstallOption() {
    const installAfterGroup = document.getElementById('installAfterGroup');
    const updatesOnlyGroup = document.getElementById('updatesOnlyGroup');
    
    // Only show install and updates options for macOS
    if (platformFilter.value === 'macos') {
        updatesOnlyGroup.style.display = 'block';
        installAfterGroup.style.display = 'block';
        // Disable if LV2 is selected
        if (formatFilter.value === 'lv2') {
            installAfterDownload.disabled = true;
            installAfterDownload.checked = false;
        } else {
            installAfterDownload.disabled = false;
        }
    } else {
        updatesOnlyGroup.style.display = 'none';
        installAfterGroup.style.display = 'none';
        showUpdatesOnly.checked = false;
        installAfterDownload.checked = false;
    }
}

function applyFilters() {
    const platform = platformFilter.value;
    const format = formatFilter.value;
    const selectedProducts = Array.from(productCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    const updatesOnly = showUpdatesOnly.checked;

    const filtered = allDownloads.filter(download => {
        const platformMatch = download.platform === platform;
        const formatMatch = format === 'all' || download.format === format;
        const productMatch = selectedProducts.length === 0 || selectedProducts.includes(download.product);
        const updateMatch = !updatesOnly || download.installStatus === 'update-available';
        
        return platformMatch && formatMatch && productMatch && updateMatch;
    });

    displayDownloads(filtered);
    updateStats(filtered.length, allDownloads.length);
}

// Display downloads
function displayDownloads(downloads) {
    if (downloads.length === 0) {
        downloadsList.innerHTML = `
            <div class="no-results">
                <p>${t('noResults')}</p>
                <small>${t('tryOtherFilters')}</small>
            </div>
        `;
        return;
    }

    downloadsList.innerHTML = downloads.map((download, index) => {
        const statusBadge = platformFilter.value === 'macos' ? getStatusBadge(download.installStatus) : '';
        const downloadId = `download-${index}`;
        const dataStatus = platformFilter.value === 'macos' ? download.installStatus : '';
        return `
        <div class="download-item" data-status="${dataStatus}" id="${downloadId}">
            <div class="download-info">
                <div class="download-name">${download.name}</div>
                <div class="download-tags">
                    ${download.format !== 'unknown' ? `<span class="tag tag-format">${getFormatLabel(download.format)}</span>` : ''}
                    ${download.arch !== 'unknown' ? `<span class="tag tag-arch">${download.arch}</span>` : ''}
                    <span class="tag tag-size">💾 ${download.size}</span>
                    ${statusBadge}
                </div>
            </div>
            <div class="download-actions">
                <button class="btn-download" onclick="handleDownload(${index})">${t('download')}</button>
            </div>
        </div>
    `}).join('');
}

// Update statistics
function updateStats(filtered, total) {
    filteredCount.textContent = filtered;
    totalCount.textContent = total;
}

// Get platform label
function getPlatformLabel(platform) {
    const labels = {
        'windows': '🪟 Windows',
        'macos': '🍎 macOS',
        'linux': '🐧 Linux',
        'unknown': '❓ Unknown'
    };
    return labels[platform] || platform;
}

// Get format label
function getFormatLabel(format) {
    const labels = {
        'au': 'AU',
        'vst3': 'VST3',
        'vst2': 'VST2',
        'clap': 'CLAP',
        'lv2': 'LV2',
        'unknown': '❓'
    };
    return labels[format] || format.toUpperCase();
}

// Get status badge
function getStatusBadge(status) {
    const badges = {
        'installed': `<span class="tag tag-status status-installed">${t('installed')}</span>`,
        'update-available': `<span class="tag tag-status status-update">${t('updateAvailable')}</span>`,
        'not-installed': `<span class="tag tag-status status-not-installed">${t('notInstalled')}</span>`
    };
    return badges[status] || '';
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Handle download with optional auto-install
async function handleDownload(index) {
    const download = allDownloads.filter(d => {
        const format = formatFilter.value;
        const selectedProducts = Array.from(productCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
        const updatesOnly = showUpdatesOnly.checked;
        
        const platformMatch = d.platform === 'macos';
        const formatMatch = format === 'all' || d.format === format;
        const productMatch = selectedProducts.length === 0 || selectedProducts.includes(d.product);
        const updateMatch = !updatesOnly || d.installStatus === 'update-available';
        
        return platformMatch && formatMatch && productMatch && updateMatch;
    })[index];
    
    if (!download) return;
    
    const downloadItem = document.getElementById(`download-${index}`);
    const btn = downloadItem.querySelector('.btn-download');
    const originalText = btn.textContent;
    
    if (installAfterDownload.checked) {
        await downloadAndInstall(download, btn);
    } else {
        // Simple download
        window.location.href = download.url;
    }
}

// Download and install plugin
async function downloadAndInstall(download, btn) {
    try {
        // Update button status
        btn.textContent = t('downloading');
        btn.disabled = true;
        
        // Download file
        const tmpDir = os.tmpdir();
        const fileName = path.basename(download.url);
        const downloadPath = path.join(tmpDir, fileName);
        
        console.log('Downloading to:', downloadPath);
        await downloadFile(download.url, downloadPath);
        
        btn.textContent = t('installing');
        
        // Extract and install
        await extractAndInstall(downloadPath, download);
        
        btn.textContent = t('installComplete');
        btn.style.background = '#4caf50';
        
        // Refresh to rescan plugins and update status
        setTimeout(() => {
            fetchReleases();
        }, 1000);
        
    } catch (error) {
        console.error('Installation error:', error);
        btn.textContent = `${t('error')}: ${error.message}`;
        btn.style.background = '#f44336';
        
        setTimeout(() => {
            btn.textContent = t('download');
            btn.disabled = false;
            btn.style.background = '';
        }, 5000);
    }
}

// Download file
function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const https = require('https');
        const http = require('http');
        const file = fs.createWriteStream(dest);
        
        const protocol = url.startsWith('https') ? https : http;
        
        protocol.get(url, (response) => {
            // Follow redirects
            if (response.statusCode === 302 || response.statusCode === 301) {
                return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
            }
            
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
        
        file.on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

// Extract and install plugin
async function extractAndInstall(zipPath, download) {
    const tmpDir = os.tmpdir();
    const extractDir = path.join(tmpDir, `extract_${Date.now()}`);
    
    // Create extract directory
    fs.mkdirSync(extractDir, { recursive: true });
    
    try {
        // Unzip file
        console.log('Extracting:', zipPath);
        execSync(`unzip -q "${zipPath}" -d "${extractDir}"`, { stdio: 'pipe' });
        
        // Find the plugin file
        const extension = PLUGIN_EXTENSIONS[download.format];
        const pluginFiles = findFilesWithExtension(extractDir, extension);
        
        if (pluginFiles.length === 0) {
            throw new Error(`No ${extension} file found in archive`);
        }
        
        const pluginSource = pluginFiles[0];
        const pluginName = path.basename(pluginSource);
        const destPath = PLUGIN_PATHS[download.format];
        const pluginDest = path.join(destPath, pluginName);
        
        console.log('Installing:', pluginSource, '->', pluginDest);
        
        // Remove old version if exists
        if (fs.existsSync(pluginDest)) {
            execSync(`rm -rf "${pluginDest}"`, { stdio: 'pipe' });
        }
        
        // Copy new plugin
        execSync(`cp -R "${pluginSource}" "${pluginDest}"`, { stdio: 'pipe' });
        
        // Apply xattr -cr (may require sudo)
        try {
            console.log('Applying xattr -cr...');
            execSync(`xattr -cr "${pluginDest}"`, { stdio: 'pipe' });
        } catch (xattrError) {
            // Try with sudo
            console.log('Trying with sudo...');
            const applescript = `do shell script "xattr -cr '${pluginDest}'" with administrator privileges`;
            execSync(`osascript -e '${applescript}'`, { stdio: 'pipe' });
        }
        
        console.log('Installation complete!');
        
    } finally {
        // Cleanup
        try {
            execSync(`rm -rf "${extractDir}"`, { stdio: 'pipe' });
            fs.unlinkSync(zipPath);
        } catch (e) {
            console.warn('Cleanup error:', e);
        }
    }
}

// Find files with specific extension recursively
function findFilesWithExtension(dir, extension) {
    const results = [];
    
    function search(currentDir) {
        const files = fs.readdirSync(currentDir);
        
        for (const file of files) {
            const filePath = path.join(currentDir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                if (file.endsWith(extension)) {
                    results.push(filePath);
                } else {
                    search(filePath);
                }
            }
        }
    }
    
    search(dir);
    return results;
}
