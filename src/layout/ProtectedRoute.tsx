import { Redirect, Route, RouteProps } from 'react-router';
import React from "react";

interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean,
  redirectPath: string,
}

export default function ProtectedRoute({isAuthenticated, redirectPath, ...routeProps}: ProtectedRouteProps) {
  if(isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: redirectPath }} />;
  }
}
