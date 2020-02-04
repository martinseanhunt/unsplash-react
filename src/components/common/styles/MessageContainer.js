import styled from 'styled-components'

const MessageContainer = styled.div`
  height: ${({ height, theme }) => height 
    ? `${height}px` 
    : `calc(100vh - ${theme.layout.headerHight + 50}px)`};
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 12px;
    letter-spacing: 2px;
    line-height: 1.5;
    text-transform: uppercase;
    color: #717171;
    font-weight: 400;
    display: block;
    overflow: visible;
  }
`

export default MessageContainer