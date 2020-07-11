import React, { useState } from 'react';

export default function Dropdown ({ children }) {

  const [show, setShow] = useState(false);

  return (
    <div className="btn-group dropleft ml-2">

      <button type="button" className="btn-run-code" onClick={() => { setShow(!show); }}>
        <i className="fas fa-ellipsis-v"></i>
      </button>

      <div className="dropdown-menu" style={{ display: show ? 'block' : 'none' }}>
        {children}
      </div>
    </div>
  );
}