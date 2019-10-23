import React, { Component, Header } from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Route} from 'react-router-dom';
import Navbar from "./Navbar.jsx";
import About from "./About.jsx";
import Socials from "./Socials.jsx";
import '../styles/modes.css';

class Home extends Component {

  constructor() {
    super();
    this.themes = ['black', 'white'];
    this.state = {
      mode: 1
    };
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  toggleTheme() {
    this.setState({mode: (this.state.mode + 1) % 2})
  }
  
  render() {
    let className = this.themes[this.state.mode];
    document.body.className = className;
    return (
      <div>
	<Router>
	  <Navbar/>
	  <Route exact path="/" component={About} />
	</Router>
	<Socials/>
	<br></br>
	<div id='toggle-theme'>
	  <a href='#' onClick={this.toggleTheme}> 🔄 </a>
	</div>
      </div>
    );
  }
}

export default Home;
