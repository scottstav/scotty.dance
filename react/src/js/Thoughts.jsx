import React, { Component } from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import '../styles/modes.css';
import Spinner from 'react-bootstrap/Spinner';
import Post from "./Post.jsx";
import About from "./About.jsx";


class Thoughts extends Component {

  render() {
    if (!this.props.isLoaded) {
      return (
	<Spinner animation="grow" role="status">
	  <span className="sr-only">Loading...</span>
	</Spinner>
      )
    }
    return (
      <div>
	<Route path={`/p/:postId`} render={props => {
	  return <Post {...props} posts={this.props.posts}/>;}}
	/>
      </div>
    )
  }
}

export default Thoughts;
