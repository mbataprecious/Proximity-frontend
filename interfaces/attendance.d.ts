interface IAttendance {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  module: string;
  code: string;
  location: string;
  present: boolean;
  flagged: boolean;
  date: string;
  status?: string;
}

interface IAttendanceList {
  attendance: IAttendance[];
  metaData: {
    totalDocuments: number;
    totalPages: number;
    currentPage: number;
    nextPage: number;
    limit: number;
  };
}
