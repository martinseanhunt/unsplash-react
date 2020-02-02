const userDefaultState = {}

const userReducer =(state,{type, payload}) => {
  switch(type) {
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
      return userDefaultState
    default:
      return state
  }
}

export default userReducer
export { userDefaultState }