import AppSettings from "@classes/AppSettings.class";
import { CSInterface } from "csinterface-ts"
import config from "@root/config";

export enum SCRIPTS {

}

export default class ExtendScriptAPI {
    private settings: AppSettings
    private cs?: CSInterface

    constructor() {
        this.settings = new AppSettings()
        if (config.debug) { return }
        this.cs = new CSInterface()
    }
    public async relinkMissingFiles(): Promise<void> {
        const settings = await this.settings.fetchSettings()
        const serializedSettings = JSON.stringify(settings)
        if (config.debug) {
            console.log(serializedSettings)
            return
        }
        this.cs?.evalScript(`relinkMissingFiles(${serializedSettings})`, () => { })

    }
    public async unlinkFiles(): Promise<void> {
        if (config.debug) { return }
        this.cs?.evalScript("setSelectionToMissing(app.project.selection)", (() => { }))
    }
}