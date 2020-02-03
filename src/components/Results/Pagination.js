import React from 'react'
import styled from 'styled-components'

import SmallCaps from '../common/SmallCaps'

const Pagination = ({ page, totalPages, handleChangePage, pageLength }) => {
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
      {(((page < totalPages) || !totalPages) && pageLength >= 12) && 
        <button 
          onClick={() => handleChangePage(1)}
          className="next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
        </button>
      }
      {totalPages && 
        <PagesCount>
          {`page ${page} of ${totalPages}`}
        </PagesCount>
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

const PagesCount = styled(SmallCaps)`
  margin: 0;
`

export default Pagination