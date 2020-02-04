import styled from 'styled-components'

const HeaderContent = styled.div`
  height: ${({theme}) => theme.layout.headerHight}px;
  padding-top: 65px;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  overflow-x: visible;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  position: relative;

  h1 {
    margin-bottom: 30px;
    font-size: 4rem;
  }
  
  p {
    max-width: 400px;
  }
`

export default HeaderContent