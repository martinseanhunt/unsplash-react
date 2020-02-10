import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import theme from '../../../globalstyles/theme'
import { useUserContext } from '../../../context/user/UserContext'
import { initialState as initialUserState } from '../../../context/user/userReducer'
import { useResultsContext } from '../../../context/results/ResultsContext'
import { initialState as initialResultsState } from '../../../context/results/resultsReducer'
import useGetResults from '../../../hooks/useGetResults'
import exampleResults from '../../../test/exampleResults'
import { findByTest } from '../../../test/testUtils' 

import Results from '../Results'

jest.mock('../../../context/results/ResultsContext')
jest.mock('../../../context/user/UserContext')
jest.mock('../../../hooks/useGetResults')

/* 
  NOTE: Mocking useGetResults in this way in case we ever wanted to add
  more tests based on the different return values of useGetResults
  now we can set them individually on each test.

  I spent more time geting this test suite set up for flexible, integration
  style tests than actually writing the tests. This was an interesting challenge
  and a good oportunity to learn!
*/
const defaultGetResultsValues = {
  page: 1,
  searchQuery: 'Duckling party',
  pathname: '/',
  isFavourites: false
}

const mockUserDispatch = jest.fn((action) => action.type)
const mockResultsDispatch = jest.fn((action) => action.type)

const init = (options={}) => {
  const { 
    userState={}, 
    resultsState={}, 
    getResultsValues={},
  } = options

  const userContextValue = {
    state: {
      ...initialUserState,
      ...userState
    },
    dispatch: mockUserDispatch
  }

  const resultsContextValue = {
    state: {
      ...initialResultsState,
      ...resultsState
    },
    dispatch: mockResultsDispatch
  }

  useUserContext.mockImplementation(() => userContextValue)
  useResultsContext.mockImplementation(() => resultsContextValue)
  useGetResults.mockImplementation(() => () => ({
    ...defaultGetResultsValues,
    getResultsValues
  }))

  return mount(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Results />
      </ThemeProvider>
    </BrowserRouter>
  )
}

beforeEach(() => jest.clearAllMocks())

describe('Before results loaded', () => {
  test('Renders Loading', () => {
    const wrapper = init()
    const node = findByTest(wrapper, 'loading')
    expect(node.exists()).toBe(true)
  })

  test('main component not rendered', () => {
    const wrapper = init()
    const node = findByTest(wrapper, 'component-results')
    expect(node.exists()).toBe(false)
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
  const resultsState = {
    results: exampleResults,
    hasLoadedInitialResults: true
  }

  test('main component rendered', () => {
    const wrapper = init({ resultsState })
    const node = findByTest(wrapper, 'component-results')
    expect(node.exists()).toBe(true)
  })

  test('results list rendered', () => {
    const wrapper = init({ resultsState })
    const node = findByTest(wrapper, 'results-list')
    expect(node.exists()).toBe(true)
  })

  test('correct number of result cards are displayed', () => {
    const wrapper = init({ resultsState })
    const nodes = findByTest(wrapper, 'result-card')
    expect(nodes.length).toBe(exampleResults.length)
  })
})

describe('When results initialized and no results to show', () => {
  const resultsState = {
    results: [],
    hasLoadedInitialResults: true
  }

  test('no results error rendered', () => {
    const wrapper = init({ resultsState })
    const node = findByTest(wrapper, 'no-results')
    expect(node.exists()).toBe(true)
  })

  test('no result cards are displayed', () => {
    const wrapper = init({ resultsState })
    const nodes = findByTest(wrapper, 'result-card')
    expect(nodes.length).toBe(0)
  })
})

/*
  TODO: Write integration tests that test the logic of the various handlers
  in this component which are triggered by components further down the tree.
  Mock all the api functions to stop them firing then see that the correct 
  actions are being dispatched based on setting the return values of useGetResults
  and simulating various events.
*/