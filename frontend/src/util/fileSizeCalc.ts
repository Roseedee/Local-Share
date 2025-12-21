export default function fileSize(sizeInBytes: number | null | undefined): string {
    if (sizeInBytes === null || sizeInBytes === undefined) {
        return "0B";
    }
    if (sizeInBytes < 1024) {
        return `${sizeInBytes}B`;
    } else if (sizeInBytes < 1048576) {
        const sizeInKB = (sizeInBytes / 1024).toFixed(2);
        return `${sizeInKB}KB`;
    } else if (sizeInBytes < 1073741824) {
        const sizeInMB = (sizeInBytes / 1048576).toFixed(2);
        return `${sizeInMB}MB`;
    } else {
        const sizeInGB = (sizeInBytes / 1073741824).toFixed(2);
        return `${sizeInGB}GB`;
    }
}

