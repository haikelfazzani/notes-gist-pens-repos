import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../state/GlobalState';

import download from '../utils/download';
import { Link } from 'react-router-dom';

export default function Drawer () {

  const { globalState, setGlobalState } = useContext(GlobalContext);

  const onCloseDrawer = () => {
    setGlobalState({ ...globalState, isDrawerOpen: false });
  }

  const onDownload = () => {
    if (globalState.listSelectedIcons.length > 0) {
      globalState.listSelectedIcons.forEach(img => {
        fetch(img.url)
          .then(r => r.text())
          .then(response => {
            download(response, img.filename);
          });
      });
    }
  }

  const onRemoveIcon = (imgFilename) => {
    let panel = globalState.listSelectedIcons.slice(0);
    panel = panel.filter(p => p.filename !== imgFilename);
    setGlobalState({ ...globalState, listSelectedIcons: panel });
  }

  useEffect(() => {
    document.querySelector('.main').style.width = globalState.isDrawerOpen
      ? 'calc(100% - 250px)'
      : '100%';
  }, [globalState.isDrawerOpen]);

  return (<div className="drawer bg-light border-left"
    style={{ transform: globalState.isDrawerOpen ? 'translateX(0)' : 'translateX(250px)' }}>

    <div className="w-100 d-flex justify-content-between align-items-center fs-14 bg-white border-bottom py-3 mb-3 pl-3 pr-3">
      <span><i className="fa fa-stream"></i> icons ({globalState.listSelectedIcons.length})</span>
      <span className="drawer-close-btn" onClick={onCloseDrawer}><i className="fa fa-times"></i></span>
    </div>


    <ul className="list-unstyled pl-2 pr-2">
      {globalState.listSelectedIcons.length > 0
        && globalState.listSelectedIcons.map(icon =>
          <li className="media d-flex text-left bg-white mb-3 pl-2 pr-2 py-2 border" key={icon.filename}>
            <img src={icon.url} className="mr-2" alt={icon.filename} style={{ width: '35px', height: '35px' }} />
            <div className="w-100 media-body d-flex flex-column">

              <Link className="w-100 fs-14 m-0" to={'/editor/' + globalState.currFolderIcons + '/' + icon.filename}>
                {icon.filename}
              </Link>

              <span className="w-100 drawer-rm-btn fs-10" 
              onClick={() => { onRemoveIcon(icon.filename) }}>
                <i className="fa fa-times"></i> remove
              </span>

            </div>
          </li>)}
    </ul>

    <div className="drawer-footer bg-light py-2 border-top">
      <span className="drawer-close-btn" onClick={onDownload}><i className="fa fa-download"></i></span>
    </div>

  </div>);
}