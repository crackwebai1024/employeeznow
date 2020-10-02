import React, { Fragment } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AppRouterData, AppPrivateRouterData } from './AppRouterData';
import { getToken, getUser } from '@helpers/auth-helpers'

export default function AppRouter() {
  const token = getToken()
  const user = JSON.parse(getUser())
  return (
    <Fragment>
      { !token ?
        AppRouterData.map(Router => {
          return (
            <Route exact key={`path_${Router.path}`} path={Router.path} component={Router.component} />
          )
        }) :
        AppPrivateRouterData.map(Router => {
          return (
            <Route exact key={`path_${Router.path}`} path={Router.path} component={Router.component} />
          )
        })
      }
    </Fragment>
  )
}
