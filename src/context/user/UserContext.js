import React, { useContext, createContext, useReducer, useMemo } from 'react'

import userReducer, { initialState } from './userReducer'

const UserContext = createContext()
const useUserContext = () => useContext(UserContext)

const UserContextProvider = props => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  const value = useMemo(() => ({
    state,
    dispatch
  }), [
    state, 
    dispatch
  ])

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
export { useUserContext }