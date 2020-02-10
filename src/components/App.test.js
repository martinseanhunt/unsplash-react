import React from 'react'
import { shallow } from 'enzyme'

import { useUserContext } from '../context/user/UserContext'
import { initialState } from '../context/user/userReducer'
import App from './App'
import { findByTest } from '../test/testUtils'

jest.mock('../hooks/useAuthenticate', () => () => null)
jest.mock('../context/user/UserContext')

const init = (state) => {
  const UserContextValue = {
    state: {
      ...initialState,
      ...state
    }
  }
  useUserContext.mockImplementation(() => UserContextValue)

  return shallow(<App />)
}

beforeEach(() => jest.clearAllMocks())

describe('If no error', () => {
  test('Loading component is rendered when auth not checked', () => {
    const wrapper = init({ error: false, hasCheckedAuth: false })
    const node = findByTest(wrapper, 'loading')
    expect(node.exists()).toBe(true)
  })

  test('Routes are rendered when auth checked', () => {
    const wrapper = init({ error: false, hasCheckedAuth: true })
    const node = findByTest(wrapper, 'routes')
    expect(node.exists()).toBe(true)
  })
})

describe('If error', () => {
  test('Error component is rendered when auth not checked', () => {
    const wrapper = init({ error: true, hasCheckedAuth: false })
    const node = findByTest(wrapper, 'error')
    expect(node.exists()).toBe(true)
  })

  test('Error component is rendered when auth checked', () => {
    const wrapper = init({ error: true, hasCheckedAuth: false })
    const node = findByTest(wrapper, 'error')
    expect(node.exists()).toBe(true)
  })
})
