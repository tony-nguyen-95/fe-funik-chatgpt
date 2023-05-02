export interface IUser {
  userId: string;
  userName: string | null;
  password: string | null;
  funixId: string | null;
  funixEmail: string | null;
  isDeleted?: boolean;
  loginDate?: string;
  createdDate?: string;
  updatedDate?: string;
  hannah: boolean | null;
}
