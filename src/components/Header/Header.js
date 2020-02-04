import React from 'react'
import styled from 'styled-components'

import Section from '../layout/Section'
import AnimatedShapes from '../AnimatedShapes/AnimatedShapes'
import SearchForm from './SearchForm'
import MenuBar from './MenuBar'

const Header = (props) => {
  return(
    <header id="header">
      <Section 
        backgroundColor='bluePurple'
        lightText
      >
        <MenuBar />
        <HeaderContent>

          <BannerShapes 
            width='325'
            height='325'
            maxDegreesY='30'
            maxDegreesX='60'
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
  height: ${({theme}) => theme.layout.headerHight}px;
  padding-top: 65px;
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

const BannerShapes = styled(AnimatedShapes)`
  top: -30px;
`

const FormContainer = styled.div`
  position: absolute;
  bottom: 80px;
`

export default Header