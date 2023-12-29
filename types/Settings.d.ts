import { MISSINGFILESPOOL, SEARCHPOOL } from "@root/src/app-logic/utils/SettingConstants"

export interface Settings {
    missingFilesPool?: MISSINGFILESPOOL
    searchPool?: SEARCHPOOL
    searchPath?: string
    ignoreFileExtensions?: boolean
    ignoreCasing?: boolean
    consolidate?: boolean
    showHelpTips?: boolean
    maxDepth?: number
}