import React, { useState, useEffect, useContext } from 'react'
import styled, { keyframes } from 'styled-components'

import api from '../../util/api'
import Context from '../../store/Context'

// TODO: Refactor heart in to own component

const ResultCard =  ({ result }) => {
  const { user: { state: user } } = useContext(Context)
  const [clicked, setClicked] = useState()
  const [faved, setFaved] = useState(result.liked_by_user)

  useEffect(() => {
    const id = setTimeout(() => {
      setClicked(false)
    }, 500)

    return () => clearTimeout(id)
  }, [clicked])

  const handleFave = () => {
    setClicked(true)
    setFaved(f => !f)
    // TODO: This works now, but if the component gets unmounted we'll lose the state
    // need to run this through the reducer, find and update the relevant result
    api.likePhoto(result.id) 
      .then(res => console.log(res))
      .catch(e => console.log(e))
  }

  return (
    <Card key={result.id}>
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

const singlePulse = keyframes`
  0%, 100% { transform: scale(1) }
  50% { transform: scale(1.2) }
`

const Card = styled.div`
  width: 33.3%;
  height: 300px;
  padding-right: 20px;
  padding-top: 20px;
  position: relative;

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
    path {
      transition: fill, stroke 0.2s;
    }

    &:hover {
      animation: ${singlePulse} 0.2s;
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