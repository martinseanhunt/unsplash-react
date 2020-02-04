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

  const text = `${props.text || 'Loading'}${loadingDots}`

  if(props.noStyle) return <span>{text}</span>

  return (
    <Section>
      <MessageContainer {...props}>
        <span>{text}</span>
      </MessageContainer>
    </Section>
  )
}

export default Loading