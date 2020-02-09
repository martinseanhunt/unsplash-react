import styled from 'styled-components'

const Card = styled.div`
  width: calc(33.3% - 13.334px);
  height: 300px;
  margin-right: 20px;
  padding-top: 20px;
  position: relative;
  transition: opacity 1s, transform 0.2s;
  display: flex; 
  align-items: stretch;

  .image-preloader__image-container {
    width: 100%;
  }

  .image-preloader__loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: ${({theme}) => theme.colors.lightGrey};
    color: ${({theme}) => theme.colors.medLightGrey2};
  }

  &:hover {
    transform: scale(1.015);
    cursor: pointer;
  }

  @media (min-width: ${({theme}) => theme.breakPoints.m + 1}px) {
    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  @media (max-width: ${({theme}) => theme.breakPoints.m}px) {
    width: calc(50% - 10px);
    margin-right: 20px;

    &:nth-child(2n) {
      margin-right: 0;
    }
  }

  @media (max-width: ${({theme}) => theme.breakPoints.s}px) {
    width: 100%;
    margin-right: 0;
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