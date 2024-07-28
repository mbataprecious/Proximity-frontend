interface ISession {
  duration: number;
  code: string;
  geofencing: boolean;
  location: string;
  buffer: number;
  longitude: number;
  lattitude: number;
  createdAt: string;
  endTime: string;
  _id: string;
  active: boolean;
  absent: number;
  present: number;
  flagged: number;
}

interface ISessionList {
  sessions: ISession[];
  metadata: {
    totalDocuments: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}
