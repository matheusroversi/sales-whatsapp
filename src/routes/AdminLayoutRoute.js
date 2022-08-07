import React from "react";
import { Route } from "react-router-dom";
import AdminLayout from "../layouts/PageLayoutAdmin";

const DefaultLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <AdminLayout>
          <Component {...props} />
        </AdminLayout>
      )}
    />
  );
};

export default DefaultLayoutRoute;
