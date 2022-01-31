import { Redirect, Route, RouteProps } from "react-router-dom";
import { AllRoutesProps } from "../interfaces/Route";

export default function PublicRoutes({
  component: Component,
  isAuthenticated,
  ...rest
}: AllRoutesProps) {

  return (
    <Route
      {...rest}
      render={(props: RouteProps) => {
        return isAuthenticated ? <Redirect to="/chat" /> : <Component {...props} />;
      }}
    />
  );
}
