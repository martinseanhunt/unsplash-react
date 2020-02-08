import React from 'react'
import { shallow } from 'enzyme'

import { findByTest } from '../../../test/testUtils' 
import AnimatedShapes from '../AnimatedShapes'

const init = props => shallow(<AnimatedShapes {...props} />)

let wrapper
beforeEach(() => wrapper = init())

test('compnent is rendered', () => {
  const component = findByTest(wrapper, 'component-animated-shapes')
  expect(component.length).toBe(1)
})