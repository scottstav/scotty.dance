import React, { Component } from "react";
import ReactDOM from "react-dom";
import '../styles/modes.css';

class Answer extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div>
	{this.props.text}
      </div>
    );
  }
}

export default Answer;
