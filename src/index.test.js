import React from 'react'
import { mount } from 'enzyme'

import { findByTest } from './test/testUtils'
import Index from './index'

jest.mock('react-dom', () => ({
  render: jest.fn(),
}))

const init = props => mount(<Index {...props} />)

let wrapper
beforeEach(() => {
  wrapper = init()
})

test('Entire app without crashing', () => {
  const component = findByTest(wrapper, 'component-app')
  expect(component.exists()).toBe(true)
})