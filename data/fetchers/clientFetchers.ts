import { Xior } from "xior";

export const getStudentsAndSessionsByMetadata = async ({
  request,
  moduleId,
  type,
  limit = 10,
  page = 1,
  sort = "",
  orderBy = "firstName",
  keyword,
}: {
  request: Xior;
  moduleId: string;
  type: "students" | "sessions";
  limit?: number;
  orderBy?: string;
  page?: number;
  sort?: string;
  keyword?: string;
}) => {
  console.log({ limit, page });

  try {
    const { data } = await request.get<{ data: IStudentList | ISessionList }>(
      "/" + type,
      {
        params: { module: moduleId, limit, page, sort, orderBy, keyword },
        cache: "no-store",
      }
    );
    return data.data;
  } catch (error) {
    console.log(error);
    throw Error("Error while fetching modules");
  }
};
