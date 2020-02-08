import React from 'react'
import { shallow } from 'enzyme'

import { findByTest } from '../../../test/testUtils' 
import SearchForm from '../SearchForm'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

const init = props => shallow(<SearchForm {...props} />)

describe('testing with real useState', () => {
  let wrapper
  beforeEach(() => {
    mockHistoryPush.mockClear()
    wrapper = init()
  })
  
  test('renders without errors', () => {
    const component = findByTest(wrapper, 'component-search-form')
    expect(component.length).toBe(1)
  })
  
  test('renders an input', () => {
    const input = findByTest(wrapper, 'input')
    expect(input.length).toBe(1)
  })

  test('input value udpates on change', () => {
    const input = findByTest(wrapper, 'input')
    const mockEvent = { target: { value: 'adventure' } }
    input.simulate('change', mockEvent)
    expect(findByTest(wrapper, 'input').props().value).toBe('adventure')
  })

  test('sumbitting form triggers push to history with expected URI', () => {
    const input = findByTest(wrapper, 'input')
    const mockEvent = { target: { value: 'grog' } }
    input.simulate('change', mockEvent)

    const form = findByTest(wrapper, 'component-search-form')
    form.simulate('submit', { preventDefault: () => null })

    /* 
      Note:  This feels a bit fragile... How could I check if the function had 
      been called witha string that contains 'grog' rather than the whole
      path and query
    */
    expect(mockHistoryPush).toHaveBeenCalledWith('/?page=1&query=grog')
  })
})


/* 
  Note: I don't think this is the best way to go because we can't test
  the updated component UI... Just playing around with this

  Commenting it out so I can contiune to destructure useState in the
  component and not have to use React.useState

    describe('testing with mocked useState', () => {
      test('state setter is called with value on input change', () => {
        const mockSetInputValue = jest.fn()
        React.useState = jest.fn(() => ['', mockSetInputValue])

        const wrapper = init()

        const input = findByTest(wrapper, 'input')
        const mockEvent = { target: { value: 'noodles' } }
        input.simulate('change', mockEvent)

        expect(mockSetInputValue).toHaveBeenCalledWith('noodles')
      })
    })

*/