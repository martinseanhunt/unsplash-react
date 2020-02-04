import React from 'react'

import SmallCaps from '../common/styles/SmallCaps'

const ResultsTitle = ({ searchQuery, isFavourites }) => {
  const render = (text) => (
    <SmallCaps>
      {text}
    </SmallCaps>
  )
  
  if(searchQuery) return render(`Search Results: ${searchQuery}`)
  if(isFavourites) return render('My Favourites')
  return render('Latest Photos')
}

export default ResultsTitle