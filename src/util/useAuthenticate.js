import { useEffect, useState } from 'react'

import api from './api'

const useAuthenticate = (dispatch) => {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // TODO: Check this only runs once
    const params = new URLSearchParams(window.location.search) 
    const authCode = params.get('code')
    const { token, user } = localStorage

    const initialize = () => {
      setInitialized(true)
      dispatch({ type: 'SET_USER_CHECKED_AUTH' })
    }

    const getUserProfile = async () => {      
      // There's a user object in localStorage, use that
      if(user && token) {
        dispatch({
          type: 'SET_USER_PROFILE', 
          payload: JSON.parse(user) 
        })
        initialize()
        return null
      }
      
      // No local user so get user from API
      try {
        const profile = await api.getProfile(token)
        dispatch({ type: 'SET_USER_PROFILE', payload: profile })
        localStorage.setItem('user', JSON.stringify(profile))
        initialize()
      } catch(e) {
        handleError(e)
      }
    }

    const handleAuthToken = async () => {
      try {
        const jwt = await api.getJWT(authCode)
        localStorage.setItem('token', JSON.stringify(jwt))
        getUserProfile()
      } catch(e) {
        handleError(e)
      }
    }

    const handleError = e => dispatch({ type: 'SET_USER_ERROR', payload: e })

    dispatch({ type: 'SET_USER_LOADING' })
    if(token) {
      // If we have a jwt in localStorage get the user profile
      getUserProfile()
    } else if(authCode) {
      // If we have an authcode in the query string then use it to 
      // generate a JWT then get the profile
      handleAuthToken()
    } else {
      // We're logged out
      initialize()
    }
  }, [dispatch])

  return initialized
}

export default useAuthenticate