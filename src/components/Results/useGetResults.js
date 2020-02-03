import { useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'

import api from '../../util/api'
import Context from '../../store/Context'
import useQuery from '../../util/useQuery'

const useGetResults = () => {
  const { results: { dispatch }, user: { state: user } } = useContext(Context)

  const { pathname } = useLocation()
  const query = useQuery()
  const isFavourites = pathname.includes('/favourites')

  const page = parseInt(query.get('page')) || 1
  const searchQuery = query.get('query')

  const { id: userId, username } = user

  useEffect(() => {
    const getFavourites = async () => {
      try {
        const payload = await api.getFavourites(username, page)
        dispatch({ type: 'SET_RESULTS_FAVOURITES', payload })
      } catch(e) {
        handleError(e)
      }
    }

    const searchImages = async () => {
      try {
        const payload = await api.searchImages(searchQuery, page)
        dispatch({ type: 'SET_RESULTS_RESULTS', payload })
      } catch(e) {
          handleError(e)
      }
    }

    const handleError = e => dispatch({ type: 'SET_RESULTS_ERROR', payload: e.message })
    
    dispatch({ type: 'SET_RESULTS_LOADING' })

    if(isFavourites && userId){
      getFavourites()
    } else {
      searchImages()
    } 
    
  },[page, searchQuery, dispatch, pathname, userId, username, isFavourites])

  return {
    page,
    searchQuery,
    pathname,
    isFavourites
  }
}

export default useGetResults