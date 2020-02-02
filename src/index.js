import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

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

  useEffect(() => {
    authenticate(dispatch)
  }, [dispatch])

  return(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Provider value={store}>
        <Header />
        <Results />
      </Provider>
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))