import React from 'react'
import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../../globalstyles/theme'
import { MemoryRouter } from 'react-router-dom'

import UserContextProvider from '../../../context/user/UserContext'
import { initialState as initialUserState } from '../../../context/user/userReducer'

import ResultsContextProvider from '../../../context/results/ResultsContext'
import { initialState as initialResultsState } from '../../../context/results/resultsReducer'

import exampleResults from '../../../test/exampleResults'

import { findByTest } from '../../../test/testUtils' 
import Results from '../Results'

/* 
  NOTE: This was working fine without moccking and never effects state
  because only the mocked dispatches are ever called. but I'm mocking it
  to reduce any brittleness with further changes and to have more
  control over the state of the tests
*/
jest.mock('../../../hooks/useGetResults', () => () => ({
  page: 1,
  searchQuery: 'Duckling party',
  pathname: '/',
  isFavourites: false
}))

const mockUserDispatch = jest.fn((action) => action.type)
const mockResultsDispatch = jest.fn((action) => action.type)

const defaultUserContextValue = {
  state: initialUserState,
  dispatch: mockUserDispatch
}

const defaultResultsContextValue = {
  state: initialResultsState,
  dispatch: mockResultsDispatch
}

const init = (options={}) => {
  const { userState={}, resultsState={}, pathToTest='/', props } = options

  const userContextValue = {
    ...defaultUserContextValue,
    state: {
      ...defaultUserContextValue.state,
      ...userState
    }
  }

  const resultsContextValue = {
    ...defaultResultsContextValue,
    state: {
      ...defaultResultsContextValue.state,
      ...resultsState
    }
  }

  return mount(
    <MemoryRouter initialEntries={[pathToTest]}>
      <UserContextProvider value={userContextValue}>
        <ResultsContextProvider value={resultsContextValue}>
          <ThemeProvider theme={theme}>
            <Results {...props} />
          </ThemeProvider>
        </ResultsContextProvider>
      </UserContextProvider>
    </MemoryRouter>
  )
}

beforeEach(() => {
  mockUserDispatch.mockClear()
  mockResultsDispatch.mockClear()
})

describe('Before results loaded', () => {
  test('Renders Loading', () => {
    const wrapper = init()
    const node = findByTest(wrapper, 'loading')
    expect(node.exists()).toBe(true)
  })
})

describe('when results error', () => {
  test('Renders Error', () => {
    const wrapper = init({resultsState: { error: 'uh oh!' }})
    const node = findByTest(wrapper, 'error')
    expect(node.exists()).toBe(true)
  })
})

describe('When results initialized and results to show', () => {
  let state
  beforeEach(() => state = {
    results: exampleResults,
    hasLoadedInitialResults: true
  })

  test('main component rendered', () => {
    const wrapper = init({ resultsState: state })
    const node = findByTest(wrapper, 'component-results')
    expect(node.exists()).toBe(true)
  })

  test('results list rendered', () => {
    const wrapper = init({ resultsState: state })
    const node = findByTest(wrapper, 'results-list')
    expect(node.exists()).toBe(true)
  })
})

describe('When results initialized and no results to show', () => {
  let state
  beforeEach(() => state = {
    results: [],
    hasLoadedInitialResults: true
  })

  test('no results error rendered', () => {
    const wrapper = init({ resultsState: state })
    const node = findByTest(wrapper, 'no-results')
    expect(node.exists()).toBe(true)
  })
})