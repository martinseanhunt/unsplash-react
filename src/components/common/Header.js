import React from 'react'
import styled from 'styled-components'

import Section from '../layout/Section'
import AnimatedShapes from './AnimatedShapes'
import SearchForm from '../SearchForm'

export default (props) => {
  const loginUrl = `https://unsplash.com/oauth/authorize?client_id=${process.env.REACT_APP_UNSPLASH_API}&redirect_uri=${encodeURIComponent('http://localhost:3000/login')}&response_type=code&sopepublic+read_user+write_user+read_photos+write_photos+write_likes+read_collections+write_collections`

  return(
    <header id="header">
      <MenuBar
        backgroundColor='darkGrey'
        lightText
      >
        <a href={loginUrl}>Login</a>
      </MenuBar>
      <Section 
        backgroundColor='bluePurple'
        lightText
      >
        <HeaderContent>
          <AnimatedShapes 
            width='300'
            height='300'
            maxDegreesY='30'
            maxDegreesX='45'
          />

          <FormContainer>
            <SearchForm />
          </FormContainer>
          
        </HeaderContent>
      </Section>
    </header>
  )
}

const HeaderContent = styled.div`
  height: 430px;
  padding-top: 30px;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  overflow-x: visible;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  position: relative;

  h1 {
    margin-bottom: 30px;
    font-size: 4rem;
  }
  
  p {
    max-width: 400px;
  }
`

const MenuBar = styled(Section)`
  padding: 5px 0;
  text-align: right;
  font-size: 14px;

  a {
    color: ${p => p.theme.colors.white};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const FormContainer = styled.div`
  position: absolute;
  bottom: 70px;
`