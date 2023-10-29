import { readFile, writeFile, mkdir } from "fs/promises"
import config from "../../../config"
import { Settings } from "../../..//types/Settings.d"
export default class AppSettings {
    public readonly settingsFile: string
    public readonly settingsFolder: string

    constructor() {
        this.settingsFile = `${config.settingsPath}/${config.settingsFileName}`
        this.settingsFolder = `${config.settingsPath}`
    }

    public async changeSetting(settings: Settings): Promise<Settings> {
        const currentSettings = await this.fetchSettings()
        const newSettings: Settings = {
            ...currentSettings,
            ...settings
        }
        await writeFile(this.settingsFile, JSON.stringify(newSettings))
        return newSettings
    }

    public async fetchSettings(): Promise<Settings> {
        let settingsString: string = ""
        try {
            settingsString = await readFile(this.settingsFile, { encoding: "utf-8" })
        } catch (e: any) {
            if (e.code === "ENOENT") {
                await mkdir(this.settingsFolder)
                await writeFile(this.settingsFile, JSON.stringify(config.defaultSettings))
                settingsString = await readFile(this.settingsFile, { encoding: "utf-8" })
                if (!settingsString) {
                    alert("Error trying to write down Settings file")
                }
            } else {
                alert("error not found")
            }
        } finally {
            const settings = JSON.parse(settingsString) as Settings
            return settings
        }
    }
}