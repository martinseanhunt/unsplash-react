import React from 'react'

import SmallCaps from '../common/SmallCaps'

const ResultsTitle = ({ searchQuery, isFavorites }) => {
  const render = (text) => (
    <SmallCaps>
      {text}
    </SmallCaps>
  )
  
  if(searchQuery) return render(`Search Results: ${searchQuery}`)
  if(isFavorites) return render('My Favorites')
  return render('Latest Photos')
}

export default ResultsTitle