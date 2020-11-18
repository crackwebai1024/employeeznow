import React, { Fragment } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AppRouterData, AppPrivateRouterEmployerData, AppPrivateRouteeEmployeeData } from './AppRouterData';
import EmptyPage from '@components/EmptyPage'
import Home from '@views/Home';
import { getToken, getUser, getRole } from '@helpers/auth-helpers'

export default function AppRouter() {
  const token = getToken()
  const user = JSON.parse(getUser())
  const role = getRole()

  return (
    <Fragment>
      { !token ? <Fragment>
        {
          AppRouterData.map(Router => {
            return (
              <Route exact key={`path_${Router.path}`} path={Router.path} component={Router.component} />
            )
          })
        }
      </Fragment>
        :
        role == "employer" ?
          <Fragment>
            {
              AppPrivateRouterEmployerData.map(Router => {
                return (
                  <Route exact key={`path_${Router.path}`} path={Router.path} component={Router.component} />
                )
              })
            }
          </Fragment>
          :
          <Fragment>
            {
              AppPrivateRouteeEmployeeData.map(Router => {
                return (
                  <Route exact key={`path_${Router.path}`} path={Router.path} component={Router.component} ></Route>
                )
              })
            }
          </Fragment>
      }
    </Fragment>
  )
}
