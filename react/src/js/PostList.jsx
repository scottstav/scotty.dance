import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import NavItem from "./NavItem.jsx";
import '../styles/modes.css';

class PostList extends Component {

  render() {
    return (
      <div className={"post-list"}>
	Posts: 
	{Object.keys(this.props.posts).map((value, index) => {
	  return (
	    <span key={value} className={"post-list-item"}>
	      <NavItem path={`/thoughts/${value}`} text={this.props.posts[value].title}/>
	    </span>
	  )
	})}
      </div>
    );
  }
}

export default PostList;
