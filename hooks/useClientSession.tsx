import {
  SESSION_KEY,
  defaultAuth,
  getSession,
  isValidSession,
} from "@/utils/authsession";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next-nprogress-bar";
import { useLayoutEffect, useState } from "react";

const useClientSession = (): IGetSession => {
  const router = useRouter();
  const [session, setSession] = useState<IAuthData>(defaultAuth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    deleteCookie(SESSION_KEY);
    setSession(defaultAuth);
    setIsAuthenticated(false);
    router.push("/login");
  };

  useLayoutEffect(() => {
    let isAuthenticated = false;
    let authData: IAuthData = getSession();
    if (isValidSession(authData)) {
      isAuthenticated = true;
    }
    setIsAuthenticated(isAuthenticated);
    setSession(authData || defaultAuth);
  }, []);

  return {
    isAuthenticated,
    session,
    setSession,
    logout,
  };
};

export default useClientSession;
