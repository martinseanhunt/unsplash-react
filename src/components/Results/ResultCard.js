import React, { useState, useEffect } from 'react'

import Card from './styles/Card'
import Heart from './Heart'

const ResultCard =  ({ 
  result, 
  isFavouritesPage, 
  handleLikePhoto,
  handleUnlikePhoto,
  user
}) => {
  const [clickedFave, setClickedFave] = useState()
  const [removeFromPage, setRemoveFromPage] = useState(false)

  useEffect(() => {
    if(!clickedFave) return undefined 
    const id = setTimeout(() => {
      setClickedFave(false)
    }, 500)

    return () => clearTimeout(id)
  }, [clickedFave])

  const handleFave = () => {
    setClickedFave(true)

    if(!result.liked_by_user) {
      handleLikePhoto(result.id)
    } else {
      if(isFavouritesPage) setRemoveFromPage(true)
      handleUnlikePhoto(result.id)
    }
  }

  return (
    <Card className={removeFromPage ? 'remove': ''}>
      <img 
        src={result.urls.small} 
        alt={result.description || `${result.user.username}'s photo`} 
      />

      {user.id && (
        <Heart 
          onClick={handleFave}
          className={`${clickedFave ? 'clicked' : null} ${result.liked_by_user ? 'faved' : null}`}
        />
      )}
    </Card>
  )
}

export default ResultCard