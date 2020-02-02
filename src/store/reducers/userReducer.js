const userDefaultState = {
  hasCheckedAuth: false,
  error: null
}

const userReducer =(state,{type, payload}) => {
  switch(type) {
    case 'SET_USER_CHECKED_AUTH':
      return {
        ...state,
        hasCheckedAuth: true,
        error: null
      }
    case 'SET_USER_PROFILE': 
      return {
        ...state,
        ...payload,
        loading: false,
        error: null
      }
    case 'SET_USER_LOADING':
      return {
        ...state,
        loading: true,
        error: null
      }
    case 'SET_USER_ERROR':
      return {
        hasCheckedAuth: false,
        error: payload,
        loading: false
      }
    case 'USER_LOGOUT':
      return {
        hasCheckedAuth: true
      }
    default:
      return state
  }
}

export default userReducer
export { userDefaultState }