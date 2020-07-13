import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../state/GlobalState';

import logo from '../img/logo192.png';

export default function Navbar () {

  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [navToggle, setNavToggle] = useState(false);

  const onOpenDrawer = () => {
    setGlobalState({ ...globalState, isDrawerOpen: !globalState.isDrawerOpen });
  }

  const onNavToggle = () => {
    setNavToggle(!navToggle);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">

      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={logo} width="25" height="25" alt="incofy" loading="lazy" className="rounded-circle mr-2" />
          <span className="fs-12">Incofy</span>
        </Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={onNavToggle}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" style={{ display: navToggle ? 'block' : 'none' }}>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="fa fa-home"></i> home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <i className="fa fa-info-circle"></i> About
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav">

            <li className="nav-item">
              <Link className="btn btn-light mr-3" to="/editor"><i className="fa fa-cog"></i></Link>
            </li>

            <li className="nav-item">
              <span className="btn btn-light" onClick={onOpenDrawer}>
                <i className="fas fa-cart-arrow-down"></i> ({globalState.listSelectedIcons.length})
              </span>
            </li>

          </ul>

        </div>
      </div>
    </nav>
  );
}