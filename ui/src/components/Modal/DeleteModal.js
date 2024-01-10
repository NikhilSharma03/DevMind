import React from 'react'
import './DeleteModal.css'

function DeleteModal(props)  {
    return (
        <div>
          <div className={`delete__modal ${props.showModal ? "open" : ""}`}>
            <h1 className="delete__modal--head">Delete</h1>
            <p className="delete__modal--para">Are you sure you want to delete your account</p>
            <div className="delete__modal--btn__container">
              <button onClick={props.onDelete}>Delete</button>
              <button onClick={props.onClose}>Cancel</button>
            </div>
          </div>
          <div className={`delete__modal__bg ${props.showModal ? "open" : ""}`} onClick={props.onClose} />
        </div>
    )
}

export default DeleteModal
