import { SystemFile } from "@root/types/SystemFile.d";
import { SystemFolder } from "@root/types/SystemFolder.d";
import { SearchError } from "@root/types/SearchError.d"
import { SearchResults } from "@classes/SearchResults.class";
// import { readdir, stat } from "fs/promises";
import path from "path";

export class FileSystemSearch {
    constructor() {

    }
    //@ts-ignore
    async search<R = void | SearchError | undefined>(
        currentDepth: number,
        maxDepth: number,
        //@ts-ignore
        targetFile?: SystemFile,
        //@ts-ignore
        targetFolder?: SystemFolder,
        //@ts-ignore
        results?: SearchResults,
    ) {
        if (currentDepth > maxDepth) {
            return
        }

        // const files = await readdir(targetFolder.uri)

        // for await (const fsFile of files) {
        //     const filePath: SystemFile = { name: path.join(targetFolder.uri, fsFile) }
        // const stats = await stat(filePath.name)

        // if (stats.isDirectory()) {
        //     this.search(filePath, targetFolder, currentDepth + 1, maxDepth, results)
        // } else if (fsFile === targetFile.name) {
        //     results.add(filePath)
        //     }
        // }
    }
}