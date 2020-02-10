import React from 'react'
import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../../globalstyles/theme'
import { MemoryRouter  } from 'react-router-dom'

import UserContextProvider from '../../../context/user/UserContext'
import { initialState } from '../../../context/user/userReducer'
import LocalStorageMock from '../../../test/LocalStorageMock'

import { findByTest } from '../../../test/testUtils' 
import MenuBar from '../MenuBar'

/* 
  NOTE: This test suite needs to use mount because the component 
  has a few sub components in a single file which are contitionally
  rendered. They will not all be tested unless we use mount or 
  restructure the component
*/

const mockDispatch = jest.fn((action) => action.type)

const init = (state, pathToTest='/', props) => {
  const contextValue = {
    state: {
      ...initialState,
      ...state
    },
    dispatch: mockDispatch
  }

  return mount(
  <MemoryRouter initialEntries={[pathToTest]}>
    <UserContextProvider value={contextValue}>
      <ThemeProvider theme={theme}>
        <MenuBar {...props} />
      </ThemeProvider>
    </UserContextProvider>
  </MemoryRouter>
  )
}

beforeEach(() => mockDispatch.mockClear())

describe('if user is logged out and auth hasnt been checked', () => {
  test('Renders component without crashing', () => {
    const wrapper = init()
    const component = findByTest(wrapper, 'component-menu-bar')
    expect(component.exists()).toBe(true)
  })

  test('Renders loading when no error', () => {
    const wrapper = init()
    const node = findByTest(wrapper, 'loading')
    expect(node.exists()).toBe(true)
  })

  test('Renders login link if error on user state', () => {
    const wrapper = init({ error: 'some error' })
    const node = findByTest(wrapper, 'login-link')
    expect(node.exists()).toBe(true)
  })

  test('Renders loading if loading state is true', () => {
    const wrapper = init({ loading: true })
    const node = findByTest(wrapper, 'loading')
    expect(node.exists()).toBe(true)
  })
})

describe('user is logged out and auth has been checked', () => {
  test('Renders component without crashing', () => {
    const wrapper = init({ hasCheckedAuth: true })
    const component = findByTest(wrapper, 'component-menu-bar')
    expect(component.exists()).toBe(true)
  })

  test('Renders login link if no user id', () => {
    const wrapper = init({ hasCheckedAuth: true })
    const node = findByTest(wrapper, 'login-link')
    expect(node.exists()).toBe(true)
  })

  test('Renders login link if error on user state', () => {
    const wrapper = init({ hasCheckedAuth: true, error: 'some error' })
    const node = findByTest(wrapper, 'login-link')
    expect(node.exists()).toBe(true)
  })
})

const loggedInState = { hasCheckedAuth: true, id: 123 }

describe('user is logged in ', () => {

  test('Renders component without crashing', () => {
    const wrapper = init(loggedInState)
    const component = findByTest(wrapper, 'component-menu-bar')
    expect(component.exists()).toBe(true)
  })

  test('Renders user menu', () => {
    const wrapper = init(loggedInState)
    const node = findByTest(wrapper, 'user-menu')
    expect(node.exists()).toBe(true)
  })
  
  test('Menu shows home if on favorites page', () => {
    const wrapper = init(loggedInState, '/favourites')
    const node = findByTest(wrapper, 'home-link')
    expect(node.exists()).toBe(true)
  })
  
  test('Menu shows favourites if on home page', () => {
    const wrapper = init(loggedInState, '/')
    const node = findByTest(wrapper, 'faves-link')
    expect(node.exists()).toBe(true)
  })
})

describe('user logged in and logout button is pressed', () => {
  beforeEach(() => global.localStorage = new LocalStorageMock)

  test('Correct action dispatched', () => {
    const wrapper = init(loggedInState)
    const node = findByTest(wrapper, 'logout-button')
    node.simulate('click')
    expect(mockDispatch).toHaveLastReturnedWith('USER_LOGOUT')
  })

  test('token removed from localstorage', () => {
    localStorage.setItem('token', 'token')
    expect(localStorage.token).toBe('token')

    const wrapper = init(loggedInState)
    const node = findByTest(wrapper, 'logout-button')
    node.simulate('click')
    
    expect(localStorage.token).toBeFalsy()
  })

  test('user removed from localstorage', () => {
    localStorage.setItem('user', 'user')
    expect(localStorage.user).toBe('user')

    const wrapper = init(loggedInState)
    const node = findByTest(wrapper, 'logout-button')
    node.simulate('click')
    
    expect(localStorage.user).toBeFalsy()
  })
})