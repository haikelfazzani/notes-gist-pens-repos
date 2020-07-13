import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-svg";
import "ace-builds/src-noconflict/theme-monokai";

import "ace-builds/src-noconflict/ext-language_tools";
import download from '../utils/download';
import copyToClipboard from '../utils/copyToClipboard';
import svgExample from '../utils/svgExample';

export default function Editor () {

  const { folder, filename } = useParams();

  const [srcIconSvg, setSrcIconSvg] = useState(svgExample);
  const [svgFilename, setSvgFilename] = useState('example.svg');

  useEffect(() => {

    if (folder && filename) {

      setSvgFilename(filename);

      fetch(window.location.origin + '/' + folder + '/' + filename)
        .then(r => r.text())
        .then(response => {
          setSrcIconSvg(response);
        });
    }
  }, [folder, filename]);

  const onChange = (newValue) => {
    setSrcIconSvg(newValue);
  }

  const onDownload = () => {
    download(srcIconSvg.trim(), svgFilename);
  }

  const onSvgToImg = (imageType) => {
    const canvas = document.createElement('canvas');

    let blob = new Blob([srcIconSvg.trim()], { type: 'image/svg+xml;charset=utf-8' });
    let URL = window.URL || window.webkitURL || window;
    let blobURL = URL.createObjectURL(blob);
    let img = new Image();

    img.onload = function () {

      canvas.width = img.width;
      canvas.height = img.height;

      canvas.getContext('2d').drawImage(img, 0, 0);
      let jpeg = canvas.toDataURL('image/' + imageType);

      download(jpeg, svgFilename, imageType);
    }
    img.src = blobURL;
  }

  const onCopy = () => {
    if (folder && filename) {
      copyToClipboard(window.location.origin + '/' + folder + '/' + filename);
    }
  }

  return (<div className="editor container py-5">

    <div className="svg-display mb-5" dangerouslySetInnerHTML={{ __html: srcIconSvg }} />

    <button onClick={onCopy} className="btn btn-dark fs-14 mb-3 mr-3">
      <i className="fa fa-link"></i> COPY
    </button>

    <button onClick={onDownload} className="btn btn-primary fs-14 mb-3 mr-3">
      <i className="fa fa-download"></i> SVG
    </button>

    <button onClick={() => { onSvgToImg('png') }} className="btn btn-primary fs-14 mb-3 mr-3">
      <i className="fa fa-download"></i> PNG
    </button>

    <button onClick={() => { onSvgToImg('jpg') }} className="btn btn-primary fs-14 mb-3">
      <i className="fa fa-download"></i> JPG
    </button>

    <AceEditor
      mode="svg"
      theme="monokai"
      onChange={onChange}
      value={srcIconSvg}
      name="svg-editor"
      height="200px"
      width="100%"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
        useWorker: false
      }}
    />

  </div>);
}