import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'

import { useUserContext } from '../../context/user/UserContext'
import { initialState } from '../../context/user/userReducer'

import useGetResults from '../useGetResults'

import api from '../../api/api'

const mockResultsDispatch = jest.fn(() => null)
jest.mock('../../context/results/ResultsContext', () => ({
  useResultsContext: () => ({ dispatch: mockResultsDispatch })
}))

jest.mock('../../context/user/UserContext')

api.getFavourites = jest.fn()
api.searchImages = jest.fn()

/*
  NOTE: Creating a component to call the hook from within
  I've read this is cleaner with react-testing-library but 
  just doing this for sake of time
*/
const HookComponent = () => {
  useGetResults()
  return <div/>
}

/* 
  NOTE: useLocation is a getter and so jest.mock won't mock it.
  using memory router instead.
*/
const init = (state, path='/') => {
  const userContextValue = {
    state: {
      ...initialState,
      ...state
    }
  }
  
  useUserContext.mockImplementation(() => userContextValue)

  return mount(
    <MemoryRouter initialEntries={[path]}>
      <HookComponent />)
    </MemoryRouter>
  )
}

beforeEach(() => jest.clearAllMocks())

test('If not favourites and no user id, SET_SEARCH_RESULTS action is dispatched',async () => {
  await act(async () => { init() })
  expect(mockResultsDispatch.mock.calls.pop()[0].type).toBe('SET_RESULTS_RESULTS')
})

test('Ifand user id, SET_RESULTS_FAVOURITES action is dispatched', async () => {
  await act(async () => { init({ id: 123 }, '/favourites') })
  expect(mockResultsDispatch.mock.calls.pop()[0].type).toBe('SET_RESULTS_FAVOURITES')
}) 