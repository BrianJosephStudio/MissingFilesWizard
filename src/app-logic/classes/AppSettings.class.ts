// import { readFile, writeFile, mkdir } from "@mocks/fs-mock" //!DEBUGMODE
import { readFile, writeFile, mkdir } from "fs/promises" //-- Production Import
import config from "@root/config"
import { Settings } from "@root/types/Settings.d"
import { Logger } from "@classes/Logger.class"
export default class AppSettings {
    public static currentSettings: Settings = config.defaultSettings
    public static settingsFile: string = `${config.settingsPath}/${config.settingsFileName}`
    public static settingsFolder: string = `${config.settingsPath}`
    private static logger: Logger

    constructor() {
    }

    public static async changeSetting(settings: Settings): Promise<Settings> {
        const currentSettings = await AppSettings.fetchSettings()
        const newSettings: Settings = {
            ...currentSettings,
            ...settings
        }

        await writeFile(this.settingsFile, JSON.stringify(newSettings, null, 2))
        if (config.debug) { console.log(settings) }

        this.currentSettings = newSettings
        return newSettings
    }

    public static async fetchSettings(): Promise<Settings> {
        await AppSettings.refreshSettings()
        return this.currentSettings
    }

    public static async refreshSettings(): Promise<void> {
        let settingsString: string = ""
        try {
            settingsString = await readFile(this.settingsFile, { encoding: "utf-8" })
        } catch (e: any) {
            if (e.code === "ENOENT") {
                await mkdir(this.settingsFolder)
                await writeFile(this.settingsFile, JSON.stringify(config.defaultSettings))
                settingsString = await readFile(this.settingsFile, { encoding: "utf-8" })
                if (!settingsString) {
                    AppSettings.logger.log("Error trying to write down Settings file")
                }
            } else {
                AppSettings.logger.log("error not found")
            }
        } finally {
            const settings = JSON.parse(settingsString) as Settings
            AppSettings.currentSettings = settings
        }
    }

    public static setSearchPathOnUI(path: string): void {
        const textInput = document.getElementById("searchPath") as HTMLInputElement
        textInput!.value = path
        const pathLength = path.length
        textInput.setSelectionRange(pathLength, pathLength)
        textInput.focus()
    }
}