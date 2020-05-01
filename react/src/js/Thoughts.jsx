import React, { Component } from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import '../styles/modes.css';
import Spinner from 'react-bootstrap/Spinner';
import PostList from "./PostList.jsx";
import Post from "./Post.jsx";
import About from "./About.jsx";


class Thoughts extends Component {

  render() {
    if (!this.props.isLoaded) {
      return (
	<Spinner animation="border" role="status">
	  <span className="sr-only">Loading...</span>
	</Spinner>
      )
    }
    return (
      <div>
	<Router>
	  <Switch>
	    <PostList exact path="/p/" text="posts" posts={this.props.posts} isLoaded={this.props.isLoaded}/>
	    <Route exact path={`/p/:postId`} render={props => {
	      return <Post {...props} posts={this.props.posts}/>;}}
	    />
	  </Switch>
	</Router>
      </div>
    )
  }
}

export default Thoughts;
