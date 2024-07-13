interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface IAuthData {
  token: string;
  expires: number;
  user: IUser;
}

interface IGetSession {
  isAuthenticated: boolean;
  session: IAuthData;
  logout: () => void;
  setSession: (session: IAuthData) => void;
}
