import { ReactNode } from "react";

export interface AllRoutesProps {
  children: ReactNode;
  isAuthenticated: boolean | undefined;
  [key: string]: any;
}
