// import { readFile, writeFile, mkdir } from "@mocks/fs-mock" //!DEBUGMODE
import { readFile, writeFile, mkdir } from "fs/promises" //-- Production Import
import config from "@root/config"
import { Settings } from "@root/types/Settings.d"
import { Logger } from "@classes/Logger.class"
export default class AppSettings {
    public readonly settingsFile: string
    public readonly settingsFolder: string
    private logger: Logger

    constructor() {
        this.settingsFile = `${config.settingsPath}/${config.settingsFileName}`
        this.settingsFolder = `${config.settingsPath}`
        this.logger = new Logger()
    }

    public async changeSetting(settings: Settings): Promise<Settings> {
        const currentSettings = await this.fetchSettings()
        const newSettings: Settings = {
            ...currentSettings,
            ...settings
        }
        await writeFile(this.settingsFile, JSON.stringify(newSettings))
        if (config.debug) { console.log(settings) }
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
                    this.logger.log("Error trying to write down Settings file")
                }
            } else {
                this.logger.log("error not found")
            }
        } finally {
            const settings = JSON.parse(settingsString) as Settings
            return settings
        }
    }
}