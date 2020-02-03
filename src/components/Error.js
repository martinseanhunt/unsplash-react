import React from 'react'
import styled from 'styled-components'

import Section from './layout/Section'

// TODO: share style with loading

const Error = (props) => {
  const { error, noStyle } = props

  let errorMessage
  if(typeof error === 'string') {
    if(error.includes('Rate Limit Exceeded')) {
      errorMessage = 
        `Looks like we've hit our max API calls (50 per hour)... Try later`
    }
    
    if(error.includes('401')) {
      errorMessage = 
        `Hmmm... Unsplash says we're unauthorized, check the token / access credentials`
    }
  }
  
  if(noStyle) 
    return <span>Oops: {errorMessage || error.message || error}</span>

  return (
    <Section>
      <LoadingInner {...props}>
        <span>Oops: {errorMessage || error.message || error} 🤷‍♂️</span>
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