import { Settings } from "./types/Settings.d"

export interface Config {
    settingsFileName: string
    settingsPath: string
    defaultSettings: Settings
    maxDepth: number;
    debug: boolean
}