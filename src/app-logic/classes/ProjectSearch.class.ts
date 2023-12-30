import ExtendScriptAPI from "@classes/ExtendScriptAPI.class";
import { SystemFile } from "@root/types/SystemFile.d";
import { SearchError } from "@root/types/SearchError.d"
import { SearchResults } from "@classes/SearchResults.class";
import { MissingFile } from "@classes/MissingFile.class";
import { ProjectItem } from "@root/types/ProjectItem";

export class ProjectSearch {
    private extendScriptAPI: ExtendScriptAPI
    public projectItems?: ProjectItem[]

    constructor() {
        this.extendScriptAPI = new ExtendScriptAPI()
    }
    //@ts-ignore
    async search<R = void | SearchError | undefined>(
        missingFile: MissingFile,
        results: SearchResults,
    ) {
        if (missingFile.found) { return }
        await this.syncProjectFootageItems()
        this.projectItems?.forEach((projectItem: ProjectItem) => {
            if (missingFile.isMatch(projectItem)) {
                results.add({
                    name: projectItem.name,
                    uri: projectItem.uri,
                })
                missingFile.newId = projectItem.id
                missingFile.found = true
                return //-- 'return' limits 'Results' to only one match, if you want to find more potential matches; change to 'break'
            }
        })
    }

    async syncProjectFootageItems(): Promise<void> {
        this.projectItems = await this.extendScriptAPI.getAllProjectFootageItems()
    }
}