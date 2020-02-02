import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import theme from './styles/theme'
import GlobalStyle from './styles/global'
import { Provider } from './store/Context'
import useStore from './store/useStore'
import authenticate from './util/authenticate'

import Header from './components/Header'
import Results from './components/Results/Results'

import Loading from './components/Loading'

const App = () => {
  const store = useStore()
  const { dispatch } = store.user

  useEffect(() => {
    authenticate(dispatch)
  }, [dispatch])
  
  return(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Provider value={store}>
        <BrowserRouter>
          <Header />
          {store.user.state.hasCheckedAuth ? (
            <Switch>
              <PrivateRoute path="/favorites">
                <Results />
              </PrivateRoute>
              <Route path="/:page?/:query?">
                <Results />
              </Route>
            </Switch>
          ) : (
            <Loading />
          )}
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
