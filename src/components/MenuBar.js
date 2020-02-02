import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

import Context from '../store/Context'
import Section from './layout/Section'

const loginUrl = `https://unsplash.com/oauth/authorize?client_id=${process.env.REACT_APP_UNSPLASH_API}&redirect_uri=${encodeURIComponent('http://localhost:3000/')}&response_type=code&scope=public+read_user+write_user+read_photos+write_photos+write_likes+read_collections+write_collections`

const MenuBar = props => {
  const { user: { state, dispatch } } = useContext(Context)
  const { pathname } = useLocation()

  const handleLogout = e => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch({ type: 'USER_LOGOUT' })
  }

  // TODO: Stop flicker of login while authenticating
  
  return (
    <Bar
      backgroundColor='bluePurple'
      lightText
    >
      {state.hasCheckedAuth ? (
        <>
          {state.id ? (
            <span>
              Hi {state.name}
              <button onClick={handleLogout}>
                Logout
              </button>
              {pathname.includes('/favorites')
                ? <Link to="/">Home</Link>
                : <Link to="/favorites">My Favorites</Link>
              }
              
            </span>
          ) : (
            <>
              {state.loading ? (
                <span>Loading...</span>
              ) : (   
                <a href={loginUrl}>Login</a>
              )}
            </>
          )}
        </>
      ) : ( <span>...</span> )}

    </Bar>
  )
}

const Bar = styled(Section)`
  padding: 5px 0;
  text-align: right;
  font-size: 13px;

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