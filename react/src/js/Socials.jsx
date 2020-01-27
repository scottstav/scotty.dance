import React, { Component } from "react";
import ReactDOM from "react-dom";

class Socials extends Component {
  render() {
    let isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
    let isIOS = navigator.platform.match(/(iPhone|iPod|iPad)/i)?true:false;
    let iMessageLink;
    if (isMac) {
      iMessageLink = <a href="imessage:scottstavinoha@gmail.com"> iMessage 💻</a>
    } else if (isIOS) {
      iMessageLink = <a href="sms:scottstavinoha@gmail.com"> iMessage 📱</a>
    } else {
      iMessageLink = <div></div>
    }
    return (
      <div>
	<span><a href="mailto:howdy@scotty.dance"> howdy@scotty.dance</a></span>|
	<span><a href="https://github.com/scottstav"> github</a></span>|
	<span><a href="https://twitter.com/scottscavinsova"> twitter</a></span>|
	<span>{iMessageLink}</span>
      </div>
    );
  }
}

export default Socials;
