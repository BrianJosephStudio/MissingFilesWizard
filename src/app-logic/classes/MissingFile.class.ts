import { SystemFile } from "@root/types/SystemFile.d";
import { SystemFolder } from "@root/types/SystemFolder.d";
import { SearchEngine } from "@classes/SearchEngine.class";
import { SearchResults } from "@classes/SearchResults.class";
// import path from "@mocks/path-mock" //!DEBUGMODE
import path from "path" //-- Production Import
import Reconnector from "@classes/Reconnector.class";

export class MissingFile {
    public file: SystemFile
    public name: string
    public originalUri?: string;
    public originalFolder?: SystemFolder;
    public id: number
    public found?: boolean;
    public newUri?: string;
    public closeMatch?: string[];
    private searchEngine: SearchEngine;

    constructor(name: string, originalUri: string | undefined, id: number) {
        this.name = originalUri ? path.basename(originalUri) : name
        this.originalUri = originalUri ? originalUri : undefined
        this.file = {
            name: this.name,
            originalUri: this.originalUri
        }
        this.id = id
        this.originalFolder = this.originalUri ? {
            uri: path.dirname(this.originalUri)
        } : undefined
        this.searchEngine = new SearchEngine()
    }

    async search(): Promise<void> {
        const searchResults: SearchResults = await this.searchEngine.search(this)
        const reconnector = new Reconnector(this, searchResults)
        const reconnected: boolean = await reconnector.reconnect()
        this.found = reconnected
    }
}