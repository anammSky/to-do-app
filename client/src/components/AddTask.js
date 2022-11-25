import React from "react";
import { useState } from "react";
import fetchPatchOneTask from "./utils/tasks/fetchPatchOneTask";

export default function AddTask(props) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  // do something about passwords
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    fetchPatchOneTask(formData.title, formData.content)
    props.handleClick();
  }
  return (
    <section className="add-task__container">
      <form className="add-task__form">
        <label className="add-task__label" htmlFor="title">
          New Task:
        </label>
        <input
          className="add-task__input"
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        ></input>
        <label className="add-task__label" htmlFor="content">
          To-Do:
        </label>
        <textarea
          className="add-task__input"
          // type="textarea "
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
        <label className="add-task__label" htmlFor="password">
          Tags:
        </label>
        <input
          className="add-task__input"
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
        ></input>
        <section className="add-task__section__btn">
          <button
            onClick={handleSubmit}
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
