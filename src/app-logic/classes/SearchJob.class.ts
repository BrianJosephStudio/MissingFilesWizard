import { MissingFile } from "./MissingFile.class";

export class SearchJob {
    private missingFiles: string[]
    private searchQueue: MissingFile[]

    constructor(missingFiles: string[]) {
        this.missingFiles = missingFiles
        this.searchQueue = []
    }

    async createQueue(): Promise<MissingFile[]> {
        const filteredSet: Set<string> = new Set()
        this.missingFiles.forEach(missingFile => {
            filteredSet.add(missingFile)
        })

        const queueItems = Array.from(filteredSet)
        await Promise.all(
            queueItems.map(async (path) => {
                const missingFile: MissingFile = new MissingFile(path)
                this.searchQueue.push(missingFile)
            })
        )

        return this.searchQueue
    }

}