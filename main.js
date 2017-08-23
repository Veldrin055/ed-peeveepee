/**
 * Created by Daniel on 03/08/2017.
 * yo
 */
const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;
const url = require('url');
const path = require('path');
const fs = require('fs');
const os = require('os');
const chokidar = require('chokidar');
const Tail = require('tail').Tail;

let win;
let tail;
let settingsWindow;
let configuration = require('./configuration');

// Settings
let journalDir;
let volume;
let soundOn;

let watcher = chokidar.watch(journalDir, {
    persistant: true,
    ignored: '^|[\/\\])\../',
    ignoreInitial: true
});

function startWatching (file, fromBeginning) {
    if (tail) {
        tail.unwatch();
    }
    tail = new Tail(file, {fromBeginning: fromBeginning});
    tail.watch();
    console.log('Now watching ' + file);
    tail.on('line', data => {
        readJournalLine(data, false);
    })
}

watcher.on('add', newPath => {
    if (path.extname(newPath) == '.log') {
        console.log('New log file discovered: ' + newPath);
        startWatching(newPath, true);
    }
});

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 800,
        frame: false,
        transparent: true,
        resizeable: true,
        show: false,
        hasShadow: true,
        thickFrame: true
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, '/app/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    var splash = new BrowserWindow({
        height: 600,
        width: 400,
        frame: false,
        resizeable: false,
        show: true,
        alwaysOnTop: true,
        center: true,
        backgroundColor: '#616161'
    });

    splash.loadURL(url.format({
        pathname: path.join(__dirname, '/app/splash.html'),
        protocol: 'file:',
        slashes: true
    }));

    splash.once('ready-to-show', () => splash.show());

    win.on('closed', () => {
        win = null;
    });

    win.webContents.on('dom-ready', () => {
        console.log(journalDir);
        fs.readdir(journalDir, (err, items) => {
            // here do the regex, get them all in order
            var logFiles = items.filter((itemName) => {
                 return path.extname(itemName) === '.log';
            });
            if (logFiles.length === 0) {
                win.webContents.send('error', {message: "Cannot find journal log file in " + journalDir});
                return;
            }
            for (var i = 0; i < logFiles.length; i++) {
                if (path.extname(logFiles[i]) != '.log') {
                    continue;
                }
                var lines = fs.readFileSync((journalDir + '/' + logFiles[i]), 'utf-8').split('\n').filter(Boolean);
                lines.forEach(line => readJournalLine(line, true));
            }
            startWatching(journalDir + '/' + logFiles[logFiles.length - 1], false);
        });
        splash.destroy();
        win.show();
    });
}

function setSettings () {
    soundOn = configuration.readSettings('soundOn');
    journalDir = configuration.readSettings('journalDir');
    volume = configuration.readSettings('volume');
}

app.on('ready', () =>{
    // Settings defaults
    if (!configuration.readSettings('journalDir')) {
        configuration.saveSettings('journalDir', path.normalize(os.homedir() + '/Saved Games/Frontier Developments/Elite Dangerous'))
    }
    if (!configuration.saveSettings('soundOn')) {
        configuration.saveSettings('soundOn', true);
    }
    if (!configuration.readSettings('volume')) {
        configuration.saveSettings('volume', 50);
    }
    var x1 = 0, y1 = 0, z1 = 0;
    var x2 = 12.46875, y2 = -66.71875, z2 = -22.90625;

    var sqrt = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
    console.log('KF/Sol distance ' + sqrt);
    setSettings();
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

var isACmdr = function (obj) {
    return (obj.KillerName != null && obj.KillerName.startsWith('Cmdr')) ||
        (obj.Killers != null );

};
function readJournalLine(line, backFill) {
    try {
        var obj = JSON.parse(line);
    } catch (e) {
        console.error(e);
        return;
    }
    if ('StarSystem' in obj && obj.event != 'StartJump') {
        win.webContents.send('location', {
            starSystem: obj.StarSystem,
            body: obj.Body
        });
    }
    if (obj.event == 'PVPKill') {
        obj.playSound = !backFill && soundOn;
        obj.volume = volume;
        win.webContents.send('kill', obj);
    }
    if (obj.event == 'Died' && isACmdr(obj)) {
        win.webContents.send('death', obj);
    }
    if (obj.event == 'LoadGame') {
        win.webContents.send('name', obj.Commander);
    }
}

ipcMain.on('close-main-window', () => {
    app.quit();
});

ipcMain.on('open-settings-window', () => {
    if (settingsWindow) {
        return;
    }

    settingsWindow = new BrowserWindow({
        frame: false,
        height: 400,
        width: 400,
        resizeable: false,
        transparent: true,
        parent: win
    });

    settingsWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/app/settings.html'),
        protocol: 'file:',
        slashes: true
    }));

    settingsWindow.on('closed', () => settingsWindow = null);
});
