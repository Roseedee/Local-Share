export default interface FileUploadHistoryModel {
    name: string;
    size: number;
    status: UploadStatus;
}

type UploadStatus = 'uploading' | 'completed' | 'failed';