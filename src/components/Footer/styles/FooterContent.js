import styled from 'styled-components'

const FooterContent = styled.div`
  padding: 80px 0;
  border-top: 1px solid ${({theme}) => theme.colors.opaqueGrey};
  position: relative;
  color: ${({theme}) => theme.colors.medLightGrey2};
  font-size: 1.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    width: 20px;
    height: 20px;
    border: 2px solid #000;
  }
`

export default FooterContent