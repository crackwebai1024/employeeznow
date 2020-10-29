import React, { Fragment } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AppRouterData, AppPrivateRouterEmployerData, AppPrivateRouteeEmployeeData } from './AppRouterData';
import EmptyPage from '@components/EmptyPage'
import { getToken, getUser, getRole } from '@helpers/auth-helpers'

export default function AppRouter() {
  const token = getToken()
  const user = JSON.parse(getUser())
  const role = getRole()

  return (
    <Fragment>
      { !token ?
        AppRouterData.map(Router => {
          return (
            <Route exact key={`path_${Router.path}`} path={Router.path} component={Router.component} />
          )
        }) :
        role == "employer" ?
          AppPrivateRouterEmployerData.map(Router => {
            return (
              <Route exact key={`path_${Router.path}`} path={Router.path} component={Router.component} />
            )
          }) :
          AppPrivateRouteeEmployeeData.map(Router => {
            return (
              <Route exact key={`path_${Router.path}`} path={Router.path} component={Router.component} />
            )
          })
      }
    </Fragment>
  )
}
