import styled from 'styled-components'

const Card = styled.div`
  width: 33.3%;
  height: 300px;
  padding-right: 20px;
  padding-top: 20px;
  position: relative;
  transition: opacity 1s;

  &.remove {
    opacity: 0;
  }

  &:nth-child(3n) {
    padding-right: 0;
    svg {
      right: 13px;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default Card