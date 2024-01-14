import React from 'react'
import './InputField.css'

function InputField(props) {
  return (
    <div className="inputfield__container">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  )
}

export default InputField
