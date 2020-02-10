import React from 'react'
import { mount } from 'enzyme'

import { findByTest } from '../../../test/testUtils' 
import PreloadImg from '../PreloadImg'

const defaultProps = {
  src: 'someFakeImageUrl.jpg',
  loadingText: 'heloooo'
}

const init = props => {
  const componentProps = {
    ...defaultProps,
    ...props
  }
  return mount(<PreloadImg {...componentProps} />)
}

/*
  NOTE: I ended up changing how the preloading component
  was working in order to make testing the onload event 
  more reliable and less brittle... 
  I actually much prefer how the component is working now too.
  It does the same thing in a much simpler way.
  
  Happy with this now!
*/

describe('when image is loaded', () => {
  test('Shows the image', () => {
    const wrapper = init()
    const image = findByTest(wrapper, 'image')
    image.simulate('load')
    const node = findByTest(wrapper, 'image-loaded')
    expect(node.exists()).toBe(true) 
  })

  test('Hides loading component', () => {
    const wrapper = init()
    const image = findByTest(wrapper, 'image')
    image.simulate('load')
    const node = findByTest(wrapper, 'loading')
    expect(node.exists()).toBe(false) 
  })
})


describe('when loading', () => { 
  test('Loading component is rendered', () => {
    const wrapper = init()
    const node = findByTest(wrapper, 'loading')
    expect(node.exists()).toBe(true)
  })
  
  test('loading component displays correct text', () => {
    const wrapper = init()
    const node = findByTest(wrapper, 'loading')
    expect(node.first().text()).toEqual(expect.stringContaining(defaultProps.loadingText))
  })
})


