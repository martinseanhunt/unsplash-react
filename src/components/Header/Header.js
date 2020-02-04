import React from 'react'
import styled from 'styled-components'

import Section from '../layout/Section'
import AnimatedShapes from '../AnimatedShapes/AnimatedShapes'
import SearchForm from './SearchForm'
import MenuBar from './MenuBar'
import HeaderContent from './styles/HeaderContent'
import FormContainer from './styles/FormContainer'

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
            maxDegreesY='40'
            maxDegreesX='70'
          />

          <FormContainer>
            <SearchForm />
          </FormContainer>
          
        </HeaderContent>
      </Section>
    </header>
  )
}

const BannerShapes = styled(AnimatedShapes)`
  top: -30px;
`

export default Header