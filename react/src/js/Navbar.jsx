import React, { Component } from "react";
import ReactDOM from "react-dom";
import NavItem from "./NavItem.jsx";
import PostList from "./PostList.jsx";
import '../styles/modes.css';

class Navbar extends Component {

  render() {
    return (
      <div className={"nav-bar"}>
	<NavItem path="/about" text="about"/>
	|
	<PostList path="/p/" text="posts" posts={this.props.posts} isLoaded={this.props.isLoaded}/>
      </div>
    );
  }
}

export default Navbar;
