import styled from 'styled-components'

const PaginationContainer = styled.div`
  margin-top: 80px;
  height: 85px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  text-align: center;
  position: relative;
  flex-direction: column;

  button {
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    left: -19px;

    // Not in the real world (A11Y)
    outline: none;

    svg {
      width: 80px;
      height: 80px;
      
      path{
        fill: ${p => p.theme.colors.darkGrey}
      }

      &:hover {
        path {
          fill: ${p => p.theme.colors.bluePurple}
        }
      }
    }

    &.next {
      svg {
        transform: scale(-1)
      }
      left: auto;
      right -19px;
    }
  }
`

export default PaginationContainer