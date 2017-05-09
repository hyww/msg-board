import React from 'react';
const Textbox = (props) => (
  <div className={"reply "+(props.hide?"hide":"")}>
    <textarea
      data-id={props.id}
      rows="5"
    ></textarea>
    <a
      className="button"
      data-id={props.id}
      onClick={props.handler}
    >Submit</a>
  </div>
);
export default Textbox;
