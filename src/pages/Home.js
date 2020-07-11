import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListImgs from '../containers/ListImgs';
import Drawer from '../components/Drawer';

const F_BASE_URL = window.location.origin + '/icons-frameworks/';
const L_BASE_URL = window.location.origin + '/icons-languages/';

function Home () {

  const [images, setImages] = useState({
    frameworks: null,
    languages: null,
    copyFrameworks: null,
    copyLanguages: null
  });

  useEffect(() => {
    Promise.all([axios(F_BASE_URL + 'frameworks.json'), axios(L_BASE_URL + 'languages.json')])
      .then(response => {
        setImages({
          frameworks: response[0].data,
          languages: response[1].data,
          copyFrameworks: response[0].data,
          copyLanguages: response[1].data
        });
      });
  }, []);

  const onSearchIcon = (e) => {
    e.preventDefault();

    let searchQuery = e.target.elements[0].value;

    console.log(searchQuery);

    if (e.target.elements[1].value.startsWith('framework')) {
      let n = images.copyFrameworks.filter(f => f.name.startsWith(searchQuery));
      setImages({ ...images, frameworks: n.length > 0 ? n : images.copyFrameworks });
    }
    else {
      let n = images.copyLanguages.filter(f => f.name.startsWith(searchQuery));
      setImages({ ...images, languages: n.length > 0 ? n : images.copyLanguages });
    }
  }

  return (<div>

    <header className="pb-0">
      <h1>svg icons for</h1>
      <h1>frameworks and languages</h1>
      <p className="m-0">Free and open source</p>
    </header>

    <header className="sticky-top pt-0 pt-3">
      <form className="w-25 d-flex mx-auto" onSubmit={onSearchIcon}>
        <input
          type="search"
          className="w-50 form-control rounded-0 border-0"
          placeholder="react.."
        />

        <select className="w-50 form-select rounded-0 border-0">
          <option value="framework">framework</option>
          <option value="language">language</option>
        </select>
      </form>
    </header>

    <div className="container py-5">

      <section className="py-5">
        <h3 className="text-muted mb-3">Frameworks</h3>
        <ListImgs
          baseUrl={F_BASE_URL}
          images={images.frameworks}
        />
      </section>


      <section className="py-5">
        <h3 className="text-muted mb-3">Languages</h3>
        <ListImgs
          baseUrl={L_BASE_URL}
          images={images.languages}
        />
      </section>
    </div>

    <Drawer />

  </div>);
}

export default Home;
