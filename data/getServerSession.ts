import {
  SESSION_KEY,
  getSession,
  isValidSession,
  setSession as setSessionDefault,
} from "@/utils/authsession";
import { deleteCookie } from "cookies-next";
import { cookies } from "next/headers";

const getServerSession = (): IGetSession => {
  let isAuthenticated = false;
  let authData: IAuthData = getSession({ cookies }) || {};
  if (isValidSession(authData)) {
    isAuthenticated = true;
  }
  const logout = () => {
    deleteCookie(SESSION_KEY, { cookies });
  };

  const setSession = (session: IAuthData) => {
    setSessionDefault(session, { cookies });
  };

  return {
    isAuthenticated,
    session: (authData || {}) as unknown as IAuthData,
    setSession,
    logout,
  };
};

export default getServerSession;
