import React from 'react'
import { shallow } from 'enzyme'

import { findByTest } from '../../../test/testUtils' 
import Loading from '../Loading'

const init = props => shallow(<Loading {...props} />)


test('styled loading compnent is rendered if not told to behave otehrwise', () => {
  const wrapper = init()
  const component = findByTest(wrapper, 'component-styled-loading')
  expect(component.length).toBe(1)
})

test('simple span is rendered if given noStyle prop', () => {
  const wrapper = init({ noStyle: true })
  const component = findByTest(wrapper, 'component-styled-loading')
  expect(component.length).toBe(0)
})

test('loading text is displayed if no text prop', () => {
  const wrapper = init()
  const span = findByTest(wrapper, 'loading')
  const loadingText = span.text().toLowerCase()
  expect(loadingText).toEqual(expect.stringContaining('loading'))
})

test('given text is displayed if text prop supplied', () => {
  const wrapper = init({ text: 'grumble' })
  const span = findByTest(wrapper, 'loading')
  const loadingText = span.text().toLowerCase()
  expect(loadingText).toEqual(expect.stringContaining('grumble'))
})