import {FolderInterface} from "../Files/folder-interface";

export interface UserApiInterface {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    mail: string;
    password: string;
    avatar: string;
    roles: [string];
    isAccountVerified: boolean;
    plan: string;
    authMethod: string;
    userFolders: FolderInterface[];
    createdAt: Date;
}
