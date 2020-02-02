import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useLocation, useHistory } from 'react-router-dom'

import api from '../../util/api'
import useQuery from '../../util/useQuery'
import Context from '../../store/Context'
import Section from '../layout/Section'
import ResultCard from './ResultCard'

const Results = props => {
  const { results: { state, dispatch }, user: { state: user } } = useContext(Context)
  const { error, loading, results, totalPages } = state

  const { pathname } = useLocation()
  const history = useHistory()
  const query = useQuery()

  const page = parseInt(query.get('page')) || 1
  const searchQuery = query.get('query')

  const isFavorites = pathname.includes('/favorites')

  // TODO: Think about whether this is the best approach... Is it good to 
  // Use a hook here and allow this to update itself whenever the relevant state
  // changes since it can be changed from here or other components
  useEffect(() => {
    dispatch({ type: 'SET_RESULTS_LOADING' })

    if(isFavorites && user.id) {
      api.getFavorites(user.username, page)
      .then(payload => {
        dispatch({ type: 'SET_RESULTS_FAVORITES', payload })
      })
      .catch(e => {
        console.error(e)
        dispatch({ type: 'SET_RESULTS_ERROR', payload: e.message })
      })
    } else {
      api.searchImages(searchQuery, page)
      .then(payload => {
        dispatch({ type: 'SET_RESULTS_RESULTS', payload })
      })
      .catch(e => {
        console.error(e)
        dispatch({ type: 'SET_RESULTS_ERROR', payload: e.message })
      })
    }
  },[page, searchQuery, dispatch, pathname, user, isFavorites])

  const handleChangePage = (change) => {
    history.push(`${pathname}?page=${page + change}${searchQuery ? `&query=${searchQuery}`: ''}`)
  }

  // TODO: Error and Loading components
  if(loading) return (<div>Loading...</div>)
  if(error) return (<div>{state.error}</div>)

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
        {((page <= totalPages) || !totalPages) && 
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
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0 30px;

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