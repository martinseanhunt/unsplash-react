import styled from 'styled-components'

const Card = styled.div`
  width: 33.3%;
  height: 300px;
  padding-right: 20px;
  padding-top: 20px;
  position: relative;
  transition: opacity 1s, transform 0.2s;

  &:hover {
    transform: scale(1.015);
    cursor: pointer;
  }

  @media (min-width: ${({theme}) => theme.breakPoints.m + 1}px) {
    &:nth-child(3n) {
      padding-right: 0;
      svg {
        right: 13px;
      }
    }
  }

  @media (max-width: ${({theme}) => theme.breakPoints.m}px) {
    width: 50%;
    padding-right: 20px;

    &:nth-child(2n) {
      padding-right: 0;
      svg {
        right: 13px;
      }
    }
  }

  @media (max-width: ${({theme}) => theme.breakPoints.s}px) {
    width: 100%;
    padding-right: 0;
  }

  &.remove {
    opacity: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default Card