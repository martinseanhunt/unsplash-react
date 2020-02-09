import React from 'react'
import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../../globalstyles/theme'

import ResultsContextProvider from '../../../context/results/ResultsContext'
import { initialState } from '../../../context/results/resultsReducer'

import { findByTest } from '../../../test/testUtils' 
import Modal from '../Modal'

import exampleResult from '../../../test/exampleResult'

const mockDispatch = jest.fn((action) => action.type)

const defaultContextValue = {
  state: initialState,
  dispatch: mockDispatch
}

const init = (contextValue, props) => mount(
  <ResultsContextProvider value={contextValue}>
    <ThemeProvider theme={theme}>
      <Modal {...props} />
    </ThemeProvider>
  </ResultsContextProvider>
)

beforeEach(() => mockDispatch.mockClear())

test('Nothing rendered when no modal property', () => {
  const wrapper = init(defaultContextValue)
  const component = findByTest(wrapper, 'component-modal')
  expect(component.exists()).toBe(false)
})

describe('modal is open', () => {
 const state = {
    ...defaultContextValue,
    state: {
      ...defaultContextValue.state,
      modal: exampleResult
    }
  }

  test('Modal rendered when modal is set to result obj in state', () => {
    const wrapper = init(state)
    const node = findByTest(wrapper, 'component-modal')
    expect(node.exists()).toBe(true)
  })

  test('Modal close button calls dispatch with correct action', () => {
    const wrapper = init(state)
    const node = findByTest(wrapper, 'close-modal')
    node.simulate('click')
    expect(mockDispatch).toHaveLastReturnedWith('CLOSE_MODAL')
  })

  test('Click outside modal inner closes, dispatch with correct action', () => {
    const wrapper = init(state)
    const node = findByTest(wrapper, 'component-modal')
    node.first().simulate('click')

    expect(mockDispatch).toHaveLastReturnedWith('CLOSE_MODAL')
  })

  test('Click inside modal inner stops propegation and no action fired', () => {
    const wrapper = init(state)
    const node = findByTest(wrapper, 'modal-inner')
    node.first().simulate('click')

    expect(mockDispatch.mock.calls.length).toBe(0)
  })

  
})


