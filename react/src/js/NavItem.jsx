import React, { Component, Header } from "react";
import ReactDOM from "react-dom";
import { NavLink } from 'react-router-dom'

import '../styles/modes.css';

class NavItem extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="nav-item">
	<NavLink strict to={this.props.path}>{this.props.text}
	</NavLink>
      </div>
    );
  }
}

export default NavItem;
