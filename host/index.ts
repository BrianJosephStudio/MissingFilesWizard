import { MissingItem } from "@root/types/MissingItem";
import { SystemFile } from "@root/types/SystemFile";
import { ProjectItem } from "@root/types/ProjectItem";

function getMissingFilesInProject(): FootageItem[] {
    var missingItemsInProject: FootageItem[] = [];
    for (var i = 1; i <= app.project.numItems; i++) {
        const currentItem = app.project.item(i) as FootageItem;
        if (
            currentItem.mainSource && (
                !((currentItem.mainSource as any) instanceof FileSource) &&
                !((currentItem.mainSource as any) instanceof PlaceholderSource)
            ) ||
            !currentItem.footageMissing
        ) { continue }
        missingItemsInProject.push(currentItem)
    };
    return missingItemsInProject
}

function getMissingFilesInSelection(): FootageItem[] {
    var missingItemsInSelection: FootageItem[] = getMissingFilesInItemArray((app.project.selection as FootageItem[]));
    return missingItemsInSelection
}

function getMissingFilesInActiveComp(): FootageItem[] {
    app.activeViewer.setActive()
    return getMissingItemsInComposition((app.project.activeItem as CompItem))
}

function getMissingFilesInItemArray(itemArray: FootageItem[]): FootageItem[] {
    var missingItemsInSelection: FootageItem[] = [];

    for (let i = 0; i < itemArray.length; i++) {
        const currentItem: any = itemArray[i];
        if (!currentItem) { continue }
        if (
            currentItem.typeName === 'Footage' &&
            currentItem.footageMissing &&
            currentItem.mainSource && (
                currentItem.mainSource instanceof PlaceholderSource ||
                currentItem.mainSource instanceof FileSource
            )
        ) {
            missingItemsInSelection.push(currentItem);
        }
        else if (currentItem.typeName === 'Composition') {
            const missingInComp = getMissingItemsInComposition(currentItem);
            missingItemsInSelection = missingItemsInSelection.concat(missingInComp)
        }
        else if (currentItem.typeName == 'Folder') {
            const folderItems = convertItemCollectionToItemArray(currentItem.items)
            const missingInFolder = getMissingFilesInItemArray((folderItems as FootageItem[]))
            missingItemsInSelection = missingItemsInSelection.concat(missingInFolder)
        }
    }
    return missingItemsInSelection
}

function convertItemCollectionToItemArray(itemCollection: ItemCollection): Item[] {
    const itemArray = []
    for (var i = 1; i <= itemCollection.length; i++) {
        itemArray.push(itemCollection[i])
    }
    return itemArray
}

function setSelectionToMissing(itemSelection: FootageItem[]): void {
    if (!itemSelection.length) { return }

    app.beginUndoGroup('Set Selection to Missing');


    for (let i = 0; i < itemSelection.length; i++) {
        const currentItem = itemSelection[i]

        if (currentItem.footageMissing) { continue }

        let myDur: number;

        if (currentItem.frameRate === 0) {
            myDur = 1
        } else {
            myDur = currentItem.frameRate
        }

        currentItem.replaceWithPlaceholder(currentItem.name, currentItem.width, currentItem.height, myDur, currentItem.duration);
    }

    app.endUndoGroup();
};

function removeMissingFiles(itemSelection: any[], onlyNonUsed: boolean) {
    app.beginUndoGroup('Set Selection to Missing');

    const missingInSelection = getMissingFilesInItemArray(itemSelection)

    for (let i = 0; i < missingInSelection.length; i++) {
        const currentItem = missingInSelection[i]
        if (!currentItem) { continue }

        if (!onlyNonUsed) {
            currentItem.remove()
            continue
        }

        const usedIn = currentItem.usedIn

        if (!usedIn.length) {
            currentItem.remove()
        }

    }

    app.endUndoGroup();

};

function getMissingItemsInComposition(compItem: CompItem): FootageItem[] {
    const missingItemsInComp = [];

    for (var i = 1; i <= compItem.numLayers; i++) {
        var currentItem = (compItem.layer(i) as AVLayer).source;
        if (!currentItem) { continue };
        if ((
            (currentItem as FootageItem).mainSource instanceof FileSource ||
            (currentItem as FootageItem).mainSource instanceof PlaceholderSource
        ) && (currentItem as FootageItem).footageMissing
        ) {
            missingItemsInComp.push((currentItem as FootageItem))
        };
    };
    return missingItemsInComp
}

function getSystemFilesFromFootageItemArray(itemArray: FootageItem[]): string {
    const uriArray: MissingItem[] = []

    for (let i = 0; i < itemArray.length; i++) {
        const currentItem = itemArray[i]
        if (!currentItem) { continue }
        if (!(currentItem instanceof FootageItem)) { continue }
        uriArray.push({
            name: currentItem.name,
            uri: currentItem.file?.fsName,
            id: currentItem.id
        })
    }
    return stringifyOutput(uriArray)
}

function getAllProjectFootageItems(): FootageItem[] {
    const projectFootageItems: FootageItem[] = []
    for (var i = 1; i <= app.project.numItems; i++) {
        const currentItem = app.project.item(i) as FootageItem;
        if (!currentItem.mainSource) { continue };
        if (currentItem.name === "Pearl.png") {
        }
        if (
            !((currentItem.mainSource as any) instanceof FileSource) ||
            !currentItem.file ||
            currentItem.footageMissing
        ) { continue }
        projectFootageItems.push(currentItem)
    };
    return projectFootageItems
}

function reconnectMissingFile(id: number, newUrl: string): string {
    let output: {
        result: boolean,
        message: string
    } = {
        result: false,
        message: "Generic error"
    }
    const foundMatch = new File(newUrl)

    if (!foundMatch.exists) {
        output.message = "File does not exist"
    } else {
        const missingItem = app.project.itemByID(id) as FootageItem
        if (missingItem.typeName !== "Footage" || missingItem instanceof FootageItem === false || !missingItem.footageMissing) {
            output.message = "Item is not missing"
        } else {
            missingItem.replace(foundMatch)
            if (missingItem.file.fsName !== foundMatch.fsName) {
                output.message = "Reconnection was attempted but failed"
            } else {
                output = {
                    result: true,
                    message: "Reconnection Successful"
                }
            }
        }
    }
    return stringifyOutput(output)
}

function openDialog(currentPath: string): string {
    const prompt = "Select your new search path"
    const currentFolder = new Folder(currentPath)
    let newFolder: Folder
    if (currentFolder.exists) {
        newFolder = currentFolder.selectDlg(prompt)
    } else {
        newFolder = Folder.selectDialog(prompt)
    }

    if (!newFolder.exists) {
        return "Error"
    } else {
        return newFolder.fullName
    }
}

function getProjectPath(): string {
    return app.project.file.path
}

function stringifyOutput(output: Object): string {
    return JSON.stringify(output)
}