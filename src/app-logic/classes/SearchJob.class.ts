import { Settings } from "http2";
import AppSettings from "./AppSettings.class";
import { MissingFile } from "./MissingFile.class";
import { SEARCHPOOL } from "../utils/SettingConstants";
import { SystemFile } from "@root/types/SystemFile";
import { MissingItem } from "@root/types/MissingItem";
import ExtendScriptAPI from "@classes/ExtendScriptAPI.class";
import { Logger } from "@classes/Logger.class";

export default class SearchJob {
    private missingFilePaths: MissingItem[]
    private searchQueue: MissingFile[]
    private extenScriptAPI: ExtendScriptAPI
    private logger: Logger

    constructor() {
        this.missingFilePaths = []
        this.searchQueue = []
        this.extenScriptAPI = new ExtendScriptAPI()
        this.logger = new Logger()
    }

    async getMissingFilePaths(): Promise<void> {
        this.missingFilePaths = await this.extenScriptAPI.getMissingFilePaths()
    }

    async createQueue(): Promise<void> {
        const idMap = new Map()
        const queueItems = this.missingFilePaths.filter((missingItem) => {
            if (!idMap.has(missingItem.id)) {
                idMap.set(missingItem.id, true);
                return true;
            }
            return false;
        });

        queueItems.forEach(async (missingItem) => {
            const missingFile: MissingFile = new MissingFile(missingItem.name, missingItem.uri, missingItem.id)
            this.searchQueue.push(missingFile)
        })
    }

    async start(): Promise<void> {
        await AppSettings.refreshSettings()

        await this.getMissingFilePaths()
        await this.createQueue()

        if (this.searchQueue.length === 0) {
            this.logger.log("Did not find any missing items in your target pool")
            return
        }

        this.searchQueue.forEach(async (missingFile: MissingFile) => {
            await missingFile.search()
        })
    }
}