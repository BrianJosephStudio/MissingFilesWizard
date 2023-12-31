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
import { MissingFile } from "@classes/MissingFile.class";

export class FileSystemSearch {
    constructor() {

    }
    //@ts-ignore
    async search<R = void | SearchError | undefined>(
        missingFile: MissingFile,
        targetFolder: SystemFolder,
        currentDepth: number,
        maxDepth: number,
        results: SearchResults,
    ) {
        if (currentDepth > maxDepth || missingFile.found) {
            return
        }

        targetFolder.uri = targetFolder.uri.replace(/^~/, os.homedir())

        const files = await readdir(targetFolder.uri)
        await Promise.all(
            files.map(async fsFile => {
                try {
                    const filePath: SystemFile = { name: fsFile, uri: path.join(targetFolder.uri, fsFile) }
                    const stats = await stat(filePath.uri!)
                    
                    if (stats.isDirectory()) {
                        await this.search(missingFile, { uri: filePath.uri! }, currentDepth + 1, maxDepth, results)
                    } else if (fsFile === missingFile.name) {
                        results.add(filePath)
                        missingFile.found = true
                        return //-- 'return' limits 'Results' to only one match, if you want to find more potential matches; change to 'break'
                    }
                } catch (e) {
                    return
                }
            })

        )
    }
}