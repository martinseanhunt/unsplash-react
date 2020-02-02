import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import Context from '../store/Context'

const PrivateRoute = ({ children, enableRedirects, ...rest }) => {
  const { user: { state: user } } = useContext(Context)  

  console.log(user)

  // Just a basic example to implement redirects
  // Would need to check in with server for a real world, secure example

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if(!user.hasCheckedAuth) {
          return <div>Authenticating...</div>
        }
        return (user.id && localStorage.token) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
      }
    />
  )
}

export default PrivateRoute