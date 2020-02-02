import api from './api'

const authenticate = async (userDispatch) => {
  const jwt = localStorage.token 
  if(jwt) return getUserProfile(userDispatch)

  const params = new URLSearchParams(window.location.search) 
  if(!params.has('code')) return undefined

  try {
    const token = await api.getAuthToken(params.get('code'))
    localStorage.setItem('token', JSON.stringify(token))
    getUserProfile(userDispatch)
  } catch(e) {
    // TODO: dispatch error getting token
    console.error(e)
  }
}

const getUserProfile = async (userDispatch, token) => {
  try {
    userDispatch({ type: 'SET_USER_LOADING' })
    const profile = await api.getProfile(token)
    userDispatch({ type: 'SET_USER_PROFILE', payload: profile })
  } catch(e) {
    // TODO: dispatch login error
    console.error(e)
  }
}   

export default authenticate