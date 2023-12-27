import AppSettings from "@classes/AppSettings.class";
// import { CSInterface } from "@mocks/csInterface-mock" //!DEBUGMODE
import { CSInterface } from "csinterface-ts" //-- Production Import
import config from "@root/config";
import { MISSINGFILESPOOL } from "../utils/SettingConstants";
import { Settings } from "@root/types/Settings";
import { MissingItem } from "@root/types/MissingItem";
import { Logger } from "@classes/Logger.class";
import { ProjectItem } from "@root/types/ProjectItem";

export enum SCRIPTS {

}
interface csResponse {
    result: boolean,
    message: string
}

export default class ExtendScriptAPI {
    private cs?: CSInterface
    private logger: Logger

    constructor() {
        this.logger = new Logger()
        if (config.debug) { return }
        this.cs = new CSInterface()
    }

    public async unlinkFiles(): Promise<void> {
        if (config.debug) { return }
        this.cs?.evalScript("setSelectionToMissing(app.project.selection)", (() => { }))
    }

    public async getMissingFilePaths(): Promise<MissingItem[]> {
        const settings: Settings = AppSettings.currentSettings
        let missingFilePaths: MissingItem[] = []

        switch (settings.missingFilesPool) {
            case MISSINGFILESPOOL.PROJECT:
                missingFilePaths = await this.getMissingFilesInProject()
                break;
            case MISSINGFILESPOOL.SELECTION:
                missingFilePaths = await this.getMissingFilesInSelection()
                break;
            case MISSINGFILESPOOL.ACTIVECOMP:
                missingFilePaths = await this.getMissingFilesInActiveComp()
                break;
        }
        return missingFilePaths
    }

    private async getMissingFilesInProject(): Promise<MissingItem[]> {
        return new Promise<MissingItem[]>((resolve, reject) => {
            const script = `getSystemFilesFromFootageItemArray(
                getMissingFilesInProject()
            )`;
            this.cs?.evalScript(script, (response: string) => {
                try {
                    const missingFilePaths = JSON.parse(response) as MissingItem[];
                    resolve(missingFilePaths);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    private async getMissingFilesInSelection(): Promise<MissingItem[]> {
        return new Promise<MissingItem[]>((resolve, reject) => {
            const script = `getSystemFilesFromFootageItemArray(
                getMissingFilesInSelection()
            )`;
            this.cs?.evalScript(script, (response: string) => {
                try {
                    const missingFilePaths = JSON.parse(response) as MissingItem[];
                    resolve(missingFilePaths);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    private async getMissingFilesInActiveComp(): Promise<MissingItem[]> {
        return new Promise<MissingItem[]>((resolve, reject) => {
            const script = `getSystemFilesFromFootageItemArray(
                getMissingFilesInActiveComp()
            )`;
            this.cs?.evalScript(script, (response: string) => {
                try {
                    const missingFilePaths = JSON.parse(response) as MissingItem[];
                    resolve(missingFilePaths);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    public async getAllProjectFootageItems(): Promise<ProjectItem[]> {
        return new Promise<ProjectItem[]>((resolve, reject) => {
            const script = `getSystemFilesFromFootageItemArray(
                getAllProjectFootageItems()
            )`;
            this.cs?.evalScript(script, (response: string) => {
                try {
                    const systemFiles = JSON.parse(response) as ProjectItem[];
                    resolve(systemFiles);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }


    public async reconnectMissingFile(itemId: number, newUrl: string): Promise<boolean> {
        const script = `reconnectMissingFile(${itemId},"${newUrl}")`
        let reconnected: boolean = false

        this.cs?.evalScript(script, async (response) => {
            const csResponse = JSON.parse(response) as csResponse
            if (!csResponse.result) {
            }
            reconnected = csResponse.result
        })
        return reconnected
    }

    public async openDialog(): Promise<void> {
        const currentPath = AppSettings.currentSettings.searchPath
        const script = `openDialog("${currentPath}")`
        this.cs?.evalScript(script, (response: string) => {
            if (response === "Error" || !response) {
                this.logger.log("Error trying to set search path")
                return
            }
            const newSetting: Settings = {
                searchPath: response.replace(/\\/g, "/").replace(/%20/g, " ")
            }
            AppSettings.changeSetting(newSetting)
            AppSettings.setSearchPathOnUI(response)
        })
    }

    public async setProjectPath(): Promise<void> {
        const script = `getProjectPath()`
        this.cs?.evalScript(script, async (response) => {
            if (response && response !== "") {
                return AppSettings.setSearchPathOnUI(response.replace(/\\/g, "/").replace(/%20/g, " "))
            }
            this.logger.log("Could not get project path")
        })
    }
}