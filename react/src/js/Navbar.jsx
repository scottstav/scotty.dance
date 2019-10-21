import React, { Component } from "react";
import ReactDOM from "react-dom";
import NavItem from "./NavItem.jsx";
import '../styles/modes.css';

class Navbar extends Component {

  render() {
    return (
      <div className="navbar">
      <ul>
	<li>
	  <NavItem path="/" text="about"/>
	</li>
      </ul>
      </div>
    );
  }
}

export default Navbar;
