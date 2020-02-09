import React from 'react'
import { shallow } from 'enzyme'

import { useUserContext } from '../context/user/UserContext'
import { initialState } from '../context/user/userReducer'
import App from './App'
import { findByTest } from '../test/testUtils'

jest.mock('../hooks/useAuthenticate', () => () => null)
jest.mock('../context/user/UserContext')

const init = () => shallow(<App />)

beforeEach(() => jest.clearAllMocks())

const createState = (state) => ({
  state: {
    ...initialState,
    ...state
  }
})

describe('If no error', () => {
  test('Loading component is rendered when auth not checked', () => {
    useUserContext.mockImplementationOnce(() => 
      createState({ error: false, hasCheckedAuth: false }))
  
    const wrapper = init()
    const node = findByTest(wrapper, 'loading')
    expect(node.exists()).toBe(true)
  })

  test('Routes are rendered when auth checked', () => {
    useUserContext.mockImplementationOnce(() => 
     createState({ error: false, hasCheckedAuth: true }))
  
    const wrapper = init()
    const node = findByTest(wrapper, 'routes')
    expect(node.exists()).toBe(true)
  })
})

describe('If error', () => {
  test('Error component is rendered when auth not checked', () => {
    useUserContext.mockImplementationOnce(() => 
      createState({ error: true, hasCheckedAuth: false }))
  
    const wrapper = init()
    const node = findByTest(wrapper, 'error')
    expect(node.exists()).toBe(true)
  })

  test('Error component is rendered when auth checked', () => {
    useUserContext.mockImplementationOnce(() => 
      createState({ error: true, hasCheckedAuth: true }))
  
    const wrapper = init()
    const node = findByTest(wrapper, 'error')
    expect(node.exists()).toBe(true)
  })
})
