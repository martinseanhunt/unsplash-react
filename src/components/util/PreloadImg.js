import React, { useState, useEffect, useRef } from 'react'

import Loading from '../common/Loading'

const PreLoadImg = ({ src, loadingText, alt, ...rest }) => {
  const [loaded, setLoaded] = useState(false)
  const imageRef = useRef()
  
  useEffect(() => {
    return () => { setLoaded(false) }
  }, [])

  return (
    <>
      <div 
        className="image-preloader__image-container" 
        style={!loaded ? { visibility: 'hidden', height: '0px', overflow: 'none', position: 'absolute' } : null}
      >  
        <img 
          src={src} 
          alt={alt || ''}
          {...rest}
          data-test={`${loaded ? 'image-loaded' : 'image'}`}
          ref={imageRef}
          onLoad={() => setLoaded(true)}
        />
      </div>
      {!loaded && (
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