import React, { Component } from "react";
import ReactDOM from "react-dom";
import { NavLink, Link, Route } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import NavItem from "./NavItem.jsx";
import Post from "./Post.jsx";

import '../styles/modes.css';

class PostList extends Component {

  render() {
    if (!this.props.isLoaded) {
      return (
	<Spinner animation="grow" size="small" role="status">
	  <span className="sr-only">Loading...</span>
	</Spinner>
      )
    }
    return (
      <div className="post-list">
	{this.props.posts.map((value, index) => {
	  return (
	    <span key={index} className={"post-list-item"}>
	      <NavLink strict to={`${this.props.path}${value.object_key}`} >{value.title}</NavLink>
	    </span>
	  );
	})
	}
      </div>
    );
  }
}

export default PostList;
