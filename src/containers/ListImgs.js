import React, { useContext, useState } from 'react';

import copyToClipboard from '../utils/copyToClipboard';
import { GlobalContext } from '../state/GlobalState';

export default function ListImgs ({ images, baseUrl }) {

  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [isCopied, setIsCopied] = useState(false);

  const onAddToPanel = (imgFilename) => {
    let panel = globalState.listSelectedIcons.slice(0);
    if (!panel.some(p => p.filename.startsWith(imgFilename))) {
      panel.push({ filename: imgFilename, url: baseUrl + imgFilename });
      setGlobalState({ ...globalState, listSelectedIcons: panel, isDrawerOpen: true });
    }
  }

  const onCopy = (imgFilename) => {
    copyToClipboard(baseUrl + imgFilename);
    //setIsCopied(true);
  }

  return (
    <div className="row">
      {images && images.map(img => <div className="col-md-2 mb-3" key={img.name}>
        <div className="card h-100">
          <img
            src={baseUrl + img.filename}
            alt={img.name}
            className="card-img-top mb-2"
          />

          <span className="text-muted mb-2">{img.name}</span>

          <div className="w-100 btn-group" role="group" aria-label="Basic example">
            <button className="btn btn-light text-muted" onClick={() => { onCopy(img.filename); }}>
              <i className={"fa fa-copy " + (isCopied ? "text-success" : "")}></i>
            </button>

            <button className="btn btn-light text-muted" onClick={() => { onAddToPanel(img.filename); }}>
              <i className="fa fa-plus"></i>
            </button>

          </div>
        </div>
      </div>)}
    </div>
  );
}