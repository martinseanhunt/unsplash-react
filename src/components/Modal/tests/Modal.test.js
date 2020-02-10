import React from 'react'
import { shallow } from 'enzyme'

import { useResultsContext } from '../../../context/results/ResultsContext'
import { initialState } from '../../../context/results/resultsReducer'
import { findByTest } from '../../../test/testUtils' 
import exampleResult from '../../../test/exampleResult'

import Modal from '../Modal'

jest.mock('../../../context/results/ResultsContext')
const mockDispatch = jest.fn((action) => action.type)

const init = (state) => {
  const contextValue = {
    state: {
      ...initialState,
      ...state
    },
    dispatch: mockDispatch
  }

  useResultsContext.mockImplementation(() => contextValue)
  return shallow(<Modal />)
}

beforeEach(() => jest.clearAllMocks())

test('Nothing is rendered when no modal property', () => {
  const wrapper = init({ modal: null })
  const component = findByTest(wrapper, 'component-modal')
  expect(component.exists()).toBe(false)
})

describe('if modal is open', () => {
  let wrapper
  beforeEach(() => wrapper = init({ modal: exampleResult }))

  test('Modal rendered when modal is set to result obj in state', () => {
    const node = findByTest(wrapper, 'component-modal')
    expect(node.exists()).toBe(true)
  })

  test('Image rendered with correct url', () => {
    const node = findByTest(wrapper, 'image')
    const src = node.first().props().src
    expect(src.includes(exampleResult.urls.full)).toBe(true)
  })

  test('Modal close button calls dispatch with correct action', () => {
    const node = findByTest(wrapper, 'close-modal')
    node.simulate('click')
    expect(mockDispatch).toHaveLastReturnedWith('CLOSE_MODAL')
  })

  test('Click outside modal inner calls dispatch with correct action', () => {
    const node = findByTest(wrapper, 'component-modal')
    node.first().simulate('click')

    expect(mockDispatch).toHaveLastReturnedWith('CLOSE_MODAL')
  })

  test('Click inside modal inner stops propegation and no action fired', () => {
    const node = findByTest(wrapper, 'modal-inner')
    const stopPropagation = jest.fn()
    node.first().simulate('click', { stopPropagation })

    expect(mockDispatch.mock.calls.length).toBe(0)
    expect(stopPropagation.mock.calls.length).toBe(1)
  })
})


