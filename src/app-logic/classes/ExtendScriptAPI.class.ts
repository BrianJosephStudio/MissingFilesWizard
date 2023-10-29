import AppSettings from "@classes/AppSettings.class";
import { CSInterface } from "csinterface-ts"

export enum SCRIPTS {

}

export default class ExtendScriptAPI {
    private settings: AppSettings
    private cs?: CSInterface

    constructor() {
        this.settings = new AppSettings()
        this.cs = new CSInterface()
    }
    public async relinkMissingFiles(): Promise<void> {
        // const settings = await this.settings.fetchSettings()
        // const serializedSettings = JSON.stringify(settings)

        // this.cs.evalScript(`relinkMissingFiles(${serializedSettings})`, () => { })

    }
    public async unlinkFiles(): Promise<void> {
        this.cs?.evalScript("setSelectionToMissing(app.project.selection)", (() => { }))
    }
}