export interface UserInterface {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    userEmail: string;
    password: string;
    avatar: string;
    roles: [string];
    isAccountVerified: boolean;
    plan: string;
    authMethod: string;
}
