import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import Context from '../store/Context'

const SearchForm = props => {
  const { results: { dispatch } } = useContext(Context)
  const [inputValue, setInputValue] = useState('')
  
  const handleSubmit = async e => {
    // TODO: Refactor this in to a custom hook
    e.preventDefault()
    dispatch({ type: 'SET_REULTS_SEARCH_QUERY', payload: inputValue })
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

  input, button {
    border: 1px solid ${p => p.theme.colors.opaqueGrey};
    background: ${p => p.theme.colors.white};

    // Wouldn't do this in the real world (A11Y)
    &:focus { outline: none; }
  }

  input {
    padding: 15px 25px;
    width: 325px;
  }

  button {
    width: 95px;
    font-weight: bold;
    text-transform: uppercase;
    padding: 15px 0;
    text-align: center;
    border-left: none;
    cursor: pointer;
  }
`

export default SearchForm