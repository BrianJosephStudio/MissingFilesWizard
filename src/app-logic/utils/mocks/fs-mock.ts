export const readdir = async (directoryPath: string): Promise<string[]> => {
    // Simulate readdir by returning an array of file names
    return ['file1.txt', 'file2.txt'];
};

export const stat = async (filePath: string): Promise<{ isFile: () => boolean; isDirectory: () => boolean }> => {
    // Simulate stat by returning a minimal stat object
    return {
        isFile: () => true,
        isDirectory: () => false,
    };
};

export const readFile = async (filePath: string, encoding: { encoding: string }): Promise<string> => {
    // Simulate readFile by returning mock content
    return `{
        "missingFilesPool": 0,
        "searchPool": 0,
        "ignoreCasing": 0,
        "consolidate": 0,
        "ignoreFileExtensions": false,
        "searchPath": "C:/Users/Brian",
        "showHelpTips": true,
        "maxDepth": 12
    }`;
};

export const writeFile = async (filePath: string, data: string, encoding?: string): Promise<string> => {
    // Simulate writeFile by returning success
    return `Successfully wrote data to ${filePath}`;
};

export const mkdir = async (directoryPath: string): Promise<string> => {
    // Simulate mkdir by returning success
    return `Successfully created directory at ${directoryPath}`;
};

// You can add more functions as needed

// Export all functions as an object
export const fsPromises = {
    readdir,
    stat,
    readFile,
    writeFile,
    mkdir,
};

export default fsPromises;