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
    <header id="header" data-test="component-header">
      <Section 
        backgroundColor='bluePurple'
        lightText
      >
        <MenuBar data-test='menu'/>
        <HeaderContent>

          <BannerShapes 
            width='325'
            height='325'
            maxDegreesY='40'
            maxDegreesX='70'
            data-test='shapes'
          />

          <FormContainer data-test='form'>
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