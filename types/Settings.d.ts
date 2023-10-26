export enum RELINKMODE {
    RELINKMISSING
}
export enum MISSINGFILESPOOL {
    PROJECT
}

export enum SEARCHPOOL {
    SYSTEM
}

export interface Settings {
    getMissingFilesFrom: MISSINGFILESPOOL
    searchMatchingFilesIn: SEARCHPOOL
    relinkMethod: RELINKMODE
    searchPath: string
    ignoreFileExtensions: boolean
    perfectMatch: boolean
    showHelpTips: boolean
}