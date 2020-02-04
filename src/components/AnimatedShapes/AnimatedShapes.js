import React from 'react'

import ImageContainer from './styles/ImageContainer'

const AnimatedShapes = props => {
  // TODO: update width and height on window resize
  const clientWidth = React.useRef(document.body.clientWidth)
  const clientHeight = React.useRef(document.body.clientHeight)
  const images = React.useRef()
  const { listenOnElementId } = props

  // TODO: set these dynamically based on screen width
  const maxDegreesX = props.maxDegreesX || 35
  const maxDegreesY =  props.maxDegreesY || 25

  React.useEffect(() => {    
    const elementToListenOn = listenOnElementId
      ? document.querySelector(`#${listenOnElementId}`)
      : null

    const listenOn = elementToListenOn 
      ? elementToListenOn
      : window

    const rect = images.current.getBoundingClientRect()
    const centerOfClientX = clientWidth.current / 2
    const centerOfElementX = rect.x + (rect.width / 2)
    const offsetX = centerOfClientX - centerOfElementX

    const centerOfElementY = rect.y + (rect.height / 2)
    const centerOfClientY = clientHeight.current / 2
    const offsetY = centerOfClientY - centerOfElementY
 
    const rotateImages = ({clientX, clientY}) => {
      const xPercent = ((clientX + offsetX) / clientWidth.current) * 100
      const yPercent = ((clientHeight.current - (clientY + offsetY)) / clientHeight.current) * 100 
      
      const xDegrees = (xPercent - 50) / (50 / maxDegreesX)
      const yDegrees = (yPercent - 50) / (50 / maxDegreesY)

      Array.from(images.current.children).forEach(i => {
        i.setAttribute('style', `
          --rotateX: ${xDegrees}deg;
          --rotateY: ${yDegrees}deg;
        `)
      })
    }
  
    const handleMouseMove = e => window.requestAnimationFrame(() => rotateImages(e))  
    
    listenOn.addEventListener('mousemove', handleMouseMove)

    return () => listenOn.removeEventListener('mousemove', handleMouseMove)
  }, [listenOnElementId, maxDegreesX, maxDegreesY])
  
  return (
    <ImageContainer {...props} ref={images}>
      <img src="/img/bannershape3.svg" alt="animated shape" />
      <img src="/img/bannershape2.svg" alt="animated shape" />
      <img src="/img/bannershape1.svg" alt="animated shape" />  
    </ImageContainer>
  )
}

export default AnimatedShapes