// import { readFile } from "fs/promises"
import config from "../../../config"
import { Settings, MISSINGFILESPOOL, SEARCHPOOL, RELINKMETHOD } from "../../..//types/Settings.d"
export default class AppSettings {
    constructor() {

    }

    public async changeSetting(settings: Settings): Promise<Settings> {
        console.log(settings)
        return settings
    }

    public async fetchSettings(): Promise<Settings> {
        // const settingsString = await readFile(config.settingsPath, { encoding: "utf-8" })
        // const settings = JSON.parse(settingsString) as Settings
        // return settings

        return config.defaultSettings

    }
    private async getHomeDir(): Promise<string> {
        return "HomeDirTest"
    }
    public async getProjectDir(): Promise<string> {
        return "ProjectDirTest"
    }
}