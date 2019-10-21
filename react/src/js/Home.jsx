import React, { Component, Header } from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Route} from 'react-router-dom';
import Navbar from "./Navbar.jsx";
import About from "./About.jsx";
import '../styles/modes.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'black'
    };
  }
  
  render() {
    document.body.className = this.state.mode;
    return (
      <Router>
	<div className={this.state.mode}>
	  <Navbar/>
	  <Route exact path="/" component={About} />
	</div>
      </Router>
    );
  }
}

export default Home;
