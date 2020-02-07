import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

import Footer from './Footer'

Enzyme.configure({ adapter: new EnzymeAdapter() })

test('renders without errors', () => {
  const wrapper = shallow(<Footer />)
  const email = wrapper.find('[data-test="component-footer"]')
  expect(email.length).toBe(1)
})

test('Renders email', () => {
  const wrapper = shallow(<Footer />)
  const email = wrapper.find('[data-test="email"]')
  expect(email.length).toBe(1)
})