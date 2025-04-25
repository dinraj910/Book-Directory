// Alert.js

import React from "react";
import '../Alert.css';

const Alert = ({ type, message, onClose }) => {
  return (
    <div className={`alert ${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className="close-btn">X</button>
    </div>
  );
};

export default Alert;
