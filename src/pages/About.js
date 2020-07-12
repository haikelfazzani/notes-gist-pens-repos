import React from 'react';
import logo from '../img/logo192.png';

export default function About () {
  return (<div className="container py-5">

    <img src={logo} alt="free and open source svg icons" className="mb-5" width="100" height="100" />

    <h3 className="w-50 mx-auto mb-5">Making the web more beautiful, fast, and open through great svg icons</h3>
    <p>We believe the best way to bring personality and performance to websites
    and products is through great design and technology. Our goal is to make that process simple,
  by offering an intuitive and robust collection of open source designer web icons.</p>

    <a className="fs-40 text-dark" href="https://github.com/haikelfazzani/incofy">
      <i className="fab fa-github"></i>
    </a>
  </div>);
}