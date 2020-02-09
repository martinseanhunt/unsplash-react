import React from 'react'
import { shallow } from 'enzyme'

import { findByTest } from '../../../test/testUtils' 
import Error from '../Error'

const init = props => shallow(<Error {...props} />)

describe('If noStyle prop not passed', () => {
  let wrapper
  beforeEach(() => wrapper = init({ error: 'we got a prob' }))

  test('styled error compnent is rendered', () => {
    const component = findByTest(wrapper, 'styled-error')
    expect(component.exists()).toBe(true)
  })

  test('unstyled error compnent is not rendered', () => {
    const component = findByTest(wrapper, 'unstyled-error')
    expect(component.exists()).toBe(false)
  })

  test('renders error messaga', () => {
    const span = findByTest(wrapper, 'styled-error')
    const errorText = span.text().toLowerCase()
    expect(errorText).toEqual(expect.stringContaining('we got a prob'))
  })
})


describe('If noStyle prop passed', () => {
  let wrapper
  beforeEach(() => wrapper = init({ 
    error: 'err nerr!',
    noStyle: true
  }))

  test('styled error compnent is not rendered', () => {
    const component = findByTest(wrapper, 'styled-error')
    expect(component.exists()).toBe(false)
  })

  test('unstyled error compnent is rendered', () => {
    const component = findByTest(wrapper, 'unstyled-error')
    expect(component.exists()).toBe(true)
  })

  test('renders error messaga', () => {
    const span = findByTest(wrapper, 'unstyled-error')
    const errorText = span.text().toLowerCase()
    expect(errorText).toEqual(expect.stringContaining('err nerr!'))
  })
})
