import { Settings } from "http2";
import AppSettings from "./AppSettings.class";
import { MissingFile } from "./MissingFile.class";
import { SEARCHPOOL } from "../utils/SettingConstants";
import { SystemFile } from "@root/types/SystemFile";
import ExtendScriptAPI from "@classes/ExtendScriptAPI.class";

export default class SearchJob {
    private missingFilePaths: string[]
    private searchQueue: MissingFile[]
    private extenScriptAPI: ExtendScriptAPI

    constructor() {
        this.missingFilePaths = []
        this.searchQueue = []
        this.extenScriptAPI = new ExtendScriptAPI()
    }

    async getMissingFilePaths(): Promise<void> {
        this.missingFilePaths = await this.extenScriptAPI.getMissingFilePaths()
    }

    async createQueue(): Promise<void> {
        const filteredSet: Set<string> = new Set()
        this.missingFilePaths.forEach(missingFile => {
            filteredSet.add(missingFile)
        })

        const queueItems = Array.from(filteredSet)
        queueItems.forEach(async (path) => {
            const missingFile: MissingFile = new MissingFile(path)
            this.searchQueue.push(missingFile)
        })
    }

    async start(): Promise<void> {
        await AppSettings.refreshSettings()

        await this.getMissingFilePaths()
        await this.createQueue()

        this.searchQueue.forEach(async (missingFile: MissingFile) => {
            await missingFile.search()
        })
    }
}