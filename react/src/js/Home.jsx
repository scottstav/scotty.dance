import React, { Component, Header } from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import FlexView from 'flexview';
import Navbar from "./Navbar.jsx";
import About from "./About.jsx";
import Prompt from "./Prompt.jsx";
import Thoughts from "./Thoughts.jsx";
import SocialsContainer from "./SocialsContainer.jsx";
import '../styles/modes.css';

class Home extends Component {

  constructor() {
    super();
    this.themes = ['black', 'white'];
    this.state = {
      mode: 0
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
      <FlexView column >
	<Router>
	  <FlexView height={50} >
	    <Navbar/>
	    <SocialsContainer/>
	  </FlexView>
	  <FlexView className={"main-content"} height={200}>
	    <Switch>
	      <Route exact path="/about" component={About} />
	      <Route path="/thoughts" component={Thoughts} />
	      <Route exact path="/prompt" component={Prompt} />
	      <Route exact path="/">
		<Redirect to="/about" />
              </Route>
	    </Switch>
	  </FlexView>
	</Router>

	{/* this is broken :/ */}
	{/* <div id='toggle-theme'>
	    <a href='#' onClick={this.toggleTheme}> 🔄 </a>
	    </div> */}
      </FlexView>

    );
  }
}

export default Home;
