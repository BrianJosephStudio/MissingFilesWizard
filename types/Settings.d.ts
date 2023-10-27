export enum RELINKMETHOD {
    RECONNECT,
    REPLACE
}
export const relinkMethod = Object.keys(RELINKMETHOD).slice(Object.keys(RELINKMETHOD).length / 2).map(value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())

export enum MISSINGFILESPOOL {
    SELECTION,
    PROJECT,
    ACTIVECOMP,
}
export const missingFilesPool = Object.keys(MISSINGFILESPOOL).slice(Object.keys(MISSINGFILESPOOL).length / 2).map(value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())

export enum SEARCHPOOL {
    PROJECT,
    SYSTEM,
    HYBRID
}
export const searchPool = Object.keys(SEARCHPOOL).slice(Object.keys(SEARCHPOOL).length / 2).map(value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())

export interface Settings {
    missingFilesPool?: MISSINGFILESPOOL
    searchPool?: SEARCHPOOL
    relinkMethod?: RELINKMETHOD
    searchPath?: string
    ignoreFileExtensions?: boolean
    perfectMatch?: boolean
    showHelpTips?: boolean
}