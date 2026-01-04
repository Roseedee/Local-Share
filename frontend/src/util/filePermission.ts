export default function permissionCodeToString(permCode: string | null | undefined): string {
    if(permCode === 'r--') {
        return 'Read Only';
    }else if(permCode === 'rw-') {
        return 'Read and Write';
    }else if(permCode === 'rwx') {
        return 'Read, Write and Execute';
    }

    return 'Unknown Permission';
}   