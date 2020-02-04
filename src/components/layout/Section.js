import React from 'react'
import styled from 'styled-components'

import Inner from './Inner'

const background = props => {
  const { backgroundColor, randomBackgroundColor, theme } = props

  if(randomBackgroundColor) {
    const colors = Object.values(theme.bannerColors)
    return colors[Math.floor(Math.random() * colors.length)]
  } else if(backgroundColor) {
    return theme.colors[backgroundColor]
  }

  return theme.colors.white
}

const Section = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: ${background}}
  color: ${p => (p.lightText || p.randomBackgroundColor) ? p.theme.colors.white : 'inheret'};
  display: flex;
  justify-content: center;
  overflow: hidden;
`

export default props => (
  <Section {...props}>
    <Inner>
      {props.children}
    </Inner>
  </Section>
)
