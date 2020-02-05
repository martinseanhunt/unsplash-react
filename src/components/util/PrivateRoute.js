import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useUserContext } from '../../context/user/UserContext'
import Loading from '../common/Loading'

const PrivateRoute = ({ children, ...rest }) => {
  const { state: user } = useUserContext()

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if(!user.hasCheckedAuth) return <Loading text='Authenticating' />
        
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