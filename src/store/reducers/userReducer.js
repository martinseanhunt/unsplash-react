const userDefaultState = {
  hasCheckedAuth: false
}

const userReducer =(state,{type, payload}) => {
  switch(type) {
    case 'SET_USER_CHECKED_AUTH':
      return {
        ...state,
        hasCheckedAuth: true
      }
    case 'SET_USER_PROFILE': 
      return {
        ...state,
        ...payload,
        loading: false
      }
    case 'SET_USER_LOADING':
      return {
        ...state,
        loading: true
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