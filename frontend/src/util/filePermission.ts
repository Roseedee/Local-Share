export default function permissionCodeToString(permCode: string | null | undefined): string {
    if(permCode === 'r--') {
        return 'Read Only';
    }else if(permCode === 'rw-') {
        return 'Read and Write';
    }else if(permCode === 'r-x') {
        return 'Read and Execute';
    }else if(permCode === 'rwx') {
        return 'Full';
    }

    return 'Unknown Permission';
}

export function permissionCodeToNumber(permCode: string | null | undefined): number {
    let permissionNumber = 0
    if(permCode?.includes('r')) {
        permissionNumber += 1;
    }
    if(permCode?.includes('w')) {
        permissionNumber += 2;
    }
    if(permCode?.includes('x')) {
        permissionNumber += 4;
    }

    return permissionNumber;
}