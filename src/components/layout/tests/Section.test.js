import React from 'react'
import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'

import theme from '../../../globalstyles/theme'
import { findByTest } from '../../../test/testUtils' 
import Section from '../Section'

const init = () => mount(
  <ThemeProvider theme={theme}>
    <Section />
  </ThemeProvider>
)

test('Renders component without crashing', () => {
  const wrapper = init()
  const component = findByTest(wrapper, 'component-section')
  expect(component.exists()).toBe(true)
})
