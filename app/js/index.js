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
        location: "unknown"
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
    CMDR.location = message;
});

function resizeTable() {
// Change the selector if needed
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
        modal.webContents.send('head-to-head', headToHead(cmdrName));
        modal.show();
    })
}

function calculateKDR (cmdr) {
    if (cmdr.totalDeaths == 0) {
        return 'Undefeated'
    }
    return parseFloat(Math.round(cmdr.totalKills / cmdr.totalDeaths)).toFixed(2);
}

ipcRenderer.on('kill', (event, message) => {
    console.log(message);
    if (message.playSound && configuration.readSettings('soundOn')) {     // todo and enabled in settings
        var audio = new Audio(__dirname + '/wav/killsound.wav');
        audio.volume = configuration.readSettings('volume') / 100;    // todo take this from settings  /100
        audio.currentTime = 0;
        audio.play();
    }
    CMDR.eventLog.push({
        event: 'Kill',
        name: message.Victim,
        timestamp: message.timestamp,
        combatRank: CombatRanks[message.CombatRank],
        location: CMDR.location
    });
    CMDR.totalKills++;
    document.getElementById('totalKills').textContent = '' + CMDR.totalKills;
    document.getElementById('totalKdr').textContent = calculateKDR(CMDR);
    var tableRef = document.getElementById('combatLog').getElementsByTagName('tbody')[0];
    var newRow = tableRef.insertRow(0);
    newRow.addEventListener('click', () => {headToHeadEvent(message.Victim)});
    newRow.insertCell(0).appendChild(document.createTextNode('Kill'));
    newRow.insertCell(1).appendChild(document.createTextNode(message.Victim));
    newRow.insertCell(2).appendChild(document.createTextNode(CombatRanks[message.CombatRank]));
    newRow.insertCell(3).appendChild(document.createTextNode(message.timestamp));
    newRow.insertCell(4).appendChild(document.createTextNode(CMDR.location));

    resizeTable();
});

ipcRenderer.on('death', (event, message) => {
    CMDR.totalDeaths++;
    CMDR.eventLog.push({
        event: 'Death',
        name: message.KillerName,
        timestamp: message.timestamp,
        combatRank: message.KillerRank,
        location: CMDR.location
    });
    document.getElementById('totalDeaths').textContent = '' + CMDR.totalDeaths;
    var tableRef = document.getElementById('combatLog').getElementsByTagName('tbody')[0];
    var newRow = tableRef.insertRow(0);
    newRow.insertCell(0).appendChild(document.createTextNode('Death'));
    var nameText = document.createTextNode(message.KillerName);
    nameText.addEventListener('click', () => {headToHeadEvent(message.KillerName)});
    newRow.insertCell(1).appendChild(nameText);
    newRow.insertCell(2).appendChild(document.createTextNode(CombatRanks[message.KillerRank]));
    newRow.insertCell(3).appendChild(document.createTextNode(message.timestamp));
    newRow.insertCell(4).appendChild(document.createTextNode(CMDR.location));

    resizeTable();
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
