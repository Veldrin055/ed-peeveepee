'use strict';
// renderer process
const ipcRenderer = require('electron').ipcRenderer;
const CombatRanks = ["Harmless", "Mostly Harmless", "Novice", "Competent", "Expert", "Master", "Dangerous", "Deadly", "Elite"];
const remote = require('electron').remote;

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

function calculateKDR(kills, deaths, el) {
    var kdr;
    if (deaths === 0) {
        kdr = 'Undefeated'
    } else {
        kdr = parseFloat(Math.round(kills / deaths)).toFixed(2);
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
ipcRenderer.on('head-to-head', (event, message) => {
    console.log(message);
    document.getElementById('title').textContent = 'Head to Head: ' + message.name;
    document.getElementById('cmdrName').textContent = message.name;
    document.getElementById('totalKills').textContent = '' + message.kills;
    document.getElementById('totalDeaths').textContent = '' + message.deaths;
    calculateKDR(message.kills, message.deaths, document.getElementById('totalKDR'));
    var tableRef = document.getElementById('combatLog').getElementsByTagName('tbody')[0];
    var i = 0;
    message.log.forEach(entry => {
        var newRow = tableRef.insertRow(i++);
        newRow.insertCell(0).appendChild(document.createTextNode(entry.event));
        newRow.insertCell(1).appendChild(document.createTextNode(entry.combatRank));
        newRow.insertCell(2).appendChild(document.createTextNode(entry.timestamp));
        var locationCell = newRow.insertCell(3);
        locationCell.appendChild(document.createTextNode(entry.location));
        if (entry.location != entry.body) {
            locationCell.appendChild(document.createElement('br'));
            locationCell.appendChild(document.createTextNode(entry.body));
        }
    });

    resizeTable();
});

(function () {


    function init() {

        document.getElementById("close-btn").addEventListener("click", function (e) {
            const window = remote.getCurrentWindow();
            window.close();
        });
    }

    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            init();
        }
    };
})();
