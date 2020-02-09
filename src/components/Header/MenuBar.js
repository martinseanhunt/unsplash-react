import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useUserContext } from '../../context/user/UserContext'
import Loading from '../common/Loading'
import Bar from './styles/Bar'

const loginUrl = `https://unsplash.com/oauth/authorize?client_id=${process.env.REACT_APP_UNSPLASH_API}&redirect_uri=${encodeURIComponent(process.env.REACT_APP_FRONTEND_URL)}&response_type=code&scope=public+read_user+write_user+read_photos+write_photos+write_likes+read_collections+write_collections`

const MenuBar = props => {
  const { state, dispatch } = useUserContext()
  const { pathname } = useLocation()

  const handleLogout = e => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch({ type: 'USER_LOGOUT' })
  }

  const Login = () => 
    <>
      {state.loading || (!state.hasCheckedAuth && !state.error) ? (
        <Loading noStyle={true} data-test='loading'/>
      ) : (   
        <a href={loginUrl} data-test='login-link'>Login</a>
      )}
    </>

  const UserMenu = () => 
    <span data-test='user-menu'>
      Hi {state.name}
      <button onClick={handleLogout} data-test='logout-button'>
        Logout
      </button>
      {pathname.includes('/favourites')
        ? <Link to="/" data-test='home-link'>Home</Link>
        : <Link to="/favourites" data-test='faves-link'>My Favourites</Link>
      }
    </span>

  const GetComponent = () => {
    if(state.error || !state.hasCheckedAuth) return <Login />
    if(state.hasCheckedAuth && !state.id) return <Login />
    if(state.hasCheckedAuth && state.id) return <UserMenu />
    return null
  }
  
  return (
    <Bar
      backgroundColor='bluePurple'
      lightText
      data-test='component-menu-bar'
    >
      <GetComponent />
    </Bar>
  )
}

export default MenuBar