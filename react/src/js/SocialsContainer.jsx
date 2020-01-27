import React, { Component } from "react";
import ReactDOM from "react-dom";
import Socials from "./Socials.jsx";

class SocialsContainer extends Component {
  constructor() {
    super();

    this.state = {
      active: false
    };

    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);

  }

  mouseEnter() {
    this.setState({active: true})
  }

  mouseLeave() {
    this.setState({active: false})
  }
  
  render() {

    if (this.state.active) {
      return (
	<div className={"socials"} onMouseLeave={this.mouseLeave}>
	  <Socials/>
	</div>
      );
    } else {
      return (
	<div className={"socials"} onMouseEnter={this.mouseEnter}>
	  socials
	</div>
      );
    }
  }
}

export default SocialsContainer;
