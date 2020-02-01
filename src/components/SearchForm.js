import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import Context from '../store/Context'

const SearchForm = props => {
  const { search: { dispatch } } = useContext(Context)
  const [inputValue, setInputValue] = useState('')
  
  const handleSubmit = async e => {
    // TODO: Refactor this in to a custom hook
    e.preventDefault()
    dispatch({ type: 'SET_SEARCH_QUERY', payload: inputValue })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <input 
        name="search" 
        type="text" 
        placeholder="Find images of..."
        onChange={e => setInputValue(e.target.value)}  
      />
      <button>Submit</button>
    </Form>
  )
}

const Form = styled.form`
  opacity: 0.9;

  input {
    padding: 15px 25px;
    border: 1px solid ${p => p.theme.colors.opaqueGrey};
    width: 325px;
  }

  button {
    width: 95px;
    font-weight: bold;
    text-transform: uppercase;
    padding: 15px 0;
    text-align: center;
    background: ${p => p.theme.colors.white};
    border: 1px solid ${p => p.theme.colors.opaqueGrey};
    border-left: none;
    cursor: pointer;
  }
`

export default SearchForm