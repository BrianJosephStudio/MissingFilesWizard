import { MissingFile } from "@classes/MissingFile.class";
import { SearchResults } from "@classes/SearchResults.class";
import ExtendScriptAPI from "@classes/ExtendScriptAPI.class";
import { Logger } from "@classes/Logger.class";
import AppSettings from "./AppSettings.class";
// import path from "@mocks/path-mock" //!DEBUGMODE
import path from "path" //-- Production Import

export default class Reconnector {
    private missingFile: MissingFile
    private searchResults: SearchResults
    private extendScriptApi
    private logger: Logger

    constructor(missingFile: MissingFile, searchResults: SearchResults) {
        this.missingFile = missingFile
        this.searchResults = searchResults
        this.extendScriptApi = new ExtendScriptAPI()
        this.logger = new Logger()
    }

    async reconnect(): Promise<boolean> {
        if (this.searchResults.results.length === 0) {
            this.logger.log(`Could not find matches for ${this.missingFile.name}`)
            return false
        }
        let reconnected: boolean = false
        const id = this.missingFile.id
        const uri = this.searchResults.results[0].uri?.replace(/\\/g, "/")
        if(AppSettings.currentSettings.consolidate && this.missingFile.newId){
            reconnected = await this.extendScriptApi.consolidateMissingFile(id,this.missingFile.newId)
        } else {
            reconnected = await this.extendScriptApi.reconnectMissingFile(id, uri!)
        }

        if (reconnected) {
            this.missingFile.file.uri = uri
        }
        return reconnected
    }
}