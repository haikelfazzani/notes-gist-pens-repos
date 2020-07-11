import React, { useState } from 'react';
import './Snackbar.css';

export default function Snackbar ({ txt, show = false }) {

  const [showSnack, setShowSnack] = useState(show);

  return <div className="snackbar-container">
    <div
      className={"text-break snackbar " + (showSnack ? "show" : "")}
      onClick={() => { setShowSnack(!showSnack) }}>
      <span className="mx-auto text-uppercase d-flex justify-content-center align-items-center">
        <i className="fas fa-info-circle mr-2"></i><span>{txt}</span>
      </span>
    </div>
  </div>;
}