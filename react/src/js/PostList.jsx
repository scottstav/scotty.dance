import React, { Component } from "react";
import ReactDOM from "react-dom";
import { NavLink, Link, Route } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import Post from "./Post.jsx";

import '../styles/modes.css';

class PostList extends Component {

  render() {
    if (!this.props.isLoaded) {
      return (
	<Spinner animation="border" size="small" role="status">
	  <span className="sr-only">Loading...</span>
	</Spinner>
      )
    }
    return (
      <div className="post-list">
	{this.props.posts.map((value, index) => {
	  let date = new Date(value.created_at);
	  let dateMonth = date.toLocaleString('default', { month: 'long' });
	  let dateYear = date.getFullYear();
	  return (
	    <a href={`#${this.props.path}${value.object_key}`} key={index} className={"post-list-item"}>
	      <span>{value.title}</span>
	      <div><sub>{`${dateMonth} ${dateYear}`}</sub></div>
	      <hr/>
	    </a>
	  );
	})
	}
      </div>
    );
  }
}

export default PostList;
