import { Settings, MISSINGFILESPOOL, SEARCHPOOL, RELINKMETHOD } from "./types/Settings.d"
// import os from "os"
// const homedir = os.homedir()

const defaultSettings: Settings = {
    missingFilesPool: MISSINGFILESPOOL.PROJECT,
    searchPool: SEARCHPOOL.SYSTEM,
    relinkMethod: RELINKMETHOD.RECONNECT,
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