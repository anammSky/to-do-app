import React from "react";

export default function AddTask(props) {
  return (
    <section className="add-task__container">
      <form className="add-task__form">
        <label className="add-task__label" htmlFor="title">
          New Task:
        </label>
        <input
          className="add-task__input"
          type="text"
          id="New Task"
          name="New Task"
        ></input>
        <label className="add-task__label" htmlFor="password">
          To-Do:
        </label>
        <textarea
          className="add-task__input"
          // type="textarea "
          id="To-Do"
          name="To-Do"
        ></textarea>
        <label className="add-task__label" htmlFor="password">
          Tags:
        </label>
        <input
          className="add-task__input"
          type="text"
          id="Tags"
          name="Tags"
        ></input>
        <section className="add-task__section__btn">
          <button
            onClick={props.handleClick}
            className="btn add-task__btn"
            id="btnAdd-task"
          >
            Add
          </button>
          <button
            onClick={props.handleClick}
            className="btn btn--danger login__btn"
          >
            Cancel
          </button>
        </section>
      </form>
    </section>
  );
}
