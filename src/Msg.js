import React from 'react';
import Textbox from './Textbox.js';
import {markdown} from 'markdown';
const Msg = (props)=>{
  const id = props.id;
  const msg = props.data[id];
  let m;
  if (id !== 0) {
    m = (
      <div className="msg">
        <div
          className="text"
          dangerouslySetInnerHTML={{__html: markdown.toHTML(msg.text)}}
        ></div>
        <span className="time">{(new Date(msg.time)).toLocaleString("zh-tw", {timeZone:'Asia/Taipei'})}</span>
        <a 
          className="button"
          onClick={(e)=>{
            e.target.classList.add('hide');
            e.target.parentNode.nextSibling.childNodes[0].classList.remove('hide')
          }}
        >
          Reply
        </a>
      </div>
    )
  }
  const ms = props.data[id].children.reverse().map((i)=>{
    return (
        <Msg
          id={i}
          key={i}
          data={props.data}
          handler={props.handler}
        ></Msg>
    )
  });
  return (
    <div className="container">
      {m}
      <div className="children">
        <Textbox
          id={id}
          handler={props.handler}
          hide={id!==0}
        ></Textbox>
        {ms}
      </div>
    </div>
  );
}

export default Msg;
