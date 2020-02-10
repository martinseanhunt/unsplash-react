import React from 'react'
import { shallow } from 'enzyme'

import { findByTest } from '../../../test/testUtils' 
import Header from '../Header'

const init = () => shallow(<Header />)

test('Header renders component without crashing', () => {
  const wrapper = init()
  const component = findByTest(wrapper, 'component-header')
  expect(component.exists()).toBe(true)
})

test('renders menu', () => {
  const wrapper = init()
  const node = findByTest(wrapper, 'menu')
  expect(node.exists()).toBe(true)
})

test('renders shapes', () => {
  const wrapper = init()
  const node = findByTest(wrapper, 'shapes')
  expect(node.exists()).toBe(true)
})

test('renders search form', () => {
  const wrapper = init()
  const node = findByTest(wrapper, 'form')
  expect(node.exists()).toBe(true)
})