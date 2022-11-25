import React, { useState } from "react";
import "../assets/task.css";
import edit from "../assets/edit.svg";
// import deleteSVG from "../assets/bin.svg";
import deleteSVG from "../assets/delete.svg";

export default function Task(props) {
  const id = props.id;
  const [isComplete, setIsComplete] = useState(false);

  function handleCheck(event) {
    const { checked } = event.target;
    // is this right???
    setIsComplete(checked);
    // function to api
    // add style to grey out task and out strokethrough
  }
  function handleEdit(event) {
    // call to api
    console.log(id);
  }

  function handleDelete(event) {
    // call to api
    console.log(id);
  }
  return (
    <article className="task" style={{ marginBottom: `${props.margin}px` }}>
      <div className="task__section__title">
        <input
          className="task__check"
          type="checkbox"
          value={isComplete}
          onChange={handleCheck}
        ></input>
        <h1 className="task__title">{props.title}</h1>
      </div>
      <div className="task__section__content">
        <p className="task__content">{props.content}</p>
      </div>
      <div className="task__section__btns">
        <button type="button" onClick={handleDelete} className="task__btn">
          <img className="task__btn__img" src={deleteSVG} alt="delete" />
        </button>
        <button type="button" onClick={handleEdit} className="task__btn">
          <img className="task__btn__img" src={edit} alt="edit" />
        </button>
      </div>
    </article>
  );
}
