import React from 'react'
import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../../globalstyles/theme'
import { MemoryRouter  } from 'react-router-dom'

import UserContextProvider from '../../../context/user/UserContext'
import { initialState } from '../../../context/user/userReducer'

import { findByTest } from '../../../test/testUtils' 
import MenuBar from '../MenuBar'

const mockDispatch = jest.fn((action) => action.type)

const defaultContextValue = {
  state: initialState,
  dispatch: mockDispatch
}

const init = (contextValue, pathToTest='/', props) => mount(
  <MemoryRouter initialEntries={[pathToTest]}>
    <UserContextProvider value={contextValue}>
      <ThemeProvider theme={theme}>
        <MenuBar {...props} />
      </ThemeProvider>
    </UserContextProvider>
  </MemoryRouter>
)

beforeEach(() => mockDispatch.mockClear())

test('Renders component without crashing', () => {
  const wrapper = init(defaultContextValue)
  const component = findByTest(wrapper, 'component-menu-bar')
  expect(component.exists()).toBe(true)
})

describe('user is not authed', () => {
  test('Renders login link if error on user state', () => {
    const wrapper = init({
      ...defaultContextValue,
      state: {
        ...defaultContextValue.state,
        error: 'some error'
      }
    })

    
    const node = findByTest(wrapper, 'login-link')
    expect(node.exists()).toBe(true)
  })
  
  test('Renders login link if has checked auth and no user id', () => {
    const wrapper = init({
      ...defaultContextValue,
      state: {
        ...defaultContextValue.state,
        hasCheckedAuth: true,
      }
    })
    const node = findByTest(wrapper, 'login-link')
    expect(node.exists()).toBe(true)
  })
  
  test('Renders loading if loading state is true', () => {
    const wrapper = init({
      ...defaultContextValue,
      state: {
        ...defaultContextValue.state,
        loading: true
      }
    })
    const node = findByTest(wrapper, 'loading')
    expect(node.exists()).toBe(true)
  })
  
  test('Renders loading if hasCheckedAuth not initialized', () => {
    const wrapper = init(defaultContextValue)
    const node = findByTest(wrapper, 'loading')
    expect(node.exists()).toBe(true)
  })
})

describe('user is logged in ', () => {
  const loggedInState = {
    ...defaultContextValue,
    state: {
      ...defaultContextValue.state,
      hasCheckedAuth: true,
      id: 123
    }
  }

  test('Renders user menu if has checked auth and user id exists', () => {
    const wrapper = init(loggedInState)
    const node = findByTest(wrapper, 'user-menu')
    expect(node.exists()).toBe(true)
  })
  
  test('Menu shows home if on favorites page', () => {
    const wrapper = init(loggedInState, '/favourites')
    const node = findByTest(wrapper, 'home-link')
    expect(node.exists()).toBe(true)
  })
  
  test('Menu shows faves  if on home page', () => {
    const wrapper = init(loggedInState, '/')
    const node = findByTest(wrapper, 'faves-link')
    expect(node.exists()).toBe(true)
  })

  test('Correct action dispatched when logout button pressed', () => {
    const wrapper = init(loggedInState, '/')
    const node = findByTest(wrapper, 'logout-button')
    node.simulate('click')
    expect(mockDispatch).toHaveLastReturnedWith('USER_LOGOUT')
  })
})