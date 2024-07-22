import xior from "xior";
import { headers } from "next/headers";
import getServerSession from "./getServerSession";
import { redirect } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const authRequest = () => {
  const { session } = getServerSession();

  const xiorInstance = xior.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
  });

  xiorInstance.interceptors.request.use(async (req) => {
    req.headers = req.headers ?? {};
    if (session?.token) {
      const isExpired = Date.now() > session?.expires;
      if (!isExpired) return req;
      const headersList = headers();
      // read the custom x-url header
      const header_url = headersList.get("x-url") || "";
      const redirect_url = `/login?redirect_url=${header_url}`;
      redirect(redirect_url);
    }
    return req;
  });
  return xiorInstance;
};
