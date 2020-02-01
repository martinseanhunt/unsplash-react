// TODO: move to .env
const baseUrl = process.env.REACT_APP_UNSPLASH_URL

const headers = new Headers({
  'content-type': 'application/json',
  'Accept-Version': 'v1',
  'Authorization': process.env.REACT_APP_UNSPLASH_API
})

const getImages = async (page = 1, perPage = 12) => {
  const url = `${baseUrl}photos?page=${page}&per_page=${perPage}`
  const res = await sendRequest(url)
  return res
}

const searchImages = async (query, page = 1, perPage = 12) => {
  if(!query) return getImages(page)
  const url = `${baseUrl}search/photos?query=${query}&page=${page}&per_page=${perPage}`
  const res = await sendRequest(url)
  return res
}

const sendRequest = async (url, options = {}) => {
  const res = await fetch(url, { headers, ...options })
  const json = await res.json()

  // Catch unsplash specific errors
  if(json.errors) throw new Error(json.errors)
  // Catch anything else (no errors property in response)
  if(!res.ok) throw new Error(`${res.status} ${res.statusText}`)

  return json
}

export default {
  searchImages,
  getImages
}