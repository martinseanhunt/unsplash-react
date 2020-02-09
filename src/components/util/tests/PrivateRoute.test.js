import React from 'react'
import { mount, shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import theme from '../../../globalstyles/theme'
import UserContextProvider from '../../../context/user/UserContext'
import { initialState } from '../../../context/user/userReducer'

import { findByTest } from '../../../test/testUtils' 
import LocalStorageMock from '../../../test/LocalStorageMock'
import PrivateRoute from '../PrivateRoute'


// Mocking the redirect component so it doesn't actually try to redirect
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Redirect: () => <div data-test='mock-redirect'></div>
}))

const mockDispatch = jest.fn((action) => action.type)
const defaultContextValue = {
  state: initialState,
  dispatch: mockDispatch
}

const defaultProps = {
  children: <div data-test='mock-children'>hi</div>
}

const init = (state) => {
  const contextValue = {
    ...defaultContextValue,
    state: {
      ...defaultContextValue.state,
      ...state
    }
  }

  return mount(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserContextProvider value={contextValue}>
          <PrivateRoute {...defaultProps} />
        </UserContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

// Seperate init function to mount renderprop of returned component
const initRenderProp = (component) => {
  return shallow(component.props().render({ location: '/' }))
}

test('Renders without crashing', () => {
  const wrapper = init()
  const node = findByTest(wrapper, 'component-private-route')
  expect(node.exists()).toBe(true)
})

describe('returns a component with render prop whose returned component', () => {
  test('can be mounted successfully', () => {
    const wrapper = init()
    const node = findByTest(wrapper, 'component-private-route')
    
    initRenderProp(node)
  })  

  test('renders authenticating if !hasCheckedAuth', () => {
    const wrapper = init()
    const node = findByTest(wrapper, 'component-private-route')
    
    const renderWrapper = initRenderProp(node)
    const authenticating = findByTest(renderWrapper, 'authenticating')
    expect(authenticating.exists()).toBe(true)
  })  

  test('renders redirect if hasCheckedAuth and no authed user', () => {
    const wrapper = init({ hasCheckedAuth: true })
    const node = findByTest(wrapper, 'component-private-route')
    
    const renderWrapper = initRenderProp(node)
    const redirect = findByTest(renderWrapper, 'mock-redirect')
    expect(redirect.exists()).toBe(true)
  }) 

  test('renders children if authed user', () => {
    global.localStorage = new LocalStorageMock

    localStorage.setItem('token', 'token')
    const wrapper = init({ 
      hasCheckedAuth: true,
      id: 123,
    })
    const node = findByTest(wrapper, 'component-private-route')
    
    const renderWrapper = initRenderProp(node)
    const children = findByTest(renderWrapper, 'mock-children')
    expect(children.exists()).toBe(true)
  }) 

})
