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
      <div className="socials">
	<a href="mailto:howdy@scotty.dance"> howdy@scotty.dance </a><br></br>
	<a href="https://github.com/scottstav"> github </a><br></br>
	<a href="https://twitter.com/scottscavinsova"> twitter </a> <br></br>
	{iMessageLink}
      </div>
    );
  }
}

export default Socials;
