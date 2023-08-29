import {FileInterface} from "./file-interfaces";

export interface FolderInterface {
  id: string;
  folderName: string;
  folderSize: number;
  fileCount: number;
  folderViews: number;
  uploaded_at: Date;
  expires_at: Date;
  recipientsEmails: string[];
  files: FileInterface[];
  shared: boolean;
  url: string;
  accessKey: string;
}
