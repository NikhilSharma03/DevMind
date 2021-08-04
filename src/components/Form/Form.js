import React from 'react'
import "./Form.css"

function Form(props) {
    return (
        <form className="form">
            {props.children}
        </form>
    )
}

export default Form
