import React from 'react'
import { Switch, Route } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import { useUserContext } from '../context/user/UserContext'
import useAuthenticate from '../hooks/useAuthenticate'

import Header from './Header/Header'
import Footer from './Footer/Footer'
import Results from './Results/Results'
import Loading from './common/Loading'
import Error from './common/Error'

const App = () => {
  useAuthenticate()
  const { state: { error, hasCheckedAuth } } = useUserContext()

  const fallbackComponent = error 
    ? <Error error={error.message}/>
    : <Loading />

  return (
    <>
      <Header />
      {hasCheckedAuth ? (
        <Switch>
          <PrivateRoute path="/favourites">
            <Results />
          </PrivateRoute>
          <Route path="/:page?/:query?">
            <Results />
          </Route>
        </Switch>
      ) : (
        fallbackComponent
      )}
      <Footer />
    </>
  )
}

export default App