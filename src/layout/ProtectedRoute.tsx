import { Redirect, Route, RouteProps } from 'react-router';
import React from "react";

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  redirectPath: string;
} & RouteProps;

export default function ProtectedRoute({isAuthenticated, redirectPath, ...routeProps}: ProtectedRouteProps) {
  if(isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: redirectPath }} />;
  }
}
