import React from 'react'
import './DeleteModal.css'

const Modal = (props) => (
  <div>
    <div className={`delete__modal ${props.showModal ? 'open' : ''}`}>
      <h1 className="delete__modal--head">Error</h1>
      <p className="delete__modal--para">{props.message}</p>
      <div className="delete__modal--btn__container">
        <button onClick={props.closeModal} style={{ color: 'white' }}>
          Clear
        </button>
      </div>
    </div>
    <div className={`delete__modal__bg ${props.showModal ? 'open' : ''}`} />
  </div>
)

export default Modal
