import React from 'react'
import styled from 'styled-components'

const Inner = styled.div`
  max-width: ${p => p.theme.layout.maxWidth};
  width: ${p => p.theme.layout.widthPercent};
  position: relative;
`

export default props => (
  <Inner>
    {props.children}
  </Inner>
)
