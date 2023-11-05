import { SystemFile } from "@root/types/SystemFile.d";
import { SystemFolder } from "@root/types/SystemFolder.d";
import { SearchError } from "@root/types/SearchError.d"
import { SearchResults } from "@classes/SearchResults.class";
// import { readFile, writeFile, mkdir } from "@mocks/fs-mock" //!DEBUGMODE
import { readdir, stat } from "fs/promises";//-- Production Import
// import path from "@mocks/path-mock" //!DEBUGMODE
import path from "path" //-- Production Import
// import * as os from "@mocks/os-mock"// !DEBUGMODE
import os from "os" //-- Production Import

export class FileSystemSearch {
    constructor() {

    }
    //@ts-ignore
    async search<R = void | SearchError | undefined>(
        targetFile: SystemFile,
        targetFolder: SystemFolder,
        currentDepth: number,
        maxDepth: number,
        results: SearchResults,
    ) {
        if (currentDepth > maxDepth) {
            return
        }

        targetFolder.uri = targetFolder.uri.replace(/^~/, os.homedir())

        const files = await readdir(targetFolder.uri)

        for await (const fsFile of files) {
            const filePath: SystemFile = { name: fsFile, uri: path.join(targetFolder.uri, fsFile) }
            const stats = await stat(filePath.uri!)

            if (stats.isDirectory()) {
                this.search(filePath, targetFolder, currentDepth + 1, maxDepth, results)
            } else if (fsFile === targetFile.name) {
                results.add(filePath)
                return //! 'return' limits 'Results' to only one match, if you want to find more potential matches; change to 'break'
            }
        }
    }
}