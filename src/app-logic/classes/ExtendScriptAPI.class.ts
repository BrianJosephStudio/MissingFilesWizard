import AppSettings from "@classes/AppSettings.class";
import { CSInterface } from "csinterface-ts"
import config from "@root/config";
import { MISSINGFILESPOOL } from "../utils/SettingConstants";
import { Settings } from "@root/types/Settings";

export enum SCRIPTS {

}

export default class ExtendScriptAPI {
    private cs?: CSInterface

    constructor() {
        if (config.debug) { return }
        this.cs = new CSInterface()
    }

    public async unlinkFiles(): Promise<void> {
        if (config.debug) { return }
        this.cs?.evalScript("setSelectionToMissing(app.project.selection)", (() => { }))
    }

    public async getMissingFilePaths(): Promise<string[]> {
        const settings: Settings = AppSettings.currentSettings
        let missingFilePaths: string[] = []

        switch (settings.missingFilesPool) {
            case MISSINGFILESPOOL.PROJECT:
                missingFilePaths = await this.getMissingFilesInProject()
        }

        return missingFilePaths
    }

    private async getMissingFilesInProject(): Promise<string[]> {
        const script = `getMissingFilesInProject()`
        let missingFilePaths: string[] = []

        this.cs?.evalScript(script, ((response: string[]) => {
            missingFilePaths = response
        }))

        return missingFilePaths
    }
}