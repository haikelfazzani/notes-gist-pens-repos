import React, { createContext, useState } from "react";

const GlobalContext = createContext();

const initState = {
  listSelectedIcons: [],
  isDrawerOpen: false
}

function GlobalProvider (props) {
  const [globalState, setGlobalState] = useState(initState);

  return <GlobalContext.Provider value={{ globalState, setGlobalState }}>
    {props.children}
  </GlobalContext.Provider>
}

export { GlobalContext, GlobalProvider };