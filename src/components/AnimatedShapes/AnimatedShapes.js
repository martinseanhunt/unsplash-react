import React, { useRef, useState } from 'react'

import ImageContainer from './styles/ImageContainer'

const AnimatedShapes = props => {
  const [clientWidth, setClientWidth]= useState(window.innerWidth)
  const [clientHeight, setCleintHeight] = useState(window.innerHeight)
  const images = useRef()
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
    const centerOfClientX = clientWidth / 2
    const centerOfElementX = rect.x + (rect.width / 2)
    const offsetX = centerOfClientX - centerOfElementX

    const centerOfElementY = rect.y + (rect.height / 2)
    const centerOfClientY = clientHeight / 2
    const offsetY = centerOfClientY - centerOfElementY
 
    const rotateImages = ({clientX, clientY}) => {
      const xPercent = ((clientX + offsetX) / clientWidth) * 100
      const yPercent = ((clientHeight - (clientY + offsetY)) / clientHeight) * 100 
      
      const xDegrees = (xPercent - 50) / (50 / maxDegreesX)
      const yDegrees = (yPercent - 50) / (50 / maxDegreesY)

      Array.from(images.current.children).forEach(i => {
        i.setAttribute('style', `
          --rotateX: ${xDegrees}deg;
          --rotateY: ${yDegrees}deg;
        `)
      })
    }

    let timeOut
    const handleResize = () => {
      clearTimeout(timeOut)
      timeOut = setTimeout(() => {
        setClientWidth(window.innerWidth)
        setCleintHeight(window.innerHeight)
      }, 500)
    }
  
    const handleMouseMove = e => window.requestAnimationFrame(() => rotateImages(e))  
    
    listenOn.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      listenOn.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeOut)
    }
  }, [listenOnElementId, maxDegreesX, maxDegreesY, clientHeight, clientWidth])
  
  return (
    <ImageContainer {...props} ref={images}>
      <img src="/img/bannershape3.svg" alt="animated shape" />
      <img src="/img/bannershape2.svg" alt="animated shape" />
      <img src="/img/bannershape1.svg" alt="animated shape" />  
    </ImageContainer>
  )
}

export default AnimatedShapes