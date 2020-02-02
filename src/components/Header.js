import React from 'react'
import styled from 'styled-components'

import Section from './layout/Section'
import AnimatedShapes from './AnimatedShapes'
import SearchForm from './SearchForm'
import MenuBar from './MenuBar'

export default (props) => {
  return(
    <header id="header">
      <MenuBar />
      <Section 
        backgroundColor='bluePurple'
        lightText
      >
        <HeaderContent>
          <BannerShapes 
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

const BannerShapes = styled(AnimatedShapes)`
  top: -30px;
`

const FormContainer = styled.div`
  position: absolute;
  bottom: 80px;
`