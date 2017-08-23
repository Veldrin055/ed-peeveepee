'use strict';
// renderer process
const ipcRenderer = require('electron').ipcRenderer;
const url = require('url');
const path = require('path');
const CombatRanks = ["Harmless", "Mostly Harmless", "Novice", "Competent", "Expert", "Master", "Dangerous", "Deadly", "Elite"];
const remote = require('electron').remote;
const configuration = require('../configuration');

let CMDR;

var Cmdr = function() {
    return {
        totalKills: 0,
        totalDeaths: 0,
        eventLog: [],
        name: "mystery",
        location: "unknown",
        body: "unknown"
    };
};

Cmdr.Create = function () {
    CMDR = Cmdr();
};

$(document).ready(() => {
    resizeTable();
});

// Adjust the width of thead cells when *window* resizes
$(window).resize(function () {
    resizeTable()
}).resize(); // Trigger the resize handler once the script runs


ipcRenderer.on('name', (events, message) => {
    CMDR.name = message;
    document.getElementById('cmdrName').textContent = CMDR.name;
});

ipcRenderer.on('location', (events, message) => {
    CMDR.location = message.starSystem;
    CMDR.body = message.body;
});

function resizeTable() {
    var $table = $('table'),
        $bodyCells = $table.find('tbody tr:first').children(),
        colWidth;

    // Get the tbody columns width array
    colWidth = $bodyCells.map(function () {
        return $(this).width();
    }).get();

    // Set the width of thead columns
    $table.find('thead tr').children().each(function (i, v) {
        $(v).width(colWidth[i]);
    });
}

function headToHeadEvent(cmdrName) {
    console.log('head to head ' + cmdrName);
    let modal = new remote.BrowserWindow({
        parent: remote.getCurrentWindow(),
        modal: true,
        frame: false,
        transparent: true,
        resizeable: false,
        show: false
    });

    modal.loadURL(url.format({
        pathname: path.join(__dirname, 'headtohead.html'),
        protocol: 'file:',
        slashes: true
    }));

    modal.once('ready-to-show', () => {
        document.getElementById('content').classList.toggle('overlay', true);
        modal.webContents.send('head-to-head', headToHead(cmdrName));
        modal.show();
    });

    modal.on('closed', () => document.getElementById('content').classList.toggle('overlay', false));
}

function calculateKDR (cmdr, el) {
    var kdr;
    if (cmdr.totalDeaths == 0) {
        kdr = 'Undefeated'
    } else {
        kdr = parseFloat(Math.round(cmdr.totalKills / cmdr.totalDeaths)).toFixed(2);
    }
    el.textContent = kdr;
    if (kdr === 'Undefeated' || kdr >= 1) {
        el.classList.add('kills');
        el.classList.remove('deaths')
    } else {
        el.classList.add('deaths');
        el.classList.remove('kills')
    }
}

ipcRenderer.on('kill', (event, message) => {
    if (message.playSound && configuration.readSettings('soundOn')) {
        var audio = new Audio(__dirname + '/wav/killsound.wav');
        audio.volume = configuration.readSettings('volume') / 100;
        audio.currentTime = 0;
        audio.play();
    }
    CMDR.eventLog.push({
        event: 'Kill',
        name: message.Victim,
        timestamp: message.timestamp,
        combatRank: CombatRanks[message.CombatRank],
        location: CMDR.location,
        body: CMDR.body
    });
    CMDR.totalKills++;
    document.getElementById('totalKills').textContent = '' + CMDR.totalKills;
    calculateKDR(CMDR, document.getElementById('totalKdr'));
    var tableRef = document.getElementById('combatLog').getElementsByTagName('tbody')[0];
    var newRow = tableRef.insertRow(0);
    newRow.addEventListener('click', () => {headToHeadEvent(message.Victim)});
    newRow.insertCell(0).appendChild(document.createTextNode('Kill'));
    newRow.insertCell(1).appendChild(document.createTextNode(message.Victim));
    newRow.insertCell(2).appendChild(document.createTextNode(CombatRanks[message.CombatRank]));
    newRow.insertCell(3).appendChild(document.createTextNode(message.timestamp));
    var locationCell = newRow.insertCell(4);
    locationCell.appendChild(document.createTextNode(CMDR.location));
    if (CMDR.location != CMDR.body) {
        locationCell.appendChild(document.createElement('br'));
        locationCell.appendChild(document.createTextNode(CMDR.body));
    }

    resizeTable();
});

function insertCombatEventRow(message) {
    var tableRef = document.getElementById('combatLog').getElementsByTagName('tbody')[0];
    var newRow = tableRef.insertRow(0);
    newRow.insertCell(0).appendChild(document.createTextNode(message.eventType));
    var nameText = document.createTextNode(message.name);
    newRow.addEventListener('click', () => {
        headToHeadEvent(message.name)
    });
    newRow.insertCell(1).appendChild(nameText);
    newRow.insertCell(2).appendChild(document.createTextNode([message.KillerRank]));
    newRow.insertCell(3).appendChild(document.createTextNode(message.timestamp));
    var locationCell = newRow.insertCell(4);
    locationCell.appendChild(document.createTextNode(CMDR.location));
    if (CMDR.location != CMDR.body) {
        locationCell.appendChild(document.createElement('br'));
        locationCell.appendChild(document.createTextNode(CMDR.body));
    }

    resizeTable();
}
ipcRenderer.on('death', (event, message) => {
    CMDR.totalDeaths++;
    if (message.KillerName != null) {
        CMDR.eventLog.push({
            event: 'Death',
            name: message.KillerName.replace('Cmdr ', ''),
            timestamp: message.timestamp,
            combatRank: message.KillerRank,
            location: CMDR.location,
            body: CMDR.body
        });
        message.eventType = 'Death';
        insertCombatEventRow({
            eventType: 'Death',
            name: message.KillerName.replace('Cmdr ', ''),
            timestamp: message.timestamp,
            rank: message.KillerRank,
            location: CMDR.location,
            boyd: CMDR.body
        });
    } else if (message.Killers != null) {
        message.Killers.forEach((killer) => {
            CMDR.eventLog.push({
                event: 'Dearth',
                name: killer.Name.replace('Cmdr ', ''),
                timestamp: message.timestamp,
                combatRank: killer.Rank,
                location: CMDR.location,
                body: CMDR.body
            });
            insertCombatEventRow({
                eventType: 'Death',
                name: killer.Name.replace('Cmdr ', ''),
                timestamp: message.timestamp,
                rank: killer.Rank,
                location: CMDR.location,
                boyd: CMDR.body
            });
        });
    }
    document.getElementById('totalDeaths').textContent = '' + CMDR.totalDeaths;
});

(function () {


    function init() {
        Cmdr.Create();
        document.getElementById("min-btn").addEventListener("click", function (e) {
            const window = remote.getCurrentWindow();
            window.minimize();
        });

        document.getElementById("close-btn").addEventListener("click", function (e) {
            const window = remote.getCurrentWindow();
            window.close();
        });

        document.getElementById('settings-btn').addEventListener('click', () => ipcRenderer.send('open-settings-window'));
    }
    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            init();
        }
    };
})();

function headToHead(cmdrName) {
    var events = CMDR.eventLog.filter(entry => entry.name == cmdrName);
    console.log(events);
    var log = events.sort((a, b) => {
        var dateA = Date.parse(a.timestamp);
        var dateB = Date.parse(b.timestamp);
        if (a < b) return -1;
        if (a > b) return 1;
        if (a == b) return 0;
    });
    var headToHead = {
        name: cmdrName,
        kills: events.filter(entry => entry.event == 'Kill').length,
        deaths: events.filter(entry => entry.event == 'Death').length,
        log: log
    };
    console.log(headToHead);
    return headToHead
}
