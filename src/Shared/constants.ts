export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IToken {
  expiresIn: number;
  accessToken: string;
}
