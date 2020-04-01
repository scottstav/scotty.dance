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
	    delay={{ show: 250, hide: 400 }}
	    overlay={<Tooltip>"sta-vi-no-uh"</Tooltip>}
	  >
	  <a href="#">Stavinoha</a>
	  </OverlayTrigger>.
	</p>
	<ul style={{listStyle: "none", display: "inline-block", textAlign: "left"}}>
	  <li>
	    💻
	    Programmer
	  </li>
	  <li>
	    📍
	    Texas, mostly
	  </li>
	  <li>
	    ✉️
	    <i> <a href="mailto:howdy@scotty.dance">howdy@scotty.dance</a></i>
	  </li>
	</ul>
	<p></p>
	{this.props.latestPost}
      </div>


    );
  }
}

export default About;
