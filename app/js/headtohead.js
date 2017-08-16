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

function calculateKDR(kills, deaths) {
    if (deaths == 0) {
        return 'Undefeated'
    }
    return parseFloat(Math.round(kills / deaths)).toFixed(2);
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
    document.getElementById('totalKDR').textContent = calculateKDR(message.kills, message.deaths);
    var tableRef = document.getElementById('combatLog').getElementsByTagName('tbody')[0];
    var i = 0;
    message.log.forEach(entry => {
        var newRow = tableRef.insertRow(i++);
        newRow.insertCell(0).appendChild(document.createTextNode(entry.event));
        newRow.insertCell(1).appendChild(document.createTextNode(entry.combatRank));
        newRow.insertCell(2).appendChild(document.createTextNode(entry.timestamp));
        newRow.insertCell(3).appendChild(document.createTextNode(entry.location));
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
