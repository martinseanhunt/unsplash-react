import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Form from './styles/Form'

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
        width="0"
      />
      <button>Search</button>
    </Form>
  )
}

export default SearchForm