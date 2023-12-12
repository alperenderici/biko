import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "./pages/auth_provider";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Route
            {...rest}
            render={() => (
              <RouteComponent {...routeProps} />
            )}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
