import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListImgs from './ListImgs';

const F_BASE_URL = window.location.origin + '/icons-frameworks/';
const L_BASE_URL = window.location.origin + '/icons-languages/';

function App () {

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

  return (
    <div className="container py-5">

      <h1 className="display-4">
        <a href="https://github.com/haikelfazzani/incofy" className="text-dark">
          <i className="fa fa-smile-wink fs-40"></i> incofy <i className="fa fa-smile-beam fs-40"></i>
        </a>
      </h1>
      <p className="m-0">Free and open source</p>
      <p className="lead text-muted">svg icons for frameworks and languages</p>

      <form className="w-25 d-flex mx-auto mb-5" onSubmit={onSearchIcon}>
        <input
          type="search"
          className="w-50 form-control"
          placeholder="react.."
        />

        <select className="w-50 form-select">
          <option value="framework">framework</option>
          <option value="language">language</option>
        </select>
      </form>


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
  );
}

export default App;
