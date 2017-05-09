import React, { Component } from 'react';
import './App.css';
import Msg from './Msg.js';
const server = process.env.PUBLIC_URL;

class App extends Component {
  constructor(){
    super();
    this.state={
      data: [
        {
          children: [],
        }
      ]
    };
    this.onClick = this.onClick.bind(this);
  }
  render() {
    return (
      <Msg
        id={0}
        data={this.state.data}
        handler={this.onClick}
      ></Msg>
    );
  }
  onClick(e) {
    const id = e.target.dataset.id;
    const body = {
      parent_id: id,
      text: e.target.previousSibling.value,
      user: 'u'
    }
    fetch(server+'/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    }).then(()=>this.load());
  }
  load() {
    fetch(server+'/api/comments')
      .then(res=>{
        console.log(res);
        if (!res.ok)
          throw res.status;
        return res.json();
      }).then(json=>{
        this.setState({ data: json});
      }).catch((e)=>{
        console.log("Error: "+e);
      });
  }
  componentDidMount() {
    this.load();
  }
}

export default App;
