import styled from 'styled-components'

const ImageContainer = styled.div`
  width: ${p => p.width || '585'}px;
  height: ${p => p.height || '585'}px;;
  position: relative;

  img {
    --rotateX: 0;
    --rotateY: 0;
    --translateZ: 0;
    --scale: 1;
    transform: 
      perspective(600px) 
      rotateY(var(--rotateX)) 
      rotateX(var(--rotateY)) 
      translateZ(var(--translateZ)) 
      scale(var(--scale));
    transition: transform 0.9s ease-out;
    
    position: absolute;
    top: 0;
    left: 0;
  }
  
  img:nth-of-type(1) {
    --translateZ: 150px; 
    --scale: 0.9;
  }
  
  img:nth-of-type(2) {
    --translateZ: 40px; 
    --scale: 0.95;
  }
  
  img:nth-of-type(3) {
    --translateZ: -80px;
    --scale: 1;
  }
`

export default ImageContainer