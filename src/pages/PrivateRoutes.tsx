import { Redirect, Route, RouteProps } from "react-router-dom";
import { AllRoutesProps } from "../interfaces/Route";


export default function PrivateRoutes({
  component: Component,
  isAuthenticated,
  ...rest
}: AllRoutesProps) {
  console.log("rest", rest);

  return (
    <Route
      {...rest}
      render={(props: RouteProps) => {
        console.log("props", props);
        return !isAuthenticated ? <Redirect to="/" />: <Component {...props} />;
      }}
    />
  );
}
