import { MISSINGFILESPOOL, SEARCHPOOL, RELINKMETHOD } from "@root/src/app-logic/utils/SettingConstants"

export interface Settings {
    missingFilesPool?: MISSINGFILESPOOL
    searchPool?: SEARCHPOOL
    relinkMethod?: RELINKMETHOD
    searchPath?: string
    ignoreFileExtensions?: boolean
    perfectMatch?: boolean
    showHelpTips?: boolean
}