import React from 'react'

import { useResultsContext } from '../../context/results/ResultsContext'
import ModalWindow from './styles/ModalWindow'
import PreloadImg from '../util/PreloadImg'

  // This isn't very reusable - too tightly coupled to results
  // but doing this to get it up and running quickly
const Modal = () => {
  const { state: { modal }, dispatch } = useResultsContext()  

  if(!modal) return null

  const imageUrl = modal.urls.full
  const imageDescription = modal.description
  const userName = modal.user.name

  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' })

  // TODO tidy up close modal animation (keep modal height)

  return (
    <ModalWindow 
      modal={modal}
      onClick={closeModal}
      data-test='component-modal'
    >
      <div 
        className="inner"
        onClick={e => e.stopPropagation()}
        data-test='modal-inner'
      >
        <button
          className="close"
          onClick={closeModal}
          data-test='close-modal'
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
        </button>

        <PreloadImg 
          src={imageUrl}
          alt={imageDescription|| `${userName}'s photo`}
        />
      </div>
    </ModalWindow>
  )
}

export default Modal