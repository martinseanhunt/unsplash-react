import React from 'react'

import ResultsContainer from './styles/ResultsContainer'
import ResultCard from '../ResultCard/ResultCard'

const ResultsList = ({
  results,
  isFavourites,
  page,
  user,
  handleLikePhoto,
  handleUnlikePhoto
}) => {
  
  return (
    <ResultsContainer>
      {results.map(r => 
        <ResultCard 
          result={r}  
          key={r.id} 
          isFavouritesPage={isFavourites}
          page={page}
          handleLikePhoto={handleLikePhoto}
          handleUnlikePhoto={handleUnlikePhoto}
          user={user}
        />
      )}
    </ResultsContainer>
  )
}

export default ResultsList