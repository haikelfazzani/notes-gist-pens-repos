import React, { useState, useRef, useEffect } from 'react';
import AceEditor from "react-ace";
import Split from 'react-split'

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";

import "ace-builds/src-noconflict/ext-language_tools";

const jsBeautyOptions = { 'indent_size': 2 };

const genTemp = (animName = '', animCss = '') => `<img class="${animName}" src="https://i.ibb.co/CvBXsys/logo192.png" alt="Incofy" />
<style>

  ${animCss}

  body{
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
</style>`;

export default function Animos () {

  const [htmlValue, setHtmlValue] = useState(genTemp());
  const [cssAnimations, setCssAnimations] = useState(null);
  const htmlIframe = useRef();

  useEffect(() => {
    fetch('https://bitbucket.org/haikel2090/css-animations/raw/7d8019130872a0613ed152db98fafb5ee4977947/animations.json')
      .then(r => r.json())
      .then(resp => {
        setCssAnimations(resp)
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const onChange = (newValue) => {
    setHtmlValue(newValue);
  }

  const onRunCode = () => {
    let iframeDoc = htmlIframe.current.contentDocument;

    iframeDoc.open();
    iframeDoc.write(htmlValue);
    iframeDoc.close();
  }

  const onFormat = () => {
    let newValue = window.html_beautify(htmlValue, jsBeautyOptions);
    setHtmlValue(newValue);
  }

  const onAnimationChange = (e) => {
    let animation = cssAnimations.find(a => a.name === e.target.value);
    let cssFormated = window.css_beautify(animation.css, jsBeautyOptions);

    setHtmlValue(genTemp(animation.name, cssFormated));
  }

  const onCopy = () => { }

  return (<div className="container py-5 text-left">

    <div className="d-flex mb-3">
      <button onClick={onRunCode} className="btn btn-dark mr-3"><i className="fa fa-play"></i></button>
      <button onClick={onFormat} className="btn btn-dark mr-3"><i className="fa fa-stream"></i></button>
      <button onClick={onCopy} className="btn btn-dark mr-3"><i className="fa fa-copy"></i></button>

      {cssAnimations
        && <select className="form-select" onChange={onAnimationChange}>
          {cssAnimations.map(anim => <option value={anim.name} key={anim.name}>{anim.name}</option>)}
        </select>}
    </div>

    <div className="animos">
      <Split
        sizes={[50, 50]}
        minSize={100}
        gutterSize={5}
        gutterAlign="center"
        direction="horizontal"
      >
        <AceEditor
          mode="html"
          theme="monokai"
          onChange={onChange}
          value={htmlValue}
          name="html-editor"
          height="500px"
          width="100%"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            fontSize: 14,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
            useWorker: false
          }}
        />
        <iframe title="html editor" ref={htmlIframe} className="border"></iframe>
      </Split>
    </div>

  </div>);
}