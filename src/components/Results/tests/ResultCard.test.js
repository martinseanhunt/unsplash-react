import React from 'react'
import { shallow } from 'enzyme'

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
  return shallow(<ResultCard {...componentProps} />)
}

beforeEach(() => jest.clearAllMocks())

describe('if there is no authed user', () => {
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

  test('Doesnt render heart icon', () => {
    const wrapper = init()
    const node = findByTest(wrapper, 'heart-icon')
    expect(node.exists()).toBe(false)
  })
})

describe('if there is an authed user and result is liked', () => {
  const likedResultState = { 
    user: { id: 123 },
    result: { ...exampleResult, liked_by_user: true }
  }

  test('Component Renders', () => {
    const wrapper = init(likedResultState)
    const node = findByTest(wrapper, 'component-result-card')
    expect(node.exists()).toBe(true)
  })
  
  test('clicking image calls open modal with result id', () => {
    const wrapper = init(likedResultState)
    const node = findByTest(wrapper, 'card-image')
    node.props().onClick()
    expect(mockOpenModal).toHaveBeenLastCalledWith(exampleResult.id)
  })

  test('renders heart icon', () => {
    const wrapper = init(likedResultState)
    const node = findByTest(wrapper, 'heart-icon')
    expect(node.exists()).toBe(true)
  })

  test('clicking heart calls handleUnlikePhoto', () => {
    const wrapper = init(likedResultState)
    const node = findByTest(wrapper, 'heart-icon')
    node.simulate('click')
    expect(mockHandleUnlikePhoto).toHaveBeenLastCalledWith(exampleResult.id)
  })

  test('clicking the heart icon gives it a classname of clicked', () => {
    const wrapper = init(likedResultState)
    const node = findByTest(wrapper, 'heart-icon')

    node.simulate('click')
    const classes = findByTest(wrapper, 'heart-icon').props().className
    expect(classes).toEqual(expect.stringContaining('clicked'))
  })

  test('heart icon has class of faved', () => {
    const wrapper = init(likedResultState)
    const node = findByTest(wrapper, 'heart-icon')
    expect(node.props().className).toEqual(expect.stringContaining('faved'))
  })
})

describe('if there is an authed user and result is unliked', () => {
  const unlikedResultState = {
    user: { id: 123 },
    result: { ...exampleResult, liked_by_user: false }
  }

  test('Component Renders', () => {
    const wrapper = init(unlikedResultState)
    const node = findByTest(wrapper, 'component-result-card')
    expect(node.exists()).toBe(true)
  })
  
  test('clicking image calls open modal with result id', () => {
    const wrapper = init(unlikedResultState)
    const node = findByTest(wrapper, 'card-image')
    node.props().onClick()
    expect(mockOpenModal).toHaveBeenLastCalledWith(exampleResult.id)
  })

  test('renders heart icon', () => {
    const wrapper = init(unlikedResultState)
    const node = findByTest(wrapper, 'heart-icon')
    expect(node.exists()).toBe(true)
  })
 
  test('clicking heart calls handleLikePhoto', () => {
    const wrapper = init(unlikedResultState)
    const node = findByTest(wrapper, 'heart-icon')
    node.simulate('click')
    expect(mockHandleLikePhoto).toHaveBeenLastCalledWith(exampleResult.id)
  })
  
  test('icon does not have class of faved', () => {
    const wrapper = init(unlikedResultState)
    const node = findByTest(wrapper, 'heart-icon')
    expect(node.props().className).toEqual(expect.not.stringContaining('faved'))
  })

  test('clicking the heart icon gives it a classname of clicked', () => {
    const wrapper = init(unlikedResultState)
    const node = findByTest(wrapper, 'heart-icon')

    node.simulate('click')
    const classes = findByTest(wrapper, 'heart-icon').props().className
    expect(classes).toEqual(expect.stringContaining('clicked'))
  })
})