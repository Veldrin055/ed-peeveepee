/**
 * Created by Daniel on 14/08/2017.
 */

const remote = require('electron').remote;
const configuration = require('../configuration.js');

(function () {


    function init() {

        document.getElementById('journalFileLocation').value = configuration.readSettings('journalDir');
        document.getElementById('soundOn').checked = configuration.readSettings('soundOn');
        document.getElementById('volume').value = configuration.readSettings('volume');

        document.getElementById("settingsForm").addEventListener('submit', (e) => {
            e.preventDefault();

            configuration.saveSettings('journalDir', document.getElementById('journalFileLocation').value);
            configuration.saveSettings('soundOn', document.getElementById('soundOn').checked);
            configuration.saveSettings('volume', document.getElementById('volume').value);

            const window = remote.getCurrentWindow();
            window.close();
        }, false);
    }

    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            init();
        }
    };
})();
