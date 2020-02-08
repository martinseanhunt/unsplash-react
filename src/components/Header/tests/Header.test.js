import React from 'react'
import { shallow } from 'enzyme'

import { findByTest } from '../../../test/testUtils' 
import Header from '../Header'

const init = props => shallow(<Header {...props} />)

test('Header renders component without crashing', () => {
  const wrapper = init()
  const component = findByTest(wrapper, 'component-header')
  expect(component.length).toBe(1)
})

test('renders menu', () => {
  const wrapper = init()
  const node = findByTest(wrapper, 'menu')
  expect(node.length).toBe(1)
})

test('renders shapes', () => {
  const wrapper = init()
  const node = findByTest(wrapper, 'shapes')
  expect(node.length).toBe(1)
})

test('renders form', () => {
  const wrapper = init()
  const node = findByTest(wrapper, 'form')
  expect(node.length).toBe(1)
})