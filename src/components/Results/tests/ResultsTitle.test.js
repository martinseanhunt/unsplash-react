import React from 'react'
import { shallow } from 'enzyme'

import { findByTest } from '../../../test/testUtils' 
import ResultsTitle from '../ResultsTitle'

const init = (props) => shallow(
  <ResultsTitle {...props} />
)

test('Component Renders', () => {
  const wrapper = init()
  const node = findByTest(wrapper, 'component-results-title')
  expect(node.exists()).toBe(true)
})

test('returns search results title if query', () => {
  const wrapper = init({ searchQuery: 'cute dogs' })
  const node = findByTest(wrapper, 'component-results-title')
  expect(node.text()).toEqual(expect.stringContaining('cute dogs'))
})

test('returns my favorites if is favourites', () => {
  const wrapper = init({ isFavourites: true })
  const node = findByTest(wrapper, 'component-results-title')
  expect(node.text().toLowerCase()).toEqual(expect.stringContaining('favourites'))
})

test('returns latest photos by default', () => {
  const wrapper = init()
  const node = findByTest(wrapper, 'component-results-title')
  expect(node.text().toLowerCase()).toEqual(expect.stringContaining('latest photos'))
})