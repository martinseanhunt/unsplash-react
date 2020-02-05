import React, { useEffect, useState } from 'react'

import Loading from '../common/Loading'

const PreLoadImg = ({ src, loadingText, ...rest }) => {
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
        <div className="image-preloader__image-container">  
          <img 
            src={src} 
            {...rest}
          />
        </div>
      ) : (
        <div className="image-preloader__loading-container">
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