import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Section from './layout/Section'

const Loading = props => {
  const [loadingDots, setLoadingDots] = useState('')
  
  useEffect(() => {
    const id = setInterval(() => {
      setLoadingDots(t => {
        if(t.length < 3) return t + '.'
        return ''
      })
    } ,100)
    return clearInterval(id)
  }, [])

  return (
    <Section>
      <LoadingInner>
        <span>Loading{loadingDots}</span>
      </LoadingInner>
    </Section>
  )
}

const LoadingInner = styled.div`
  height: calc(100vh - 430px);
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
    width: 80px;
    display: block;
    overflow: visible;
  }
`

export default Loading