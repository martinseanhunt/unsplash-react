import styled from 'styled-components'

const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 5px 0;
  text-align: right;
  font-size: 13px;
  color: ${p => p.theme.colors.white};
  z-index: 9999;
  
  div{ 
    min-height: 26.667px;
  }

  a {
    color: ${p => p.theme.colors.white};
    padding-left: 10px;

    &:hover {
      text-decoration: none;
    }
  }

  button {
    background: none;
    border: none;
    color: #fff;
    text-decoration: underline;
    cursor: pointer;
    font-size: 13px;

    &:hover {
      text-decoration: none;
    }
  }
`

export default Bar