import React, { Component, Header } from "react";
import ReactDOM from "react-dom";
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import SocialsContainer from "./SocialsContainer.jsx";
import Post from "./Post.jsx";

class About extends Component {

  render() {
    return (
      <div className="about">
	<p>
	  Hi! I'm Scott <OverlayTrigger
			  placement="top"
			  delay={{ show: 100, hide: 300 }}
			  trigger={['click', 'hover']}
			  overlay={<Tooltip>"sta-vi-no-uh"</Tooltip>}
			>
	  <u>Stavinoha</u>
	  </OverlayTrigger>
	</p>
	<div style={{ display: "inline-block", textAlign: "left"}}>

	  💻
	  Programmer
	  <br/>

	  📍
	  Texas, mostly
	  <br/>

	  ✉️
	  <i> <a href="mailto:howdy@scotty.dance">howdy@scotty.dance</a></i>
	  <br/>
	</div>
	<p></p>
	{this.props.latestPost}
      </div>
    );
  }
}

export default About;
