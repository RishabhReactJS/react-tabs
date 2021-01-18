import React from "react";
import "./alert.scss";
const Alert = props => {
  return props.showAlert ? (
    <div className="alert">
      <span className="closebtn" onClick={props.close}>
        &times;
      </span>
      {props.msg}
    </div>
  ) : null;
};

export default Alert;
