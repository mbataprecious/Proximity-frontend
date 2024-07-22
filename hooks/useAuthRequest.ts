import xior from "xior";
import useClientSession from "./useClientSession";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const useAuthRequest = () => {
  const { isAuthenticated, session, logout } = useClientSession();
  const xiorInstance = xior.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
  });

  xiorInstance.interceptors.request.use(async (req) => {
    req.headers = req.headers ?? {};
    if (isAuthenticated) {
      const isExpired = Date.now() > session?.expires;
      if (!isExpired) return req;
      logout();
    }
    return req;
  });

  return { request: xiorInstance };
};

export default useAuthRequest;
