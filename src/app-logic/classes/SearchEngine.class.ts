import { SearchType } from "../../../types/SearchTypeEnum"
import { FileSystemSearch } from "./FileSystemSearch.class"
import { SearchError } from "../../../types/SearchError"
import { SystemFile } from "../../../types/SystemFile"

interface FoundFile {
    name: string,
    uri: string,
    perfectMatch: boolean,
    size: number,
}


export class SearchEngine {
    private fsSearch: FileSystemSearch
    constructor() {
        this.fsSearch = new FileSystemSearch()
    }

    public async search<R = SystemFile | SearchError | undefined>(fileName: SystemFile, searchType: SearchType) {
        switch (searchType) {
            case SearchType.FILESYSTEM:
                this.fsSearch.search(fileName)
        }
    }

}