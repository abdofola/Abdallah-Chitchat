import { Redirect, Route, RouteProps } from "react-router-dom";
import { AllRoutesProps } from "../interfaces/Route";

export default function PublicRoutes({
  children,
  isAuthenticated,
  ...rest
}: AllRoutesProps) {
  return (
    <Route
      {...rest}
      render={({ location }: RouteProps) => {
        const to = { pathname: "/chat", state: { from: location } };
        return isAuthenticated ? <Redirect to={to} /> : children;
      }}
    />
  );
}
