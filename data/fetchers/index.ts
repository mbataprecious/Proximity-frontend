"use server";

import { XiorRequestConfig } from "xior";
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
  sort = "DSC",
  keyword = "",
}: {
  limit: number;
  page: number;
  sort: string;
  keyword?: string;
}) => {
  console.log({ limit, page });
  const searchObj = keyword ? { keyword, orderBy: sort } : { sort };
  const request = authRequest();
  try {
    const { data } = await request.get<{ data: IModuleList }>(
      keyword ? "/modules/search" : "/modules",
      {
        params: { limit, page, ...searchObj },
        cache: "no-store",
      }
    );
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

export const getStudentAndSession = async (id: string) => {
  const request = authRequest();
  const option: XiorRequestConfig<any> = {
    params: { module: id, limit: 10, page: 1 },
    cache: "no-store",
  };
  try {
    const { data: studentsData } = await request.get<{ data: IStudentList }>(
      "/students",
      option
    );
    const { data: sessionData } = await request.get<{ data: ISessionList }>(
      "/sessions",
      option
    );

    return { studentsList: studentsData.data, sessionsList: sessionData.data };
  } catch (error) {
    console.log(error);
    throw Error("Error while fetching modules");
  }
};

export const getSingleSession = async (moduleId: string, id: string) => {
  const request = authRequest();
  try {
    const { data } = await request.get<{ data: { session: ISession } }>(
      "/sessions/" + id,
      {
        params: { module: moduleId },
        cache: "no-store",
      }
    );
    return data.data.session;
  } catch (error) {
    console.log(error);
    throw Error("Error while fetching session with id: " + id);
  }
};

export const getAttendanceBySession = async ({
  limit = 10,
  page = 1,
  filterBy,
  keyword = "",
  sessionId,
}: {
  limit?: number;
  page?: number;
  filterBy?: string;
  keyword?: string;
  sessionId: string;
}) => {
  console.log({ limit, page });
  const searchObj = { keyword, filterBy };
  const request = authRequest();
  try {
    const { data } = await request.get<{ data: IAttendanceList }>(
      "attendance/sessions/" + sessionId,
      {
        params: { limit, page, ...searchObj },
        cache: "no-store",
      }
    );
    return data.data;
  } catch (error) {
    console.log(error);
    throw Error(
      "Error while fetching Attendance List of session: " + sessionId
    );
  }
};

export const getStudentAttendance = async () => {
  const request = authRequest();
  try {
    const { data } = await request.get<{ data: IAttendanceList }>(
      "/attendance",
      {
        params: {
          limit: 10,
        },
      }
    );
    return data.data;
  } catch (error) {
    console.log(error);
    throw Error("Error while fetching student attendance");
  }
};
