import React from 'react'
import { shallow } from 'enzyme'

import { findByTest } from '../../../test/testUtils' 
import Heart from '../Heart'

const mockOnClick = jest.fn()

const init = () => shallow(
  <Heart onClick={mockOnClick} />
)

beforeEach(() => mockOnClick.mockClear())

test('Component Renders', () => {
  const wrapper = init()
  const node = findByTest(wrapper, 'component-heart')
  expect(node.exists()).toBe(true)
})

test('click on component fires handler', () => {
  const wrapper = init()
  const node = findByTest(wrapper, 'component-heart')
  node.simulate('click')
  expect(mockOnClick.mock.calls.length).toBe(1)
})