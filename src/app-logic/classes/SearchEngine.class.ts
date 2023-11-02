import { SearchError } from "@root/types/SearchError.d"
import { SystemFile } from "@root/types/SystemFile.d"
import { SystemFolder } from "@root/types/SystemFolder.d"
import { FileSystemSearch } from "@classes/FileSystemSearch.class"
import { SearchResults } from "@classes/SearchResults.class"
import Config from "@root/search.config"
import { SearchType } from "@utils/SearchTypeEnum"
import AppSettings from "@classes/AppSettings.class"
import { Settings } from "@root/types/Settings"

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
    ) {
        const settings: Settings = AppSettings.currentSettings
        const results: SearchResults = new SearchResults()

        switch (settings.searchPool) {
            case SearchType.FILESYSTEM:
                this.fsSearch.search(targetFile, targetFolder, 0, this.maxDepth, results)
        }
        return results
    }

}