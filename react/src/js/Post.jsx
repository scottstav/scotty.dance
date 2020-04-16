import React, { Component } from "react";
import ReactDOM from "react-dom";
import '../styles/modes.css';
import ReactMarkdown from "react-markdown";

class Post extends Component {

  getFileExtension(s) {
    let patt1 = /\.([0-9a-z]+)(?:[\?#]|$)/i;
    let fileExtensions = [];
    if (s && s.match(patt1)) {
      fileExtensions = s.match(patt1);
    }
    return fileExtensions;
  }

  render() {
    let postId = this.props.postId ? this.props.postId : this.props.match.params.postId;
    let post = this.props.posts.filter(function(p) { return p.object_key == postId; })[0];
    const renderers = {
      code: (props) => {
	return(
	  <pre className="prettyprint">
            {props.value}
	  </pre>
	);
      },
      link: (props) => {
	let fileExtensions = this.getFileExtension(props.href);
	if (fileExtensions.includes("ogg") || fileExtensions.includes("m4a")) {
	  return(
	    <span className="audio-player">
	      <i className="fas fa-music" aria-hidden="true"></i>
	      <br/>
	      {props.children[0].props.value}
	      <audio
		controls
		src={props.href}>
		Your browser does not support the
		<code>audio</code> element.
	      </audio>
	    </span>
	  );
	} else {
	  return (
	    <a href={props.href}>{props.children[0].props.value}</a>
	  );
	}
      },
      image: (props) => {
	let fileExtensions = this.getFileExtension(props.src);
	if (fileExtensions.includes("mov") || fileExtensions.includes("mp4")) {
	  return(
	    <video
	      muted
	      controls
	      src={props.src}>
	      Your browser does not support the
	      <code>video</code> element. So you are missing out on
	      <b>{props.alt}</b>
	    </video>
	  );
	} else {
	  return (
	    <img src={props.src} alt={props.alt}></img>
	  );
	}
      }
    }

    return (
      <div>
	<div className="posts-back-button">
	  <a href="#/p/">{"< back"}</a>
	</div>
	<hr/>
	<div className={"post"}>
	  <ReactMarkdown source={post.markdown} renderers={renderers}/>
	</div>
      </div>
    );
  }
}

export default Post;
