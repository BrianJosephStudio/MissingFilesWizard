export enum MISSINGFILESPOOL {
    SELECTION,
    PROJECT,
    ACTIVECOMP,
}

export enum SEARCHPOOL {
    PROJECT,
    SYSTEM,
    HYBRID
}

export const dropdownOptions = {
    missingFilesPool: Object.keys(MISSINGFILESPOOL).slice(Object.keys(MISSINGFILESPOOL).length / 2).map(value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()),
    searchPool: Object.keys(SEARCHPOOL).slice(Object.keys(SEARCHPOOL).length / 2).map(value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
}
