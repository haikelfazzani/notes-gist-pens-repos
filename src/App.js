import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Drawer from "./components/Drawer";
import Editor from "./pages/Editor";
import Animos from "./pages/Animos";

export default function App () {

  return (<main className="main">
    <Router>
      
      <Navbar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route exact path="/animos" component={Animos} />

        <Route exact path="/editor" component={Editor} />

        <Route path="/editor/:folder/:filename" component={Editor} />
        
        <Redirect from="*" to="/" />
      </Switch>

      <Drawer />

      <Footer />

    </Router>  
  </main>);
} 
