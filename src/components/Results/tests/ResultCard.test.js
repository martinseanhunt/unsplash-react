import React from 'react'
import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'

import theme from '../../../globalstyles/theme'
import { findByTest } from '../../../test/testUtils' 
import exampleResult from '../../../test/exampleResult'
import ResultCard from '../ResultCard'

const mockHandleLikePhoto = jest.fn()
const mockHandleUnlikePhoto = jest.fn()
const mockOpenModal = jest.fn()

const defaultProps = {
  result: exampleResult,
  user: {},
  isFavouritesPage: false,
  openModal: mockOpenModal,
  handleLikePhoto: mockHandleLikePhoto,
  handleUnlikePhoto: mockHandleUnlikePhoto
}

const init = (props) => {
  const componentProps = {
    ...defaultProps,
    ...props
  }
  return mount(
    <ThemeProvider theme={theme}>
      <ResultCard {...componentProps} />
    </ThemeProvider>
  )
}

beforeEach(() => {
  mockHandleLikePhoto.mockClear()
  mockHandleUnlikePhoto.mockClear()
  mockOpenModal.mockClear()
})

test('Component Renders', () => {
  const wrapper = init()
  const node = findByTest(wrapper, 'component-result-card')
  expect(node.exists()).toBe(true)
})

test('clicking image calls open modal with result id', () => {
  const wrapper = init()
  const node = findByTest(wrapper, 'card-image')
  node.props().onClick()
  expect(mockOpenModal).toHaveBeenLastCalledWith(exampleResult.id)
})

describe('no authed user', () => {
  test('Doesnt render heart icon', () => {
    const wrapper = init()
    const node = findByTest(wrapper, 'heart-icon')
    expect(node.exists()).toBe(false)
  })
})


describe('authed user', () => {
  const liked = { 
    user: { id: 123 },
    result: {
      ...exampleResult,
      liked_by_user: true
    }
  }

  const unliked = {
    ...liked, 
    result: { ...liked.result, liked_by_user: false }
  }
  

  test('renders heart icon', () => {
    const wrapper = init({ user: { id: 123 } })
    const node = findByTest(wrapper, 'heart-icon')
    expect(node.exists()).toBe(true)
  })

  test('if result is liked by user, clicking heart calls handleUnlikePhoto', () => {
    const wrapper = init(liked)
    const node = findByTest(wrapper, 'heart-icon')
    node.simulate('click')
    expect(mockHandleUnlikePhoto).toHaveBeenLastCalledWith(exampleResult.id)
  })

  test('if result is not liked by user, clicking heart calls handleLikePhoto', () => {
    const wrapper = init(unliked)
    const node = findByTest(wrapper, 'heart-icon')
    node.simulate('click')
    expect(mockHandleLikePhoto).toHaveBeenLastCalledWith(exampleResult.id)
  })

  test('clicking the heart icon gives it a classname of clicked', () => {
    const wrapper = init(unliked)
    const node = findByTest(wrapper, 'heart-icon')
    node.simulate('click')
    const classes = findByTest(wrapper, 'heart-icon').props().className
    expect(classes).toEqual(expect.stringContaining('clicked'))
  })

  test('if result is liked by user has icon has class of faved', () => {
    const wrapper = init(liked)
    const node = findByTest(wrapper, 'heart-icon')
    expect(node.props().className).toEqual(expect.stringContaining('faved'))
  })

  test('if result is not liked by user has icon does not have class of faved', () => {
    const wrapper = init(unliked)
    const node = findByTest(wrapper, 'heart-icon')
    expect(node.props().className).toEqual(expect.not.stringContaining('faved'))
  })
})
