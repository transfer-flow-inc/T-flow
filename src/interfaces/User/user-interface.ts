interface UserInterface {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
    roles: [string];
    isAccountVerified: boolean;
}
