import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";

export default function App () {

  return (<main className="main">
    <Router>
      <Navbar />


      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        
        <Redirect from="*" to="/" />
      </Switch>

      <Footer />

    </Router>  
  </main>);
} 
