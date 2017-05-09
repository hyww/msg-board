import React, { Component } from 'react';
import './App.css';
import Msg from './Msg.js';

class App extends Component {
  constructor(){
    super();
    this.state={
      data: [
        {
          time: 1494354687000,
          text: 'Hello Root!',
          user: 'test',
          children: [1],
        },
        {
          time: 1494354687000,
          text: 'Hello World!',
          user: 'test',
          children: [],
        },
      ]
    }
  }
  render() {
    return (
      <Msg
        id={0}
        data={this.state.data}
      ></Msg>
    );
  }
}

export default App;
