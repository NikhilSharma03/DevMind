import React from 'react'
import './Form.css'

function Form(props) {
  return (
    <form style={{ ...props.style }} onSubmit={props.onSubmit} className="form">
      {props.children}
    </form>
  )
}

export default Form
