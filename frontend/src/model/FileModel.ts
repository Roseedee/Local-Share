export default interface FileModel {
    id?: string;
    name?: string;
    new_name?: string;
    size?: number;
    type?: string;
    create_at?: Date;
    client_id_source?: string;
    client_id_target?: string;
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