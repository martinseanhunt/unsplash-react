import React from 'react'
import styled from 'styled-components'

export default ({ result }) => (
  <Card key={result.id}>
    <img 
      src={result.urls.small} 
      alt={result.description || `${result.user.username}'s photo`} 
    />
  </Card>
)

const Card = styled.div`
  width: 33.3%;
  height: 300px;
  padding-right: 20px;
  padding-top: 20px;
  
  &:nth-child(3n) {
    padding-right: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`