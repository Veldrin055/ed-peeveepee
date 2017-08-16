/**
 * Created by Daniel on 14/08/2017.
 */

'use strict';

const settingsDir = require('path').normalize(require('os').homedir() + '/.pvp-tracker');
try {
    require('fs').mkdirSync(settingsDir);
} catch (err) {
    if (err.code !== 'EEXIST') throw err; // if it exists, it's ok we can ignore it
}

let nconf = require('nconf').file({file: settingsDir + '/pvp-config.json'});

function saveSettings(settingKey, settingValue) {
    nconf.set(settingKey, settingValue);
    nconf.save();
}

function readSettings(settingKey) {
    nconf.load();
    return nconf.get(settingKey);
}

module.exports = {
    saveSettings: saveSettings,
    readSettings: readSettings
};


