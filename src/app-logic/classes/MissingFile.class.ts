import { SystemFile } from "@root/types/SystemFile.d";
import { SystemFolder } from "@root/types/SystemFolder.d";
import { SearchEngine } from "@classes/SearchEngine.class";
import { SearchResults } from "@classes/SearchResults.class";
import { SearchType } from "@root/types/SearchTypeEnum.d"
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
        const results = await this.searchEngine.search(this.file, this.originalFolder, 0)
        // if (results instanceof SearchResults) {
        // }
        return results
    }
}