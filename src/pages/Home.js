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

    <header className="bg-dark">
      <div className="container">
        <div className="d-flex flex-column align-items-center">

          <h1>FREE svg icons and<br /> css animations</h1>
          <p className="mt-0">
            <i className="fab fa-angular text-danger mr-3"></i>
            <i className="fab fa-react text-info mr-3"></i>
            <i className="fab fa-vuejs text-success mr-3"></i>
            <i className="fab fa-js text-yellow"></i>
          </p>

          <form onSubmit={onSearchIcon}>
            <input
              type="search"
              className="form-control"
              placeholder="react.."
            />
          </form>

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
