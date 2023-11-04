import { SystemFile } from "@root/types/SystemFile.d"
import { ResultsRegistry } from "@classes/ResultsRegistry.class"
import { v4 as uuidv4 } from "uuid"

export class SearchResults {
    public readonly id: string
    public results: SystemFile[]
    private locked: boolean
    private readonly errorMessage: string = "Instance is locked."
    constructor() {
        this.locked = false
        this.id = uuidv4()
        this.results = []
    }

    public add(file: SystemFile): void {
        if (this.locked) { throw new Error(this.errorMessage) }
        this.results.push(file)
    }

    public get(): SystemFile[] {
        return this.results
    }

    public addToRegistry() {
        if (this.locked) { throw new Error(this.errorMessage) }
        ResultsRegistry.getInstance().addSearchResults(this)
        this.lockInstance()
    }

    private lockInstance() {
        this.locked = true
    }
}