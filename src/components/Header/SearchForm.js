import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Form from './styles/Form'

const SearchForm = props => {
  const [inputValue, setInputValue] = useState('')
  const history = useHistory()
  
  const handleSubmit = e => {
    e.preventDefault()
    history.push(`/?page=1&query=${inputValue}`)
  }

  return (
    <Form 
      onSubmit={handleSubmit}
      data-test='component-search-form'
    >
      <input 
        name="search" 
        type="text" 
        placeholder="Find images of..."
        onChange={e => setInputValue(e.target.value)}  
        width="0"
        data-test="input"
        value={inputValue}
      />
      <button>Search</button>
    </Form>
  )
}

export default SearchForm