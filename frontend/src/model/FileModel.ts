export default interface FileModel {
    id: string;
    name: string;
    path: string;
    size: number;
    type: string;
    create_at?: Date;
}