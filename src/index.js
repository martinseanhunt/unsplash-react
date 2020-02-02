import React, { useEffect, useState } from 'react'
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

const App = () => {
  const store = useStore()
  const { dispatch } = store.user

  const [enableRedirects, setEnableRedirects] = useState(false)

  useEffect(() => {
    authenticate(dispatch)
    setEnableRedirects(true)
  }, [dispatch, setEnableRedirects])
  
  return(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Provider value={store}>
        <BrowserRouter>
          <Header />
          <Switch>
            <PrivateRoute path="/favorites" enableRedirects={enableRedirects}>
              <Results />
            </PrivateRoute>
            <Route path="/">
              <Results />
            </Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

