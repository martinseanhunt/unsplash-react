import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import theme from './styles/theme'
import GlobalStyle from './styles/global'
import { Provider } from './store/Context'
import useStore from './store/useStore'

import Header from './components/common/Header'
import Results from './components/Results/Results'

import api from './util/api'

const App = () => {
  const store = useStore()

  useEffect(() => {
    const jwt = localStorage.token
    if(jwt) return undefined

    // would hook up react router and get the params from there in real world
    const params = new URLSearchParams(window.location.search) 
    if(!params.has('code')) return null

    const authCode = params.get('code')
    api.getAuthToken(authCode)
      .then(res => {
        localStorage.setItem('token', JSON.stringify(res))
      })
      .catch(e => {
        // TODO: dispatch login error
        console.error(e)
      })
  }, [])

  const storeDispatch = store.user.dispatch
  useEffect(() => {
    const jwt = localStorage.token
    if(!jwt) return undefined

    api.getProfile()
      .then(payload => {
        storeDispatch({ type: 'SET_USER', payload })
      })
      .catch(e => {
        // TODO: dispatch login error
        console.error(e)
      })
  }, [storeDispatch])

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