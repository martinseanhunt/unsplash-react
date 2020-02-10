import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { findByTest } from '../../../test/testUtils' 
import PreloadImg from '../PreloadImg'

const HTTP_SERVER_URL = process.env.HTTP_SERVER_URL || 'http://localhost:3080/'

const defaultProps = {
  src: HTTP_SERVER_URL + 'img/testImg.jpg',
  loadingText: 'heloooo'
}

const init = props => {
  const componentProps = {
    ...defaultProps,
    ...props
  }
  return mount(<PreloadImg {...componentProps} />)
}

test('Renders the image component when loaded', async () => {
  const wrapper = init()

  /* 
    NOTE: Waiting to give the image time to load because I can't listen  
    for when the onload event is fired within the useEffect hook.
    I don't know that this is the best solution as it's too reliant on a
    local http server and I don't like having to waiting for the useEffect
    to run and the image to have been loaded. 
    But it's the only solution I have at this point
  */
  await act(async () => await new Promise((r) => setTimeout(r, 1000)))

  // have to simulate something or we can't see the update 
  // even after state change
  wrapper.simulate('click')
  const node = findByTest(wrapper, 'loaded')

  if(!node.exists()) {
    console.warn(`
      PLEASE MAKE SURE THE TEST HTTP SERVER IS RUNNING WITH "npm run httpserver"
      or this test will always fail as it relies on a locally served image. 
      Running the two scripts concurrently from package.json causes issues with 
      watching for updates
    `)
  }

  expect(node.exists()).toBe(true) 
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


