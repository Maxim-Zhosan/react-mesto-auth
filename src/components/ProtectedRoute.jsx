import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, ...props }) => {
  return (
        <Route>
      {() =>
        props.isLoggedIn ? children : <Redirect to="/sign-in" />
      }
    </Route>
)};

export default ProtectedRoute;