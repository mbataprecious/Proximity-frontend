import { Xior } from "xior";

export const getStudentsAndSessionsByMetadata = async ({
  request,
  moduleId,
  type,
  limit = 10,
  page = 1,
}: {
  request: Xior;
  moduleId: string;
  type: "students" | "sessions";
  limit?: number;
  page?: number;
}) => {
  console.log({ limit, page });

  try {
    const { data } = await request.get<{ data: IStudentList | ISessionList }>(
      "/" + type,
      {
        params: { module: moduleId, limit, page },
        cache: "no-store",
      }
    );
    return data.data;
  } catch (error) {
    console.log(error);
    throw Error("Error while fetching modules");
  }
};
