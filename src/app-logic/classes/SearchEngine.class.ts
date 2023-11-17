import { SearchError } from "@root/types/SearchError.d"
import { FileSystemSearch } from "@classes/FileSystemSearch.class"
import { SearchResults } from "@classes/SearchResults.class"
import Config from "@root/config"
import AppSettings from "@classes/AppSettings.class"
import { Settings } from "@root/types/Settings"
import { SEARCHPOOL } from "@utils/SettingConstants"
import { MissingFile } from "@classes/MissingFile.class"

export class SearchEngine {
    private fsSearch: FileSystemSearch
    private maxDepth: number
    constructor() {
        this.maxDepth = Config.maxDepth
        this.fsSearch = new FileSystemSearch()

    }
    //@ts-ignore
    public async search<R = SearchResults | SearchError | undefined>(
        missingFile: MissingFile
    ) {
        const settings: Settings = AppSettings.currentSettings
        const results: SearchResults = new SearchResults()

        switch (settings.searchPool) {
            case SEARCHPOOL.SYSTEM:
                await this.fsSearch.search(missingFile, { uri: settings.searchPath! }, 0, this.maxDepth, results)
        }
        return results
    }

}