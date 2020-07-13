import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListImgs from '../containers/ListImgs';

import headImg from '../img/2.svg';

const F_BASE_URL = window.location.origin + '/icons-frameworks/';
const L_BASE_URL = window.location.origin + '/icons-languages/';
const T_BASE_URL = window.location.origin + '/icons-tools/';

const tabs = [
  { name: 'frameworks', baseUrl: F_BASE_URL, folder: 'icons-frameworks' },
  { name: 'languages', baseUrl: L_BASE_URL, folder: 'icons-languages' },
  { name: 'tools', baseUrl: T_BASE_URL, folder: 'icons-tools' }
];

function Home () {

  const [images, setImages] = useState(null);
  const [immuteImages, setImmuteImages] = useState(null);
  const [currImageObj, setCurrImageObj] = useState(tabs[0]);

  useEffect(() => {
    axios(F_BASE_URL + 'frameworks.json')
      .then(response => {
        setImages(response.data);
        setImmuteImages(response.data);
      });
  }, []);

  const onTab = (imageObj) => {
    setCurrImageObj(imageObj);
    axios(imageObj.baseUrl + imageObj.name + '.json')
      .then(response => {
        setImages(response.data);
        setImmuteImages(response.data);
      });
  }

  const onSearchIcon = (e) => {
    e.preventDefault();

    let searchQuery = e.target.elements[0].value;

    let n = immuteImages.filter(f => f.name.startsWith(searchQuery));
    setImages(n.length > 0 ? n : immuteImages);
  }

  return (<div>

    <header className="bg-dark text-left">
      <div className="container">
        <div className="d-flex align-items-center">
        <div className="w-75">
          <h1><i className="fa fa-info-circle"></i> svg icons for</h1>
          <h1>frameworks and languages</h1>
          <p className="mt-0">Free and open source</p>

          <form onSubmit={onSearchIcon} className="d-flex w-50">
            <input
              type="search"
              className="form-control mr-3"
              placeholder="react.."
            />

            <button type="submit" className="btn btn-primary"><i className="fa fa-search"></i></button>
          </form>
        </div>

        <img src={headImg} alt="incofy" className="w-25" />
        </div>
      </div>
    </header>

    <div className="container py-5">

      <ul className="nav nav-tabs mb-4">
        {tabs.map(tab => <li className="nav-item" key={tab.name}>
          <span className={"nav-link " + (currImageObj.name === tab.name ? "active" : "")}
            onClick={() => { onTab(tab) }}>{tab.name}</span>
        </li>)}
      </ul>

      <ListImgs
        baseUrl={currImageObj.baseUrl}
        images={images}
        folder={currImageObj.folder}
      />

    </div>
  </div>);
}

export default Home;
