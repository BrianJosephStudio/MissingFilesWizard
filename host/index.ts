function missingInProject(): FootageItem[] {
    var missingItemsInProject: FootageItem[] = [];
    for (var i = 1; i <= app.project.numItems; i++) {
        const currentItem = app.project.item(i) as FootageItem;
        currentItem.mainSource
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

function missingInItemArray(itemArray: FootageItem[]): FootageItem[] {
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
            const missingInComp = missingInComposition(currentItem);
            missingItemsInSelection.concat(missingInComp)
        }
        else if (currentItem.typeName == 'Folder') {
            const missingInFolder = missingInItemArray(currentItem)
            missingItemsInSelection.concat(missingInFolder)
        }
    }
    return missingItemsInSelection
}

function setSelectionToMissing(itemSelection: FootageItem[]): void {
    if (!itemSelection.length) { return }

    app.beginUndoGroup('Set Selection to Missing');

    const missingItemsInSelection: Array<FootageItem> = missingInItemArray(itemSelection)

    for (let i = 0; i < missingItemsInSelection.length; i++) {
        const currentItem = missingItemsInSelection[i]

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

    const missingInSelection = missingInItemArray(itemSelection)

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

function missingInComposition(compItem: CompItem): FootageItem[] {
    const missingInComp = [];

    for (var i = 1; i <= compItem.numLayers; i++) {
        var currentItem = (compItem.layer(i) as AVLayer).source;
        if (!currentItem) { continue };
        if (
            (
                (
                    currentItem as FootageItem).mainSource instanceof FileSource ||
                (currentItem as FootageItem).mainSource instanceof PlaceholderSource) &&
            (currentItem as FootageItem).footageMissing
        ) {
            missingInComp.push((currentItem as FootageItem))
        };
    };
    return missingInComp // todo: Depure repeated
}

function getUrisFromFootageItemArray(itemArray: FootageItem[]): string[] {
    const uriArray: string[] = []

    for (let i = 0; i < itemArray.length; i++) {
        const currentItem = itemArray[i]
        if (!currentItem) { continue }
        if (!(currentItem instanceof FootageItem) || !currentItem.file) { continue }
        uriArray.push(currentItem.file.fsName)
    }

    return uriArray
}