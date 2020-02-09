import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { findByTest } from '../../../test/testUtils' 
import PreloadImg from '../PreloadImg'

const defaultProps = {
  src: 'https://images.unsplash.com/photo-1581084324492-c8076f130f86?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjExMzU0Mn0',
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
    I don't know that this is the best solution as it's obviously brittle
    and dependant both on the image I'm passing still existing and it loading in a 
    reasonable time. But it's the only solution I have at this point
  */
  await act(async () => await new Promise((r) => setTimeout(r, 2000)))

  // have to simulate something or we can't see the update 
  // even after state change
  wrapper.simulate('click')
  const node = findByTest(wrapper, 'loaded')
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


