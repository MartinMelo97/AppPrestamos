import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from './../auth'

const PublicRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={routeProps =>
       !currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/dashboard"} />
        )
      }
    />
  )
}

export default PublicRoute