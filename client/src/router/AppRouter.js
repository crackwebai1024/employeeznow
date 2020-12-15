import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import {
  AppRouterData,
  AppPrivateRouterEmployerData,
  AppPrivateRouteeEmployeeData,
  AppPrivateRouteVoterData,
} from "./AppRouterData";
// import EmptyPage from '@components/EmptyPage'
import { getToken, getRole } from "@helpers/auth-helpers";

export default function AppRouter() {
  const token = getToken();
  const role = getRole();
  console.log(role, "role");
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
      ) : (
        <Fragment>
          {role === "employer" && (
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
          )}

          {role === "employee" && (
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

          {role === "voter" && (
            <Fragment>
              {AppPrivateRouteVoterData.map((Router) => {
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
      )}
    </Fragment>
  );
}
