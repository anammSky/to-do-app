import React from "react";
import PropTypes from "prop-types";
import Task from "./Task";
import { useState, useEffect } from "react";
import fetchGetAllTasks from "./utils/fetGetAllTasks";
import AddTask from "./AddTask";

const Main = (props) => {
  const [taskInfo, setTaskInfo] = useState({
    title: "This is your first Task",
    content: "What would you like to do?",
  });
  useEffect(() => {
    let mounted = true;

    fetchGetAllTasks().then((data) => {
      if (mounted) {
        setTaskInfo(data.result);
      }
    });
    return () => (mounted = false);
  }, []);

  const columnWrapper = {};
  const result = [];
  // create columns
  for (let i = 0; i < props.columns; i++) {
    columnWrapper[`column${i}`] = [];
  }
  // divide children into columns
  for (let i = 0; i < taskInfo.length; i++) {
    const columnIndex = i % props.columns;
    const { title, content } = taskInfo[i];

    columnWrapper[`column${columnIndex}`].push(
      <Task key={i} margin={props.gap} title={title} content={content} />
    );
  }
  // wrap children in each column with a div
  for (let i = 0; i < props.columns; i++) {
    result.push(
      <article
        key={i}
        style={{
          marginLeft: `${i > 0 ? props.gap : 0}px`,
          flex: 1,
        }}
      >
        {columnWrapper[`column${i}`]}
      </article>
    );
  }

  const [isShown, setIsShown] = useState(false);
  function toggleShown() {
    setIsShown((prevShown) => !prevShown);
  }

  return (
    <main className="tasks__main">
      <section className="task__bntAdd__container">
        {!isShown && (
          <button className="btn" onClick={toggleShown}>
            Add Task
          </button>
        )}
      </section>
      {isShown && <AddTask handleClick={toggleShown} />}
      <div style={{ display: "flex" }}>{result}</div>
    </main>
  );
};

Main.propTypes = {
  columns: PropTypes.number.isRequired,
  gap: PropTypes.number.isRequired,
  // children: PropTypes.arrayOf(PropTypes.element),
};

Main.defaultProps = {
  columns: 2,
  gap: 20,
};

export default Main;
