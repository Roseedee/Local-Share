export default interface FileModel {
    id?: string;
    name?: string;
    path?: string;
    size?: number;
    type?: string;
    create_at?: Date;
}

//--------------------------------------------//

type UploadStatus = 'uploading' | 'completed' | 'failed';

export interface FileUploadHistoryModel {
    name: string;
    size: number;
    status: UploadStatus;
}

//--------------------------------------------//

export interface FileSelectedMultiFileModel {
    file: FileModel;
    sumSize: number;
}