export interface User {
  username: string;
  id: string;
}

export interface Schedule {
  name: string;
  description?: string;
  id: string;
}

export interface Course {
  name: string;
  startDate: Date;
  endDate: Date;
  info?: string;
}
