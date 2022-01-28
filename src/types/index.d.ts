export interface IAuth {
  token: string;
  refreshToken: string;
  user: IUser;
}

export interface IUser {
  name: string;
  email: string;
  id: string;
}
