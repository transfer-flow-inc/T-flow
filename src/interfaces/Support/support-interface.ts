import {UserApiInterface} from "../User/user-api-interface";

export interface SupportInterface {
  id: number;
  email: string;
  subject: string;
  message: string;
  sentAt: Date;
  user: UserApiInterface;
}
