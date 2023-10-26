import AppSettings from "@classes/AppSettings.class";
import { CSInterface } from "csinterface-ts"

export enum SCRIPTS {

}

export default class ExtendScriptAPI {
    private settings?: AppSettings
    private cs?: CSInterface

    constructor() {
        // this.settings = new AppSettings()
        try {
            this.cs = new CSInterface()
        } catch (e) {

        }

    }
    public async relinkMissingFiles(): Promise<void> {
        // const settings = await this.settings.fetchSettings()
        // const serializedSettings = JSON.stringify(settings)

        // this.cs.evalScript(`relinkMissingFiles(${serializedSettings})`, () => { })

        console.log("works")
    }
    public async unlinkFiles(): Promise<void> {
        // const settings = await this.settings.fetchSettings()
        // const serializedSettings = JSON.stringify(settings)

        // this.cs.evalScript(`relinkMissingFiles(${serializedSettings})`, () => { })

        console.log("works too")
    }
}