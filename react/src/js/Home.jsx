import React, { Component } from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Sidebar from "react-sidebar";
import Navbar from "./Navbar.jsx";
import About from "./About.jsx";
import Thoughts from "./Thoughts.jsx";
import Post from "./Post.jsx";
import Socials from "./Socials.jsx";

import '../styles/modes.css';

const mql = window.matchMedia(`(min-width: 800px)`);

class Home extends Component {

  constructor() {
    super();
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      posts: [],
      isLoaded: false,
      latestPost: <div></div>
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentDidMount() {
    console.log(`Fetching posts from ${process.env.API_URL}`);
    fetch(`${process.env.API_URL}/posts`)
      .then(res => res.json())
      .then(
        (result) => {
	  console.log("Loaded content");
	  let statusPostArray = result.posts.splice(0, 1);
	  let statusPostKey = statusPostArray[0].object_key;
          this.setState({
            isLoaded: true,
            posts: result.posts,
	    latestPost: <Post postId={statusPostKey} posts={statusPostArray}/>
          });
        },
        (error) => {
          this.setState({
            isLoaded: true
          });
	  console.log(error);
        }
      )
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen});
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  render() {
    let infoButton;
    if (this.state.sidebarDocked || this.state.sidebarOpen) {
      infoButton =
	<div></div>
    } else {
      infoButton =
	<i className="fas fa-info-circle info-button" aria-hidden="true"></i>
    }

    return (
      <div>
	<Router>
	  <Sidebar sidebarClassName="sidebar" rootClassName="root"
		   sidebar = {
		     <div>
		       <Socials/>
		     </div>
		   }
		   open={this.state.sidebarOpen}
		   docked={this.state.sidebarDocked}
		   onSetOpen={this.onSetSidebarOpen}
		   pullRight={true}
	  >
	    <span onClick={() => this.onSetSidebarOpen()}>
	      {infoButton}
            </span>
	    <Navbar posts={this.state.posts} isLoaded={this.state.isLoaded}/>
	    <div className={"main-content"}>
	      <Switch>
		<Route exact path="/about" render={(props) => <About {...props} latestPost={this.state.latestPost}/>}/>
		<Route path="/p" render =
		  {(props) => <Thoughts {...props}  posts={this.state.posts} isLoaded={this.state.isLoaded}/>}/>
		<Route exact path="/">
		  <Redirect to="/about" />
		</Route>
	      </Switch>
	    </div>
	  </Sidebar>
	</Router>
      </div>

    );
  }
}

export default Home;
