import React from 'react'
import { shallow } from 'enzyme'

import { findByTest } from '../../../test/testUtils' 
import Footer from '../Footer'

const init = props => shallow(<Footer {...props} />)

let wrapper
beforeEach(() => wrapper = init())

test('renders without errors', () => {
  const component = findByTest(wrapper, 'component-footer')
  expect(component.length).toBe(1)
})

test('Shows valid email', () => {
  const emailText = findByTest(wrapper, 'email').text()
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailText)
  expect(validEmail).toBeTruthy()
})

test('Shows logo', () => {
  const logo = findByTest(wrapper, 'logo')
  expect(logo.length).toBe(1)
})