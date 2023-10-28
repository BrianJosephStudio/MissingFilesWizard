import { SearchType } from "@root/types/SearchTypeEnum"
import { SystemFile } from "@root/types/SystemFile";
import { SystemFolder } from "@root/types/SystemFolder";
import { SearchEngine } from "@classes/SearchEngine.class";
import { SearchResults } from "@classes/SearchResults.class";
import path from "path"


export class MissingFile {
    private file: SystemFile
    private name: string
    private originalUri: string;
    private originalFolder: SystemFolder;
    private found?: boolean;
    private newUri?: string;
    private closeMatch?: string[];
    private searchEngine: SearchEngine;

    constructor(originalUri: string) {
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
    }

    async searchOnFileSystem(): Promise<SearchResults> {
        const results = await this.searchEngine.search(this.file, this.originalFolder, SearchType.FILESYSTEM)
        // if (results instanceof SearchResults) {
        // }
        return results
    }
}