import React, { Component } from "react";
import ReactDOM from "react-dom";

class Socials extends Component {

  render() {
    let isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
    let isIOS = navigator.platform.match(/(iPhone|iPod|iPad)/i)?true:false;
    let iMessageLink;
    if (isMac) {
      iMessageLink = <a href="imessage:scottstavinoha@gmail.com"><i className="fa fa-comment"></i></a>
    } else if (isIOS) {
      iMessageLink = <a href="sms:scottstavinoha@gmail.com"><i className="fa fa-comment"></i></a>
    } else {
      iMessageLink = <div></div>
    }
    return (
      <div id="socials">
	<div><a href="mailto:howdy@scotty.dance"><i className="fas fa-envelope"></i></a></div>
	<div><a href="https://github.com/scottstav"><i className="fab fa-github"></i></a></div>
	<div><a href="https://twitter.com/awkwardnessful"><i className="fab fa-twitter"></i></a></div>
	<div><a href="https://keybase.io/scottstav"><i className="fab fa-keybase"></i></a></div>
	<div><a href="https://www.linkedin.com/in/scottstav/"><i className="fab fa-linkedin"></i></a></div>
	<div><a href="https://untappd.com/user/scottstav"><i class="fab fa-untappd"></i></a></div>
	<div>{iMessageLink}</div>
      </div>
    );
  }
}

export default Socials;
