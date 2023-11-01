import { SearchError } from "@root/types/SearchError.d"
import { SystemFile } from "@root/types/SystemFile.d"
import { SystemFolder } from "@root/types/SystemFolder.d"
import { FileSystemSearch } from "@classes/FileSystemSearch.class"
import { SearchResults } from "@classes/SearchResults.class"
import Config from "@root/search.config"
// import { SearchType } from "@root/types/SearchTypeEnum.d"

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
        searchType: number,

    ) {
        const results: SearchResults = new SearchResults()
        switch (searchType) {
            case 0:
                this.fsSearch.search(0, this.maxDepth, targetFile, targetFolder, results)
        }
        return results
    }

}