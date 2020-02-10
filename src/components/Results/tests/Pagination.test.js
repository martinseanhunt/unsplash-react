import React from 'react'
import { shallow } from 'enzyme'

import { findByTest } from '../../../test/testUtils' 
import Pagination from '../Pagination'

const mockHandleChangePage = jest.fn()

const defaultProps = {
  page: 1,
  totalPages: null,
  handleChangePage: mockHandleChangePage,
  pageLength: 12
}

const init = (props) => {
  const componentProps = {
    ...defaultProps,
    ...props
  }
  return shallow(<Pagination {...componentProps} />)
}

beforeEach(() => mockHandleChangePage.mockClear())

test('Component Renders', () => {
  const wrapper = init()
  const node = findByTest(wrapper, 'component-pagination')
  expect(node.exists()).toBe(true)
})

describe('pages count', () => {
  test('should display given count and page', () => {
    const wrapper = init({ page: 1, pageLength: 12, totalPages: 100 })
      const node = findByTest(wrapper, 'pages-count')
      expect(node.text()).toEqual(expect.stringMatching('page 1 of 100'))
  })

  test('should be hidden if no totalpages prop', () => {
    const wrapper = init({ page: 1, pageLength: 12 })
    const node = findByTest(wrapper, 'pages-count')
    expect(node.exists()).toBe(false)
  })
  
  test('should be shown if totalpages prop', () => {
    const wrapper = init({ page: 1, pageLength: 12, totalPages: 100 })
    const node = findByTest(wrapper, 'pages-count')
    expect(node.exists()).toBe(true)
  })  
})

describe('back button ', () => {
  test('should render if page > 1', () => {
    const wrapper = init({ page: 3 })
    const node = findByTest(wrapper, 'prev-button')
    expect(node.exists()).toBe(true)
  })
  
  test('should be hidden if !page > 1', () => {
    const wrapper = init({ page: 1 })
    const node = findByTest(wrapper, 'prev-button')
    expect(node.exists()).toBe(false)
  })

  test('should call handler with -1 when click prev', () => {
    const wrapper = init({ page: 3 })
    const node = findByTest(wrapper, 'prev-button')
    node.simulate('click')
    expect(mockHandleChangePage).toHaveBeenLastCalledWith(-1)
  })
})

describe('next button', () => {
  test('should call handler with 1 when clicked', () => {
    const wrapper = init({ page: 3 })
    const node = findByTest(wrapper, 'next-button')
    node.simulate('click')
    expect(mockHandleChangePage).toHaveBeenLastCalledWith(1)
  })
  
  test('should render if totalPages > current page', () => {
    const wrapper = init({ page: 100, totalPages: 104 })
    const node = findByTest(wrapper, 'next-button')
    expect(node.exists()).toBe(true)
  })
  
  test('should be hidden if youre on the last page', () => {
    const wrapper = init({ page: 104, totalPages: 104 })
    const node = findByTest(wrapper, 'next-button')
    expect(node.exists()).toBe(false)
  })
  
  test('should be hidden if youre on the last page', () => {
    const wrapper = init({ page: 104, totalPages: 104 })
    const node = findByTest(wrapper, 'next-button')
    expect(node.exists()).toBe(false)
  })
  
  test('should be hidden if youre page > last page', () => {
    const wrapper = init({ page: 114, totalPages: 104 })
    const node = findByTest(wrapper, 'next-button')
    expect(node.exists()).toBe(false)
  })
  
  test('should be hidden if results on page < 12', () => {
    const wrapper = init({ page: 1, pageLength: 10 })
    const node = findByTest(wrapper, 'next-button')
    expect(node.exists()).toBe(false)
  })
  
  test('should render if results on page >= 12', () => {
    const wrapper = init({ page: 1, pageLength: 12 })
    const node = findByTest(wrapper, 'next-button')
    expect(node.exists()).toBe(true)
  })  
})

