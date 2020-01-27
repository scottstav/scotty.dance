import React, { Component, Header } from "react";
import ReactDOM from "react-dom";
import { NavLink } from 'react-router-dom'
import '../styles/modes.css';

class NavItem extends Component {
  constructor() {
    super();
  }

  mouseEnter() {
    //console.log("hovered");
  }

  mouseLeave() {
    //console.log("left");
  }
  
  render() {
    return (
      <span className="nav-item" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
	<NavLink
	  strict to={this.props.path}>{this.props.text}</NavLink>
      </span>
    );
  }
}

export default NavItem;
