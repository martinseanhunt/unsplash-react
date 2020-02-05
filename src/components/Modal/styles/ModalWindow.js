import styled from 'styled-components'

const ModalWindow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  background: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s;

  ${({modal}) => modal && `
    pointer-events: auto;
    opacity: 1;
  `}

  .inner {
    width: 85%;
    max-width: 1440px;
    padding: 30px;
    background: white;
    min-height: 200px;
    position: relative;
    max-height: 85%;
    display: flex;
    align-items: stretch;
  }

  .image-preloader__loading-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-preloader__image-container {
    img {
      height: 100%;
      width: 100%;
      z-index: 20000;
      object-fit: contain;
      position: relative;
    }
  }

  .close {
    background: none;
    border: none;
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
    background: #fff;
    border-radius: 50px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -15px;
    right: -15px;
    outline: none;
    z-index: 30000;
  }

`
export default ModalWindow