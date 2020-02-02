import api from './api'

// TODO: Change this in to hook then can use params, history from router an don't need to 
// pass dispatch

const authenticate = async (userDispatch) => {
  const jwt = localStorage.token 
  if(jwt) {
    getUserProfile(userDispatch)
    userDispatch({ type: 'SET_USER_CHECKED_AUTH' })
    return 
  } 

  const params = new URLSearchParams(window.location.search) 
  if(!params.has('code')) return userDispatch({ type: 'SET_USER_CHECKED_AUTH' })

  try {
    const token = await api.getAuthToken(params.get('code'))
    localStorage.setItem('token', JSON.stringify(token))
    getUserProfile(userDispatch)
    userDispatch({ type: 'SET_USER_CHECKED_AUTH' })
  } catch(e) {
    // TODO: dispatch error getting token
    console.error(e)
  }
  
}

const getUserProfile = async (userDispatch, token) => {
  userDispatch({ type: 'SET_USER_LOADING' })

  const localUser = localStorage.user

  if(localUser && localStorage.token) 
    return userDispatch({ 
      type: 'SET_USER_PROFILE', 
      payload: JSON.parse(localUser) 
    })

  try {
    const profile = await api.getProfile(token)
    userDispatch({ type: 'SET_USER_PROFILE', payload: profile })
    localStorage.setItem('user', JSON.stringify(profile))
  } catch(e) {
    // TODO: dispatch login error
    console.error(e)
  }
}   

export default authenticate