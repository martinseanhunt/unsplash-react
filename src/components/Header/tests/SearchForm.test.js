import React from 'react'
import { shallow } from 'enzyme'

import { findByTest } from '../../../test/testUtils' 
import SearchForm from '../SearchForm'

const mockHistoryPush = jest.fn((path) => path)
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

const init = props => shallow(<SearchForm {...props} />)

let wrapper
beforeEach(() => {
  mockHistoryPush.mockClear()
  wrapper = init()
})

test('renders without errors', () => {
  const component = findByTest(wrapper, 'component-search-form')
  expect(component.length).toBe(1)
})

test('renders an input', () => {
  const input = findByTest(wrapper, 'input')
  expect(input.length).toBe(1)
})

test('input value udpates on change', () => {
  const input = findByTest(wrapper, 'input')
  const mockEvent = { target: { value: 'adventure' } }
  input.simulate('change', mockEvent)
  expect(findByTest(wrapper, 'input').props().value).toBe('adventure')
})

test('sumbitting form triggers push to history with expected URI', () => {
  const input = findByTest(wrapper, 'input')
  const mockEvent = { target: { value: 'grog' } }
  input.simulate('change', mockEvent)

  const form = findByTest(wrapper, 'component-search-form')
  form.simulate('submit', { preventDefault: () => null })

  expect(mockHistoryPush.mock.calls[0][0]).toEqual(expect.stringContaining('grog'))
})