import { SearchType } from "@root/types/SearchTypeEnum"
import { SearchError } from "@root/types/SearchError"
import { SystemFile } from "@root/types/SystemFile"
import { SystemFolder } from "@root/types/SystemFolder"
import { FileSystemSearch } from "@classes/FileSystemSearch.class"
import { SearchResults } from "@classes/SearchResults.class"
import Config from "@root/search.config"

export class SearchEngine {
    private fsSearch: FileSystemSearch
    private maxDepth: number
    constructor() {
        this.maxDepth = Config.maxDepth
        this.fsSearch = new FileSystemSearch()

    }
    //@ts-ignore
    public async search<R = SearchResults | SearchError | undefined>(
        targetFile: SystemFile,
        targetFolder: SystemFolder,
        searchType: SearchType,

    ) {
        const results: SearchResults = new SearchResults()
        switch (searchType) {
            case SearchType.FILESYSTEM:
                this.fsSearch.search(targetFile, targetFolder, 0, this.maxDepth, results)
        }
        return results
    }

}