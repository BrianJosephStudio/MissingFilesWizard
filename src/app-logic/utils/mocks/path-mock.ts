export default {
    basename: (filePath: string) => {
        const parts = filePath.split('/');
        return parts[parts.length - 1];
    },
    resolve: (...segments: string[]) => {
        return segments.join('/');
    },
    dirname: (filePath: string) => {
        const parts = filePath.split('/');
        parts.pop(); // Remove the last part (file name)
        return parts.join('/');
    },
    join: (...segments: string[]) => {
        return segments.join('/');
    },
};
