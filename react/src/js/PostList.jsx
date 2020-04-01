import React, { Component } from "react";
import ReactDOM from "react-dom";
import { NavLink, Link, Route } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import NavItem from "./NavItem.jsx";
import Post from "./Post.jsx";

import '../styles/modes.css';

class PostList extends Component {

  constructor() {
    super();

    this.state = {
      active: false
    };

    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  mouseEnter() {
    this.setState({active: true})
  }

  mouseLeave() {
    this.setState({active: false})
  }

  render() {
    if (this.state.active) {
      if (!this.props.isLoaded) {
	return (
	  <Spinner animation="grow" size="small" role="status">
	    <span className="sr-only">Loading...</span>
	  </Spinner>
	)
      }
      return (
	<span onMouseLeave={this.mouseLeave}>
	  <NavLink className="nav-item" strict to={this.props.path}>
	    {this.props.text}-
	  </NavLink>

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
	</span>
      );
    } else {
      return (
	<div className="nav-item" onMouseEnter={this.mouseEnter}>
	  <NavLink strict to={this.props.path}>{this.props.text}+</NavLink>
	</div>
      );
    }
  }
}

export default PostList;
