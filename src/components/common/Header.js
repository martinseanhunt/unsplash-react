import React from 'react'
import styled from 'styled-components'

import Section from '../layout/Section'
import AnimatedShapes from './AnimatedShapes'
import SearchForm from '../SearchForm'

export default (props) => {
  return(
    <header id="header">
      <Section 
        backgroundColor='bluePurple'
        lightText
      >
        <HeaderContent>
          <HeaderAnimatedShapes 
            position='absolute'
            right='0'
            width='350'
            height='350'
            maxDegreesY='30'
            maxDegreesX='45'
            listenOnElementId="header"
          />

          <div>
            <h1>Image Search</h1>
            <p>Find and save royaly free images</p>

            <SearchForm />
          </div>
          
        </HeaderContent>
      </Section>
    </header>
  )
}

const HeaderContent = styled.div`
  height: 70vh;
  align-items: center;
  justify-content: center;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  text-align: center;

  h1 {
    margin-bottom: 30px;
    font-size: 4rem;
  }
  
  p {
    max-width: 400px;
  }
`

const HeaderAnimatedShapes = styled(AnimatedShapes)`
  position: relative;
  top: -50px;
`