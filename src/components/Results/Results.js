import React, { useContext } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import Context from '../../store/Context'
import useGetResults from './useGetResults'

import Section from '../layout/Section'
import ResultCard from './ResultCard'
import Loading from '../Loading'
import Error from '../Error'

const Results = props => {
  const history = useHistory()
  const { 
    results: { state, dispatch }, 
    user: { state: user } 
  } = useContext(Context)
  
  const { 
    error, 
    loading, 
    results, 
    totalPages 
  } = state

  const {
    initialized,
    page,
    searchQuery,
    pathname,
    isFavorites
  } = useGetResults()

  const handleChangePage = (change) => {
    window.scrollTo({
      // TODO: This is a quick fix... Improve getting top value
      top: 486, 
      behavior: 'smooth'
    })
    history.push(`${pathname}?page=${page + change}${searchQuery ? `&query=${searchQuery}`: ''}`)
  }

  // TODO: This is a quick fix, improve how I'm getting height
  if(loading) return (<Loading height={results.length ? '1591' : undefined}/>) 
  if(error) return (<Error error={error} />)
  if(!initialized) return <span></span>
  
  return (
    <Section>
      {/*TODO: refactor all of these small spans in to a component*/}
      <SmallCaps>
        {searchQuery && `Search Results: ${searchQuery}`}
        {isFavorites && 'My Favorites'}
        {(!searchQuery && !isFavorites) && 'Latest Photos'}
      </SmallCaps>
      <ResultsContainer>
        {results.map(r => 
          <ResultCard 
            result={r} 
            key={r.id} 
            isFavorites={isFavorites}
            page={page}
          />)}
      </ResultsContainer>
      <Pagination>
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
        {totalPages && <span>{`page ${page} of ${totalPages}`}</span>}
      </Pagination>
    </Section>
  )
}

const ResultsContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
`

const Pagination = styled.div`
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

const SmallCaps = styled.span`
  margin-top: 80px;
  font-size: 12px;
  letter-spacing: 2px;
  line-height: 1.5;
  text-transform: uppercase;
  color: #717171;
  font-weight: 400;
  display: block;
`

export default Results