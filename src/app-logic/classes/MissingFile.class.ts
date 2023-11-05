import { SystemFile } from "@root/types/SystemFile.d";
import { SystemFolder } from "@root/types/SystemFolder.d";
import { SearchEngine } from "@classes/SearchEngine.class";
import { SearchResults } from "@classes/SearchResults.class";
import { SearchType } from "@root/src/app-logic/utils/SearchTypeEnum"
// import path from "@mocks/path-mock" //!DEBUGMODE
import path from "path" //-- Production Import
import AppSettings from "@classes/AppSettings.class";
import ExtendScriptAPI from "@classes/ExtendScriptAPI.class";
import Reconnector from "@classes/Reconnector.class";

export class MissingFile {
    public file: SystemFile
    public name: string
    public originalUri: string;
    public originalFolder: SystemFolder;
    public id: number
    public found?: boolean;
    public newUri?: string;
    public closeMatch?: string[];
    private searchEngine: SearchEngine;

    constructor(originalUri: string, id: number) {
        this.name = path.basename(originalUri)
        this.originalUri = originalUri
        this.file = {
            name: this.name,
            originalUri: this.originalUri
        }
        this.searchEngine = new SearchEngine()
        this.originalFolder = {
            uri: path.dirname(this.originalUri)
        }
        this.id = id
    }

    async search(): Promise<void> {
        const searchResults: SearchResults = await this.searchEngine.search(this)
        const reconnector = new Reconnector(this, searchResults)
        const reconnected: boolean = await reconnector.reconnect()
        this.found = reconnected
    }
}