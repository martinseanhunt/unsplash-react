import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0%, 40%, 100% { transform: scale(1) }
  20%, 60%  { transform: scale(1.2) }
`

const HeartIcon = styled.svg`
  position: absolute;
  bottom: 10px;
  right: 13px;
  width: 40px;
  height; 40px;
  overflow: visible;
  cursor: pointer;

  &:hover {
    path {
      fill: rgba(255,0,0,0.5);
    }
  }

  &.clicked {
    animation: ${pulse} 0.6s;
  }

  &.faved {
    path {
      fill: red;
      stroke: #ff8282;
    }
  }
`

export default HeartIcon