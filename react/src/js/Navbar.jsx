import React, { Component } from "react";
import ReactDOM from "react-dom";
import NavItem from "./NavItem.jsx";
import '../styles/modes.css';

class Navbar extends Component {

  render() {
    return (
      <div className={"nav-bar"}>
	<NavItem path="/about" text="about"/>
	<NavItem path="/prompt" text="question"/>
	<NavItem path="/thoughts/" text="thoughts"/>	
      </div>
    );
  }
}

export default Navbar;
