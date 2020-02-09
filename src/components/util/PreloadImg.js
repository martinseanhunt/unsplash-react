import React, { useState, useEffect } from 'react'

import Loading from '../common/Loading'

const PreLoadImg = ({ src, loadingText, alt, ...rest }) => {
  const [loaded, setLoaded] = useState(false)
  
  useEffect(() => {
    const image = new Image()
    image.onload = () => setLoaded('true')
    image.src = src 

    return () => { setLoaded(false) }
  }, [src])

  return (
    <>
      {loaded ? (
        <div className="image-preloader__image-container" data-test='loaded'>  
          <img 
            src={src} 
            alt={alt || ''}
            {...rest}
          />
        </div>
      ) : (
        <div className="image-preloader__loading-container" data-test='loading'>
          <Loading 
            text={loadingText !== undefined ? loadingText : undefined}
            noStyle
          />
        </div>
      )}
    </>
  )
}

export default PreLoadImg