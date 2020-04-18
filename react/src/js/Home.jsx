import React, { Component } from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Navbar from "./Navbar.jsx";
import About from "./About.jsx";
import Thoughts from "./Thoughts.jsx";
import Post from "./Post.jsx";
import Socials from "./Socials.jsx";
import Minecraft from "./Minecraft.jsx";
import '../styles/modes.css';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      posts: [],
      isLoaded: false,
      latestPost: <div></div>,
    };
  }

  componentDidMount() {
    fetch(`${process.env.API_URL}/posts`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            posts: result.posts,
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

  render() {
    return (
      <div>
	<Socials/>
	<Router>
	  <Navbar posts={this.state.posts} isLoaded={this.state.isLoaded}/>
	  <div className={"main-content"}>
	    <Switch>
	      <Route exact path="/about" render={(props) => <About {...props} latestPost={this.state.latestPost}/>}/>
	      <Route path="/p" render ={(props) => <Thoughts {...props}  posts={this.state.posts} isLoaded={this.state.isLoaded}/>}/>
	      <Route path="/minecraft"><Minecraft/></Route>
	      <Route exact path="/">
		<Redirect to="/about" />
	      </Route>
	    </Switch>
	  </div>
	</Router>
      </div>

    );
  }
}

export default Home;
