import React from "react";
import "../assets/task.css";
import edit from "../assets/edit.svg";
import deleteSVG from "../assets/bin.svg";

export default function Task(props) {
  return (
    <div className="task" style={{ marginBottom: `${props.margin}px` }}>
      <div className="task__section__title">
        <input className="task__check" type="checkbox"></input>
        <h1 className="task__title">{props.title}</h1>
      </div>
      <div className="task__section__content">
        <p className="task__content">{props.content}</p>
      </div>
      <div className="task__section__btns">
        <button className="task__btn">
          <img src={deleteSVG} alt="delete" />
        </button>
        <button className="task__btn">
          <img src={edit} alt="edit" />
        </button>
      </div>
    </div>
  );
}
