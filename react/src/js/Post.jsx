import React, { Component } from "react";
import ReactDOM from "react-dom";
import '../styles/modes.css';
import ReactMarkdown from "react-markdown";

class Post extends Component {

  render() {
    let postId = this.props.postId ? this.props.postId : this.props.match.params.postId;
    let post = this.props.posts.filter(function(p) { return p.object_key == postId; })[0];
    const renderers = {
      code: (props) => {
	console.log(props);
	return(
	  <pre className="prettyprint">
            {props.value}
	  </pre>
	);
      }
    }

    return (
      <div>
	<div className="posts-back-button">
	  <a href="#/p/">{"< back"}</a>
	</div>
	<div className={"post"}>
	  <ReactMarkdown source={post.markdown} renderers={renderers}/>
	</div>
      </div>
    );
  }
}

export default Post;
