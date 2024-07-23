interface IStudent {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface IStudentList {
  students: IStudent[];
  metadata: {
    totalDocuments: number;
    totalPages: number;
    currentPage: number;
    previousPage: number;
    limit: number;
  };
}
