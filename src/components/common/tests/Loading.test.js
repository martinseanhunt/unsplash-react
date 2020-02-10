import React from 'react'
import { shallow } from 'enzyme'

import { findByTest } from '../../../test/testUtils' 
import Loading from '../Loading'

const init = props => shallow(<Loading {...props} />)

describe('if noStyle prop is not passed', () => {
  test('styled loading compnent is rendered', () => {
    const wrapper = init()
    const component = findByTest(wrapper, 'component-styled-loading')
    expect(component.exists()).toBe(true)
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
})

describe('if noStyle prop is passed', () => {
  test('unstyled span is rendered', () => {
    const wrapper = init({ noStyle: true })
    const component = findByTest(wrapper, 'component-styled-loading')
    expect(component.exists()).toBe(false)
  })

  test('loading text is displayed if no text prop', () => {
    const wrapper = init({ noStyle: true })
    const span = findByTest(wrapper, 'loading')
    const loadingText = span.text().toLowerCase()
    expect(loadingText).toEqual(expect.stringContaining('loading'))
  })
  
  test('given text is displayed if text prop supplied', () => {
    const wrapper = init({ noStyle: true, text: 'grumble' })
    const span = findByTest(wrapper, 'loading')
    const loadingText = span.text().toLowerCase()
    expect(loadingText).toEqual(expect.stringContaining('grumble'))
  })
})
