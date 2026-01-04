export default function fileSize(sizeInBytes: number | null | undefined, decimalPlaces = 1): string {
    if (sizeInBytes === null || sizeInBytes === undefined) {
        return "0B";
    }
    if (sizeInBytes < 1024) {
        return `${sizeInBytes}B`;
    } else if (sizeInBytes < 1048576) {
        const sizeInKB = (sizeInBytes / 1024).toFixed(decimalPlaces);
        return `${sizeInKB}KB`;
    } else if (sizeInBytes < 1073741824) {
        const sizeInMB = (sizeInBytes / 1048576).toFixed(decimalPlaces);
        return `${sizeInMB}MB`;
    } else {
        const sizeInGB = (sizeInBytes / 1073741824).toFixed(decimalPlaces);
        return `${sizeInGB}GB`;
    }
}

