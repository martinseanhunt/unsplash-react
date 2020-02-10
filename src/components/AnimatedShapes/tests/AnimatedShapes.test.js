import React from 'react'
import { shallow } from 'enzyme'

import { findByTest } from '../../../test/testUtils' 
import AnimatedShapes from '../AnimatedShapes'

const init = props => shallow(<AnimatedShapes {...props} />)

test('compnent is rendered', () => {
  const wrapper = init()
  const component = findByTest(wrapper, 'component-animated-shapes')
  expect(component.exists()).toBe(true)
})