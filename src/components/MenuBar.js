import React, { useContext } from 'react'
import styled from 'styled-components'

import Context from '../store/Context'
import Section from './layout/Section'

const loginUrl = `https://unsplash.com/oauth/authorize?client_id=${process.env.REACT_APP_UNSPLASH_API}&redirect_uri=${encodeURIComponent('http://localhost:3000/login')}&response_type=code&sopepublic+read_user+write_user+read_photos+write_photos+write_likes+read_collections+write_collections`

const MenuBar = props => {
  const { user: { state, dispatch } } = useContext(Context)

  const handleLogout = e => {
    localStorage.removeItem('token')
    dispatch({ type: 'USER_LOGOUT' })
  }

  // TODO: Stop flicker of login while authenticating

  return (
    <Bar
      backgroundColor='bluePurple'
      lightText
    >
      {state.id ? (
        <span>
          Hi {state.name}
          <button onClick={handleLogout}>
            Logout
          </button>
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
    </Bar>
  )
}

const Bar = styled(Section)`
  padding: 5px 0;
  text-align: right;
  font-size: 13px;

  a {
    color: ${p => p.theme.colors.white};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
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