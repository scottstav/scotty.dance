import React, { Component } from "react";
import ReactDOM from "react-dom";
import '../styles/modes.css';
import Answer from "./Answer.jsx";

class Prompt extends Component {

  constructor() {
    super();
    this.state = {
      answers: [],
      loading: true
    };

  }

  componentDidMount() {
    fetch(process.env.API_URL + 'getAnswers')
      .then(res => res.json())
      .then((data) => {
	this.setState({ answers: data.answers })
	this.setState({ loading: false })
      })
      .catch(error => this.setState({loading: false}))
  }

  render() {
    if (this.state.loading) {
      return (
	<div>
	  Loading...
	</div>
      );
      
    }
    
    if (Array.isArray(this.state.answers) && this.state.answers.length) {
      return (
	<div>
	  {this.state.answers.map((answer) => {
            return <Answer text={answer.text} timestamp={answer.timestamp}/>
	  })}
	</div>
      );
    } else {
      return (
	<div>
	  Nothing to see here yet...
	</div>
      );
    }
  }
}

export default Prompt;
