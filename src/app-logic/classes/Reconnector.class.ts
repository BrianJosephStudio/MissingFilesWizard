import { MissingFile } from "@classes/MissingFile.class";
import { SearchResults } from "@classes/SearchResults.class";
import ExtendScriptAPI from "@classes/ExtendScriptAPI.class";

export default class Reconnector {
    private missingFile: MissingFile
    private searchResults: SearchResults

    constructor(missingFile: MissingFile, searchResults: SearchResults) {
        this.missingFile = missingFile
        this.searchResults = searchResults
    }

    async reconnect(): Promise<boolean> {
        if (this.searchResults.results.length === 0) {
            //todo - add a way to communicate problem to user
            return false
        }

        //todo - add reconnection logic
        return true
    }
}