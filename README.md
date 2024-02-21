# Missing Files Wizard

MF Wizard is an Adobe After Effects CEP Extension that simplifies reconnecting missing files in AE. I always felt like dealing with missing files using the native interface was more work than it should be, so I wanted to create an algorythm that made it so that I could click a button and forget about it.


## Missing Files Pool Dropdown

This is where you tell the MF wizard what missing files you would like it to attempt to reconnect. 

### Selection:
Attemps to reconnect any missing files that exist in your active selection on your project panel. The MF Wizard acts upon thre types of items. The MF Wizard acts upon three types os items and ignores the rest:

- **Media Items:** These are Items that have a source, typically iamge and video format items.

- **Composition Items:** For all selected compositions, MF Wizard will scan the composition for layers that have a missing source and will attempt to reconnect those. Please, **be aware** that any missing layers in your composition will be inderectly considered part of your selection even if those files are not directly in your selection. The parent comp is, so all of its missing layer sources become part of the active selection as well.

- **Folder Items:** Following the same logic as with selected compositions; selected folders will be scanned for missing files, including all of its children media items **and** composition items, as well as all the missing layer sources in the children composition items, even if those layers aren't contained within the selected folder to begin with.

	

## Search Pool Dropdown

This tells the MF Wizard where you would like it to search for matching files.

- **Project:** Searches the entire project panel for an already existing duplicate of your missing file. The searching criteria is an exact match in the file name.

- **System:** Asynchronously searches the specified folder for files that contain a matching name. It will also search subfolders down to a specified amount of subfolders.
- 
- **Hybrid:** It will first attempt to perform a project search, upon failure, it will perform a system search.

## Ignore File Extensions Checkbox

If active, it doesn't take the file extension into consideration when searching for matches.
So 'fileName.jpeg' is a match for fileName.png. This can be useful sometimes but should be used with caustion since 'fileName.jpeg' would also be a match for 'fileName.mov'.

## Ignore Casing Checkbox

When active it ignores casing in file names when searching for matches.
So 'fileName.jpeg' is a match for 'filename.jpeg'

## Consolidate Duplicates Checkbox

This option only has effects on matches found through the project search algorithm. By default the reconnection method when a match for you missing file is found inside your current project is to replace the source for your missing item using the source from the found match. However, this means that now you have a duplicate file, the exact same file is imported twice in the same project. This may be what you want, but if you'd like to avoid this, you can check off this option and the MF Wizard will relink all the layers your footage item is being used on to the found match and upon success will delete your missing file. If you relinking of layers were to fail at all, the Wizard will not delete your missing item.

## Search Depth TextBox

The MFW asynchrounously searches all subfolders in your target search folder. This could lead to some potential issues if you target search folder has too many subfolders. In order to address this, the search depth allows you to choose a maximum  amount of sub-folder levels to search in. A search depth of 0 means that only your target search folder will be searched.

## Search Path

The Search Path defines which folder will be the first one to be searched.

## Folder Button

This button opens a 'select dialog' which allows you to browse your device for your target search folder with your device's native select dialog interface.

## Find Files Button

This is the main action button of the MFW. It begins the search job based on the current settings.

## Unlink Files Button

This is an extra utility included. It allows you to unlink footage items in your project. This may be useful in various niche scenarios.
```