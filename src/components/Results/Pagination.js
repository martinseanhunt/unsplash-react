import React from 'react'
import styled from 'styled-components'

import SmallCaps from '../common/SmallCaps'

const Pagination = ({ page, totalPages, handleChangePage }) => {
  return (
    <PaginationContainer>
      {page > 1 && 
        <button 
          onClick={() => handleChangePage(-1)}
          className="prev"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
        </button>
      }
      {((page < totalPages) || !totalPages) && 
        <button 
          onClick={() => handleChangePage(1)}
          className="next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
        </button>
      }
      {totalPages && 
        <SmallCaps>
          {`page ${page} of ${totalPages}`}
        </SmallCaps>
      }
    </PaginationContainer>
  )
}

const PaginationContainer = styled.div`
  margin-top: 80px;
  height: 85px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  text-align: center;
  position: relative;

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

  span {
    width: 100%;
    font-size: 12px;
    letter-spacing: 2px;
    line-height: 1.5;
    text-transform: uppercase;
    color: #717171;
    font-weight: 400;
    margin: 0 0 40px;
    margin-top: 50px;
  }
`

const PagesCount = styled(SmallCaps)`

`

export default Pagination