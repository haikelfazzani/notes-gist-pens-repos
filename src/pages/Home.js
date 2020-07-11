import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListImgs from '../containers/ListImgs';

const F_BASE_URL = window.location.origin + '/icons-frameworks/';
const L_BASE_URL = window.location.origin + '/icons-languages/';
const T_BASE_URL = window.location.origin + '/icons-tools/';

const tabs = [
  { name: 'frameworks', baseUrl: F_BASE_URL },
  { name: 'languages', baseUrl: L_BASE_URL },
  { name: 'tools', baseUrl: T_BASE_URL }
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

    <header>
      <h1>svg icons for</h1>
      <h1>frameworks and languages</h1>
      <p className="mt-0">Free and open source</p>

      <form className="w-25 d-flex mx-auto" onSubmit={onSearchIcon}>
        <input
          type="search"
          className="form-control rounded-0 border-0"
          placeholder="react.."
        />
      </form>
    </header>

    <div className="container py-5">



      <ul class="nav nav-tabs mb-4">
        {tabs.map(tab => <li class="nav-item" key={tab.name}>
          <span class={"nav-link " + (currImageObj.name === tab.name ? "active" : "")}
            onClick={() => { onTab(tab) }}>{tab.name}</span>
        </li>)}
      </ul>

      <ListImgs
        baseUrl={currImageObj.baseUrl}
        images={images}
      />

    </div>
  </div>);
}

export default Home;
