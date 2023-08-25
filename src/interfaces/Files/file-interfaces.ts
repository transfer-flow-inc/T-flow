export interface FileInterface {
    id: string;
    uploadedAt : Date;
    expiresAt: Date;
    fileSize: number;
    fileType: string;
    filePath: string;
    fileName: string;
}
