import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import {
  AppRouterData,
  AppPrivateRouterEmployerData,
  AppPrivateRouteeEmployeeData,
} from "./AppRouterData";
// import EmptyPage from '@components/EmptyPage'
import { getToken, getRole } from "@helpers/auth-helpers";

export default function AppRouter() {
  const token = getToken();
  const role = getRole();

  return (
    <Fragment>
      {!token ? (
        <Fragment>
          {AppRouterData.map((Router) => {
            return (
              <Route
                exact
                key={`path_${Router.path}`}
                path={Router.path}
                component={Router.component}
              />
            );
          })}
        </Fragment>
      ) : role === "employer" ? (
        <Fragment>
          {AppPrivateRouterEmployerData.map((Router) => {
            return (
              <Route
                exact
                key={`path_${Router.path}`}
                path={Router.path}
                component={Router.component}
              />
            );
          })}
        </Fragment>
      ) : (
        <Fragment>
          {AppPrivateRouteeEmployeeData.map((Router) => {
            return (
              <Route
                exact
                key={`path_${Router.path}`}
                path={Router.path}
                component={Router.component}
              ></Route>
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
}
