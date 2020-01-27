import React, { Component } from "react";
import ReactDOM from "react-dom";
import '../styles/modes.css';
import ReactMarkdown from "react-markdown/with-html";

class Post extends Component {

  render() {
    let postId = this.props.match.params.postId;
    let post = this.props.posts[postId];

    return (
      <div className={"post"}>
	<ReactMarkdown source={post.markdown} escapeHtml={false}/>
      </div>
    );
  }
}

export default Post;
