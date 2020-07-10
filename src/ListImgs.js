import React from 'react';
import { useState } from 'react';
import download from './utils/download';
import copyToClipboard from './utils/copyToClipboard';

export default function ListImgs ({ images, baseUrl }) {

  const [isCopied, setIsCopied] = useState(false);

  const onDownload = (imgFilename) => {
    fetch(baseUrl + imgFilename)
      .then(r => r.text())
      .then(response => {
        download(response, imgFilename);
      });
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
            <button className="btn btn-light" onClick={() => { onCopy(img.filename); }}>
              <i className={"fa fa-copy " + (isCopied ? "text-success" : "")}></i>
            </button>

            <button className="btn btn-light" onClick={() => { onDownload(img.filename); }}>
              <i className="fa fa-download text-muted"></i>
            </button>

          </div>
        </div>
      </div>)}
    </div>
  );
}