import React, { useState, useEffect, useContext } from 'react'
import styled, { keyframes } from 'styled-components'

import api from '../../util/api'
import Context from '../../store/Context'

const ResultCard =  ({ result, isFavourites, page }) => {
  const { user: { state: user }, results: { dispatch: resultsDispatch } } = useContext(Context)
  const [clicked, setClicked] = useState()
  const [faved, setFaved] = useState(result.liked_by_user)
  const [removeFromPage, setRemoveFromPage] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => {
      setClicked(false)
    }, 500)

    return () => clearTimeout(id)
  }, [clicked])

  const handleFave = async () => {
    setClicked(true)
    setFaved(f => !f)

    if(!faved) {
      try {
        await api.likePhoto(result.id) 
      } catch(e) {
        console.warn(e)
      } 
    } else {
      if(isFavourites) setRemoveFromPage(true)
      
      try {
        if(!isFavourites) {
          await api.unlikePhoto(result.id) 
        } else {
          const nextPage = await api.getFavourites(user.username, page + 1)
          await api.unlikePhoto(result.id) 
          resultsDispatch({ type: 'RESULT_REMOVE_FAVOURITE', payload: result.id})
          if(nextPage.length)
            resultsDispatch({ type: 'RESULTS_APPEND_ONE', payload: nextPage })
        }
      } catch(e) {
        console.warn(e)
      }
    }
    
  }

  return (
    <Card key={result.id} className={removeFromPage ? 'remove': ''}>
      <img 
        src={result.urls.small} 
        alt={result.description || `${result.user.username}'s photo`} 
      />

      {user.id && (
        <svg 
          onClick={handleFave}
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
          className={`${clicked ? 'clicked' : null} ${faved ? 'faved' : null}`}
        >
          <path 
            d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"
            fill="none"
            stroke="white"
            strokeWidth="1.2" 
          />
        </svg>
      )}
    </Card>
  )
}

const pulse = keyframes`
  0%, 40%, 100% { transform: scale(1) }
  20%, 60%  { transform: scale(1.2) }
`

const Card = styled.div`
  width: 33.3%;
  height: 300px;
  padding-right: 20px;
  padding-top: 20px;
  position: relative;
  transition: opacity 1s;

  &.remove {
    opacity: 0;
  }

  &:nth-child(3n) {
    padding-right: 0;
    svg {
      right: 13px;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    position: absolute;
    bottom: 10px;
    right: 33px;
    width: 40px;
    height; 40px;
    overflow: visible;
    cursor: pointer;

    &:hover {
      path {
        fill: rgba(255,0,0,0.5);
      }
    }

    &.clicked {
      animation: ${pulse} 0.6s;
    }

    &.faved {
      path {
        fill: red;
        stroke: #ff8282;
      }
    }
  }
`

export default ResultCard