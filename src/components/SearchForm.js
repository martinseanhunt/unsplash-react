import React, { useContext, useState } from 'react'
import Context from '../store/Context'

export default props => {
  const { search: { dispatch } } = useContext(Context)
  const [inputValue, setInputValue] = useState('')
  
  const handleSubmit = async e => {
    // TODO: Refactor this in to a custom hook
    e.preventDefault()
    dispatch({ type: 'SET_SEARCH_QUERY', payload: inputValue })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="search" 
        type="text" 
        placeholder="Find images of..."
        onChange={e => setInputValue(e.target.value)}  
      />
      <button>Submit</button>
    </form>
  )
}