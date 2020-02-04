import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import theme from './globalstyles/theme'
import GlobalStyle from './globalstyles/global'

import UserContextProvider from './context/user/UserContext'
import ResultsContextProvider from './context/results/ResultsContext'

import App from './components/App'

const Index = () => {
  return(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <UserContextProvider>
          <ResultsContextProvider>
            <App />
          </ResultsContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))
