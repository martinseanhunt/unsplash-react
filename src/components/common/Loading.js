import React, { useState, useEffect } from 'react'

import Section from '../layout/Section'
import MessageContainer from './styles/MessageContainer'

const Loading = props => {
  const [loadingDots, setLoadingDots] = useState('')
  
  useEffect(() => {
    const id = setInterval(() => {
      setLoadingDots(t => {
        if(t.length < 3) return t + '.'
        return ''
      })
    } ,100)
    return () => clearInterval(id)
  }, [])

  const text = `${props.text !== undefined ? props.text : 'Loading'}${loadingDots}`

  if(props.noStyle) return <span data-test='loading'>{text}</span>

  return (
    <Section data-test='component-styled-loading'>
      <MessageContainer {...props}>
        <span data-test='loading'>{text}</span>
      </MessageContainer>
    </Section>
  )
}

export default Loading