interface IModuleList {
  modules: IModule[];
  metadata: {
    totalDocuments: number;
    totalPages: number;
    currentPage: number;
    previousPage: number;
    nextPage: number;
    limit: number;
  };
}

interface IModule {
  title: string;
  code: string;
  description: string;
  _id: string;
}
