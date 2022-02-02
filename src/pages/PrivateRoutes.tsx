import { Redirect, Route, RouteProps } from "react-router-dom";
import { AllRoutesProps } from "../interfaces/Route";

export default function PrivateRoutes({
  children,
  isAuthenticated,
  ...rest
}: AllRoutesProps) {
//   console.log("rest", rest);

  return (
    <Route
      {...rest}
      render={({location}: RouteProps) => {
        const to = { pathname: "/", state: { from: location } };
        // console.log("location", location);

        return !isAuthenticated ? <Redirect to={to} /> : children;
      }}
    />
  );
}
