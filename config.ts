import { Settings, MISSINGFILESPOOL, SEARCHPOOL, RELINKMODE } from "./types/Settings.d"
// import os from "os"
// const homedir = os.homedir()

const defaultSettings: Settings = {
    getMissingFilesFrom: MISSINGFILESPOOL.PROJECT,
    searchMatchingFilesIn: SEARCHPOOL.SYSTEM,
    relinkMethod: RELINKMODE.RELINKMISSING,
    searchPath: "",
    ignoreFileExtensions: false,
    perfectMatch: true,
    showHelpTips: true
}

const config = {
    settingsPath: "@public/AppSettings.json",
    defaultSettings: defaultSettings,
}

export default config