import React from 'react';
import Textbox from './Textbox.js';
const Msg = (props)=>{
  const id = props.id;
  const msg = props.data[id];
  let m;
  if (id !== 0) {
    m = (
      <div className="msg">
        {msg.user}
        {msg.text}
        {(new Date(msg.time)).toLocaleString("zh-tw", {timeZone:'Asia/Taipei'})}
      </div>
    )
  }
  const ms = props.data[id].children.map((i)=>{
    return (
        <Msg
          id={i}
          key={i}
          data={props.data}
        ></Msg>
    )
  });
  return (
    <div className="container">
      {m}
      <div className="children">
        {ms}
      </div>
      <Textbox
        id={id}
      ></Textbox>
    </div>
  );
}

export default Msg;
