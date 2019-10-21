import React, { Component, Header } from "react";
import ReactDOM from "react-dom";
import { NavLink } from 'react-router-dom'

class NavItem extends Component {
  constructor() {
    super();

    this.state = {
      hovered: false
    };

  }

  mouseEnter() {
    console.log("hovered");
  }

  mouseLeave() {
    console.log("left");
  }
  
  render() {
    return (
      <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
	<NavLink to="/">{this.props.text}</NavLink>
      </div>
    );
  }
}

export default NavItem;
