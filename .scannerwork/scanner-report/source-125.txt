import {UserApiInterface} from "../User/user-api-interface";

export interface SupportInterface {
  email: string;
  subject: string;
  message: string;
  sentAt: Date;
  user: UserApiInterface;
}
