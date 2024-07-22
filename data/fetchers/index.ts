"use server";

import { authRequest } from "../authRequest";

export const verifyToken = async (token: string) => {
  const request = authRequest();
  try {
    const res = await request.get("/auth/register", {
      params: { token },
      cache: "no-store",
    });
    return res;
  } catch (error) {
    console.log(error);
    throw Error("Failed to verify token");
  }
};

export const getModuleList = async ({
  limit = 10,
  page = 1,
}: {
  limit: number;
  page: number;
}) => {
  console.log({ limit, page });
  const request = authRequest();
  try {
    const { data } = await request.get<{ data: IModuleList }>("/modules", {
      params: { limit, page },
      cache: "no-store",
    });
    return data.data;
  } catch (error) {
    console.log(error);
    throw Error("Error while fetching modules");
  }
};
export const getSingleModule = async (id: string) => {
  const request = authRequest();
  try {
    const { data } = await request.get<{ data: { module: IModule } }>(
      "/modules/" + id,
      {
        cache: "no-store",
      }
    );
    return data.data.module;
  } catch (error) {
    console.log(error);
    throw Error("Error while fetching modules");
  }
};
