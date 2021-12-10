const os = require('os')
const util = require('util')
const fs = require('fs')
const childProcess = require('child_process')
const exec = util.promisify(childProcess.exec)

const startBrowser = async (browser, url) => {
    try {
        if (os.type() == 'Windows_NT')
            await exec(`start ${browser} ${url}`)
        else if (os.type() == 'Linux')
            await exec(`${browser == 'chrome' ? 'google-chrome' : 'firefox'} ${url}`)
        else
            await exec(`open -a ${browser == 'chrome' ? '"Google Chrome"' : 'Firefox '} ${url}`)

    } catch (err) {
        console.log(err);
        return err;
    }

    return browser + " Browser running " + url;

}

const stopBrowser = async (browser) => {
    try {
        if (os.type() == 'Windows_NT')
            await exec(`taskkill /F /IM ${browser}.exe`)
        else if (os.type() == 'Linux')
            await exec(`pkill -9 ${browser}`)
        else
            await exec(`killall ${browser}`)

    } catch (err) {
        console.log(err);
        return err;
    }

    return browser + " Browser stoped ";
}


const getURL = async (browser) => {
    var path = '';
    if (browser == 'chrome') {
        try {
            await stopBrowser('chrome')
        } catch (err) {
            //return err;
        } finally {
            var string = await exec(String.raw`.\chrome-session-dump.exe -active "C:\Users\91790\AppData\Local\Google\Chrome\User Data\Profile 3\Sessions" `)
            return string;
        }
    }

    else {
        var result = await exec('python recovery.py')
        return result;
    }
}

const cleanUp = (browser) => {

    //// kill all process of chrome.exe using task kill then rename or delete the folder

}



module.exports = {
    startBrowser,
    stopBrowser,
    getURL
}
