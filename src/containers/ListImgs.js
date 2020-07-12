import React, { useContext } from 'react';
import { GlobalContext } from '../state/GlobalState';
import { Link } from 'react-router-dom';

export default function ListImgs ({ images, baseUrl, folder }) {

  const { globalState, setGlobalState } = useContext(GlobalContext);

  const onAddToPanel = (imgFilename) => {
    let panel = globalState.listSelectedIcons.slice(0);
    if (!panel.some(p => p.filename.startsWith(imgFilename))) {
      panel.push({ filename: imgFilename, url: baseUrl + imgFilename });
      setGlobalState({
        ...globalState,
        listSelectedIcons: panel,
        currFolderIcons: folder,
        isDrawerOpen: true
      });
    }
  }

  return (
    <div className="row">
      {images && images.map((img, i) => <div className="col-md-2 mb-3" key={img.name}>
        <div className="card h-100 text-muted">
          <img
            src={baseUrl + img.filename}
            alt={img.name}
            className="card-img-top mb-2"
          />

          <span className="mb-2 fs-14 font-weight-bolder">{img.name}</span>

          <div className="w-100 btn-group" role="group" aria-label="Basic example">

            <Link className="btn btn-light text-muted" to={'/editor/' + folder + '/' + img.filename}>
              <i className="fa fa-cogs"></i>
            </Link>

            <button className="btn btn-light text-muted"
              onClick={() => { onAddToPanel(img.filename); }}>
              <i className="fa fa-plus"></i>
            </button>

          </div>
        </div>


      </div>)}

    </div>
  );
}