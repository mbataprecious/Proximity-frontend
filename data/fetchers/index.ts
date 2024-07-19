"use server";

import { authRequest } from "../authRequest";

export const verifyToken = async (token: string) => {
  const request = authRequest();
  try {
    const res = await request.get("/auth/register", { params: { token } });
    return res;
  } catch (error) {
    console.log(error);
    throw Error("Failed to verify token");
  }
};
