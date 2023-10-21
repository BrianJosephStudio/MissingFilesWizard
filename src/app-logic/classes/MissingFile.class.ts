import { SearchEngine } from "./SearchEngine.class";
import { SearchType } from "../../../types/SearchTypeEnum"
import * as path from "path"
import { SystemFile } from "../../../types/SystemFile";


export class MissingFile {
    private file: SystemFile
    private name: string
    private originalUri: string;
    private originalFolder?: string;
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
    }

    async searchOnFileSystem() {
        await this.searchEngine.search(this.file, SearchType.FILESYSTEM)
    }
}