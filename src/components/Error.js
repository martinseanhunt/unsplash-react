import React from 'react'
import styled from 'styled-components'

import Section from './layout/Section'

// TODO: refactor, share style with loading

const Error = props => {
  let error
  if(props.error && props.error.includes('403')) {
    error = `Looks like we've hit our max API calls (50 per hour)... Try later`
  }
  
  if(props.error && props.error.includes('401')) {
    error = `Hmmm... Unsplash says we're unauthorized, check the token / access credentials`
  }

  if(props.noStyle) return <span>Oops: {error || props.error}</span>

  return (
    <Section>
      <LoadingInner {...props}>
        <span>Oops: {error || props.error} 🤷‍♂️</span>
      </LoadingInner>
    </Section>
  )
}

const LoadingInner = styled.div`
  height: ${({ height }) => height ? `${height}px` : 'calc(100vh - 500px)'}; // TODO get dynamically
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 12px;
    letter-spacing: 2px;
    line-height: 1.5;
    text-transform: uppercase;
    color: #717171;
    font-weight: 400;
    display: block;
    overflow: visible;
  }
`

export default Error