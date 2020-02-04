import React from 'react'

import { useResultsContext } from '../../context/results/ResultsContext'
import ModalWindow from './styles/ModalWindow'
import Loading from '../common/Loading'

const Modal = () => {
  // This isn't very reusable but doing this to get it up and running quickly
  const { state, dispatch } = useResultsContext()
  const {modal} = state

  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' })

  return (
    <ModalWindow 
      modal={modal}
      onClick={closeModal}
    >
      <div 
        className="inner"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="close"
          onClick={closeModal}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
        </button>
        {modal && (
          <>
            <div className="loading">
              <Loading noStyle/>
            </div>
            <div className="image-container">
              <img src={modal.urls.full} alt={modal.description || `${modal.user.name}'s photo`} />
            </div>
          </>
        )}
      </div>
    </ModalWindow>
  )
}

export default Modal