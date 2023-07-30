import { FieldInputProps, FormikProps } from "formik";

export interface User {
  username: string;
  id: string;
}

export interface Schedule {
  name: string;
  description?: string;
  id: string;
}

export interface CourseResponse {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  info?: string;
}

export interface AuthCred {
  username: string;
  password: string;
}

export interface Course {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  info?: string;
}

export interface MyFieldProps<A, B> {
  field: FieldInputProps<A>;
  form: FormikProps<B>;
}
