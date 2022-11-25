import React, { useState } from "react";
import "../assets/task.css";
import edit from "../assets/edit.svg";
// import deleteSVG from "../assets/bin.svg";
import deleteSVG from "../assets/delete.svg";
import fetchDeleteOneTask from "./utils/tasks/fetchDeleteOneTask";
export default function Task(props) {
  const id = props.id;
  const [isComplete, setIsComplete] = useState(false);
  const [taskEdit, setTaskEdit] = useState({
    title: props.title,
    content: props.content,
    isEdit: false,
  });
  // const [isEdit, setIsEdit] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setTaskEdit((setTaskEdit) => {
      return {
        ...setTaskEdit,
        [name]: value,
      };
    });
  }
  function handleCheck(event) {
    const { checked } = event.target;
    // is this right???
    setIsComplete(checked);
    // function to api
    // add style to grey out task and out strokethrough
  }

  function handleEdit(event) {
    setTaskEdit((prevTask) => {
      return { ...prevTask, isEdit: !prevTask.isEdit };
    });
    // call to api
    // if button with id edit - change isEdit to true and change src/id/alt to save
    // if button with id save - api path request - change isEdit to false, change svg src/alt/id to edit
    console.log(id);
  }

  async function handleDelete(event) {
    await fetchDeleteOneTask(id);
    event.target.parentElement.parentElement.parentElement.remove();
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
        {taskEdit.isEdit && (
          <input value={taskEdit.title} name="title" onChange={handleChange} />
        )}
        {!taskEdit.isEdit && <h1 className="task__title">{taskEdit.title}</h1>}
      </div>
      <div className="task__section__content">
        {taskEdit.isEdit && (
          <textarea
            value={taskEdit.content ? taskEdit.content : " "}
            name="content"
            onChange={handleChange}
          />
        )}
        {!taskEdit.isEdit && (
          <p className="task__content">{taskEdit.content} </p>
        )}
      </div>
      <div className="task__section__btns">
        <button type="button" onClick={handleDelete} className="task__btn">
          <img className="task__btn__img" src={deleteSVG} alt="delete" />
        </button>
        <button type="button" onClick={handleEdit} className="task__btn">
          <img className="task__btn__img" src={edit} alt="edit" id="edit" />
        </button>
      </div>
    </article>
  );
}
