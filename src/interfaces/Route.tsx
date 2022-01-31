import { FunctionComponent } from "react";

export interface AllRoutesProps {
  component: FunctionComponent;
  isAuthenticated: boolean | undefined;
  [key: string]: any;
}
