import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

export const SESSION_KEY = "auth-session";

export const defaultAuth = {
  token: "",
  expires: 0,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  },
};

// Utility function to get a session
export const getSession = (options?: { [key: string]: any }) => {
  const sessionCookie = getCookie(SESSION_KEY, options);
  return sessionCookie ? JSON.parse(sessionCookie) : null;
};

// Utility function to delete a session
export const deleteSession = (options?: { [key: string]: any }) => {
  deleteCookie(SESSION_KEY, options);
};

// Utility function to set a session
export const setSession = (
  data: Partial<IAuthData>,
  options?: { [key: string]: any }
) => {
  let prevAuth: IAuthData = getSession(options) || {};
  const updatedAuth = { ...prevAuth, ...data };
  const decodedToken = jwtDecode(updatedAuth.token);
  console.log({ decodedToken });
  const expiry = Number(decodedToken.exp) * 1000;
  updatedAuth.expires = expiry;
  setCookie(SESSION_KEY, JSON.stringify(updatedAuth), {
    // httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    ...options,
    maxAge: expiry - Date.now(), // set the maxAge to the remaining time before expiry, // 1 day
  });
};

// Utility function to check if a session is valid
export const isValidSession = (session: IAuthData) => {
  // Same validation logic as before
  if (!session || !(session instanceof Object)) return false;
  if (!session?.token || typeof session?.token !== "string") return false;
  if (!session?.user || typeof session?.user !== "object") return false;
  const { user } = session;
  if (
    !user?.firstName ||
    !user?.lastName ||
    !user?.email ||
    !user?.role ||
    typeof user?.firstName !== "string" ||
    typeof user?.lastName !== "string" ||
    typeof user?.email !== "string" ||
    typeof user?.role !== "string"
  ) {
    return false;
  }
  return true;
};
