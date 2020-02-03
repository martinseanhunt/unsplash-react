// TODO: move to .env
const BASE_URL =  process.env.REACT_APP_UNSPLASH_URL
const CLIENT_ID = process.env.REACT_APP_UNSPLASH_API
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const getImages = async (page = 1, perPage = 12) => {
  const url = `${BASE_URL}photos?page=${page}&per_page=${perPage}`
  const res = await sendRequest(url)
  return res
}

const searchImages = async (query, page = 1, perPage = 12) => {
  if(!query) return getImages(page)
  const url = `${BASE_URL}search/photos?query=${query}&page=${page}&per_page=${perPage}`
  const res = await sendRequest(url)
  return res
}

const getProfile = async () => {
  const url = `${BASE_URL}me`
  const res = await sendRequest(url)
  return res
}

const getFavourites = async (user, page = 1, perPage = 12) => {
  const url = `${BASE_URL}users/${user}/likes?page=${page}&per_page=${perPage}`
  const res = await sendRequest(url)
  return res
}

const getJWT = async code => {
  const url = `${SERVER_URL}gettoken/${code}`
  const res = await sendRequest(url)
  return res
}

const likePhoto = async (id) => {
  const url = `${BASE_URL}photos/${id}/like`
  const res = await sendRequest(url, {
    method: 'POST',
  })
  return res
}

const unlikePhoto = async (id) => {
  const url = `${BASE_URL}photos/${id}/like`
  const res = await sendRequest(url, {
    method: 'DELETE',
  })
  return res
}
const sendRequest = async (url, options = {}) => {
  const jwt = localStorage.token
  const authorization = jwt ? `Bearer ${JSON.parse(jwt).access_token}` : `Client-ID ${CLIENT_ID}`

  const headers = new Headers({
    'content-type': 'application/json',
    'Accept-Version': 'v1',
    'Authorization': authorization
  })

  const res = await fetch(url, { headers, ...options })
  if(!res.ok) throw new Error(`${res.status}: ${res.statusText}`)

  const json = await res.json()

  return json
}

export default {
  searchImages,
  getImages,
  getJWT,
  getProfile,
  likePhoto,
  getFavourites,
  unlikePhoto
}