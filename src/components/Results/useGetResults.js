import { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'

import api from '../../util/api'
import Context from '../../store/Context'
import useQuery from '../../util/useQuery'

const useGetResults = () => {
  const { results: { dispatch }, user: { state: user } } = useContext(Context)
  const [initialized, setInitialized] = useState(false)
  
  const { pathname } = useLocation()
  const query = useQuery()
  const isFavorites = pathname.includes('/favorites')

  const page = parseInt(query.get('page')) || 1
  const searchQuery = query.get('query')

  const { id: userId, username } = user

  useEffect(() => {
    const getFavorites = async () => {
      const payload = await api.getFavorites(username, page)
      dispatch({ type: 'SET_RESULTS_FAVORITES', payload })
    }

    const searchImages = async () => {
      const payload = await api.searchImages(searchQuery, page)
      dispatch({ type: 'SET_RESULTS_RESULTS', payload })
    }
    
    dispatch({ type: 'SET_RESULTS_LOADING' })

    try {
      if(isFavorites && userId){
        getFavorites()
      } else {
        searchImages()
      } 
    } catch(e) {
      console.error(e)
      dispatch({ type: 'SET_RESULTS_ERROR', payload: e.message })
    }   
    
    setInitialized(true)
  },[page, searchQuery, dispatch, pathname, userId, username, isFavorites])

  return {
    initialized,
    page,
    searchQuery,
    pathname,
    isFavorites
  }
}

export default useGetResults