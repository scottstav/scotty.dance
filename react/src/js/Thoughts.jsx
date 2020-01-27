import React, { Component } from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import '../styles/modes.css';
import FirstPost from '../md/Nietzsche.md';
import Post from "./Post.jsx";
import About from "./About.jsx";
import PostList from "./PostList.jsx";
class Thoughts extends Component {

  constructor() {
    super();

    this.state = {
      posts_map: {
	'12345': {markdown: FirstPost, title: 'Speck of Dust'}
      }
    };
  }

  render() {
    return (
      <div>
	<PostList posts={this.state.posts_map}/>
      
	<Route path={`/thoughts/:postId`} render={props => {
	  return <Post {...props} posts={this.state.posts_map}/>;}}
	/>
      </div>
    )
  }
}

export default Thoughts;
