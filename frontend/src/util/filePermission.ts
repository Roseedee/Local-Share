export default function permissionCodeToString(permCode: string | null | undefined): string {
    if (permCode === 'r--') {
        return 'Read Only';
    } else if (permCode === 'rw-') {
        return 'Read and Write';
    } else if (permCode === 'r-x') {
        return 'Read and Execute';
    } else if (permCode === 'rwx') {
        return 'Full';
    }

    return 'Unknown Permission';
}

export function permissionCodeToNumber(permCode: string | null | undefined): number {
    if (!permCode || permCode.length !== 3) return 0;

    let p = 0;
    if (permCode[0] === 'r') p |= 1;
    if (permCode[1] === 'w') p |= 2;
    if (permCode[2] === 'x') p |= 4;

    return p;
}