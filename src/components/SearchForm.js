import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const SearchForm = props => {
  const [inputValue, setInputValue] = useState('')
  const history = useHistory()
  
  const handleSubmit = async e => {
    e.preventDefault()
    history.push(`/?page=1&query=${inputValue}`)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <input 
        name="search" 
        type="text" 
        placeholder="Find images of..."
        onChange={e => setInputValue(e.target.value)}  
      />
      <button>Search</button>
    </Form>
  )
}

const Form = styled.form`
  opacity: 0.9;

  input, button {
    border: 2px solid ${p => p.theme.colors.opaqueGrey};
    background: ${p => p.theme.colors.white};

    // Wouldn't do this in the real world (A11Y)
    &:focus { outline: none; }
  }

  input {
    padding: 19px 25px;
    width: 325px;
    font-size: 1.5rem;
  }

  button {
    font-weight: bold;
    text-transform: uppercase;
    padding: 20px 25px;
    text-align: center;
    border-left: none;
    cursor: pointer;
    font-size: 1.3rem;
  }
`

export default SearchForm