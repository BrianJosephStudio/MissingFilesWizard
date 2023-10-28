import AppSettings from "@classes/AppSettings.class"
import ExtendScriptAPI from "@classes/ExtendScriptAPI.class"

export enum AppElements {
    RELINKBUTTON = "RELINKBUTTON"
}

export default class MissingFilesWizard {
    private static instance: MissingFilesWizard
    private settings: AppSettings
    private extendScriptApi: ExtendScriptAPI

    constructor() {
        this.settings = new AppSettings()
        this.extendScriptApi = new ExtendScriptAPI()
    }
    public static getInstance(): MissingFilesWizard {
        if (!MissingFilesWizard.instance) {
            MissingFilesWizard.instance = new MissingFilesWizard();
        }
        return MissingFilesWizard.instance;
    }

    public async attachFunctionality(element: HTMLElement): Promise<void> {
        if (element.id === AppElements.RELINKBUTTON) {
            element.addEventListener("click", () => {
                this.extendScriptApi.relinkMissingFiles()
            })
        }
    }

}