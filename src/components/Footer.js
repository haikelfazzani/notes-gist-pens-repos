import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer () {
  return (
    <footer className="fs-12 py-3 mt-5">
      <div className="container d-flex justify-content-between">
        
        <p className="text-muted m-0">Copyright © 2020 <a href="https://github.com/haikelfazzani/incofy" className="text-muted">Incofy</a>.</p>

        <div className="d-flex">
          <Link to="/" className="text-muted mr-2">Home -</Link>
          <Link to="/about" className="text-muted">About</Link>
        </div>

      </div>
    </footer>
  );
}