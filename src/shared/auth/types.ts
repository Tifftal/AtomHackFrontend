export interface IUser {
  name: string;
  isAuth: boolean;
}

export interface IUserData {
  username: string;
  password: string;
}

export interface IAuthContext {
  user: IUser;
  login: (name: string) => void;
  logout: () => void;
}

export type UserProviderProps = {
  children: React.ReactNode;
};
