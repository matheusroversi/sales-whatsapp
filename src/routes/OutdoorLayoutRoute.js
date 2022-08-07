import React from "react";
import { Route } from "react-router-dom";
import OutdoorLayout from "../layouts/PageLayoutOutdoor";

const OutdoorLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <OutdoorLayout>
          <Component {...props} />
        </OutdoorLayout>
      )}
    />
  );
};

export default OutdoorLayoutRoute;
