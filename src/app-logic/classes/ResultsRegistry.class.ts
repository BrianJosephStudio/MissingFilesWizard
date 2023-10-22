import { SearchResults } from "@classes/SearchResults.class";

export class ResultsRegistry {
    private static instance: ResultsRegistry;
    private searchResultsList: SearchResults[] = [];

    private constructor() { }

    public static getInstance(): ResultsRegistry {
        if (!ResultsRegistry.instance) {
            ResultsRegistry.instance = new ResultsRegistry();
        }
        return ResultsRegistry.instance;
    }

    public addSearchResults(searchResults: SearchResults) {
        this.searchResultsList.push(searchResults);
    }

}