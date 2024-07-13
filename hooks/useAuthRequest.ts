import axios from "axios";
import useClientSession from "./useClientSession";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const useAuthRequest = () => {
  const { isAuthenticated, session, logout } = useClientSession();
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    req.headers = req.headers ?? {};
    if (isAuthenticated) {
      const isExpired = Date.now() > session?.expires;
      if (!isExpired) return req;
      logout();
    }
    return req;
  });

  return { request: axiosInstance };
};

export default useAuthRequest;
