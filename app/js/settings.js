/**
 * Created by Daniel on 14/08/2017.
 */

const electron = require('electron');
const {remote} = electron;
const {dialog} = remote;
const configuration = require('../configuration.js');

(function () {


    function init() {

        document.getElementById('journalFileLocation').value = configuration.readSettings('journalDir');
        document.getElementById('soundOn').checked = configuration.readSettings('soundOn');
        document.getElementById('volume').value = configuration.readSettings('volume');

        document.getElementById("settingsForm").addEventListener('submit', (e) => {
            console.log('Saving settings...');
            e.preventDefault();

            configuration.saveSettings('journalDir', document.getElementById('journalFileLocation').value);
            configuration.saveSettings('soundOn', document.getElementById('soundOn').checked);
            configuration.saveSettings('volume', document.getElementById('volume').value);

            const window = remote.getCurrentWindow();
            window.close();
        }, false);

        document.getElementById('chooseFile').addEventListener('click', (e) => {
            e.preventDefault();
            dialog.showOpenDialog(remote.getCurrentWindow(), {
                title: 'Choose Journal file directory',
                defaultPath: configuration.readSettings('journalDir'),
                properties: ['openDirectory']
            }, (filePaths) => {
                var filePath = filePaths[0];
                console.log('Setting Journal dir to ' + filePath);
                document.getElementById('journalFileLocation').value = filePath;
            })
        }, false)
    }

    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            init();
        }
    };
})();
