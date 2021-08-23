import React from "react";
import "./Form.css";

function Form(props) {
  return (
    <form style={{ ...props.style }} className="form">
      {props.children}
    </form>
  );
}

export default Form;
