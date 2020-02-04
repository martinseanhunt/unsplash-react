import React from 'react'

import PaginationContainer from './styles/PaginationContainer'
import PagesCount from './styles/PagesCount'

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

export default Pagination