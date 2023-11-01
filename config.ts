import { Settings } from "./types/Settings.d"
import { MISSINGFILESPOOL, SEARCHPOOL, RELINKMETHOD } from "@utils/SettingConstants"
// import * as os from "@mocks/os-mock"//!DEBUGMODE
import os from "os" //-- Production Import

const homedir = os.homedir()

const defaultSettings: Settings = {
    missingFilesPool: MISSINGFILESPOOL.SELECTION,
    searchPool: SEARCHPOOL.SYSTEM,
    relinkMethod: RELINKMETHOD.RECONNECT,
    searchPath: homedir,
    ignoreFileExtensions: false,
    perfectMatch: true,
    showHelpTips: true
}

const config = {
    settingsFileName: "App_Settings.json",
    settingsPath: `${homedir}/MF Wizard`,
    defaultSettings: defaultSettings,
    debug: false //!DEBUGMODE
}

export default config