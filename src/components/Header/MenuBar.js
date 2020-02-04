import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

import { useUserContext } from '../../context/user/UserContext'
import Loading from '../common/Loading'

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
      {state.loading ? (
        <Loading noStyle={true}/>
      ) : (   
        <a href={loginUrl}>Login</a>
      )}
    </>

  const UserMenu = () => 
    <span>
      Hi {state.name}
      <button onClick={handleLogout}>
        Logout
      </button>
      {pathname.includes('/favourites')
        ? <Link to="/">Home</Link>
        : <Link to="/favourites">My Favourites</Link>
      }
    </span>

  const GetComponent = () => {
    if(state.error) return <Login />
    if(state.hasCheckedAuth && !state.id) return <Login />
    if(state.hasCheckedAuth && state.id) return <UserMenu />
    return <div></div>
  }
  
  return (
    <Bar
      backgroundColor='bluePurple'
      lightText
    >
      <GetComponent />
    </Bar>
  )
}

const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 5px 0;
  text-align: right;
  font-size: 13px;
  color: ${p => p.theme.colors.white};
  
  div{ 
    min-height: 26.667px;
  }

  a {
    color: ${p => p.theme.colors.white};
    padding-left: 10px;

    &:hover {
      text-decoration: none;
    }
  }

  button {
    background: none;
    border: none;
    color: #fff;
    text-decoration: underline;
    cursor: pointer;
    font-size: 13px;

    &:hover {
      text-decoration: none;
    }
  }
`

export default MenuBar