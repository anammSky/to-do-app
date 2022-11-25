import React from "react";
import PropTypes from "prop-types";
import Task from "./Task";
import { useState, useEffect } from "react";
import fetchGetAllTasksOfUser from "./utils/tasks/fetchGetAllTasksOfUser";
import Cookies from "universal-cookie";

const WaterfallLayout = (props) => {
  const [taskInfo, setTaskInfo] = useState({
    title: "This is your first Task",
    content: "What would you like to do?",
  });

  useEffect(() => {
    let mounted = true;
    const cookies = new Cookies();
    const userId = JSON.parse(atob(cookies.get("token").split(".")[1])).data.dataValues.id
    fetchGetAllTasksOfUser(userId).then((data) => {
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
    const { id, title, content } = taskInfo[i];

    columnWrapper[`column${columnIndex}`].push(
      <Task
        key={i}
        id={id}
        margin={props.gap}
        title={title}
        content={content}
      />
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

  return (
    <>
      <div style={{ display: "flex" }}>{result}</div>
    </>
  );
};

WaterfallLayout.propTypes = {
  columns: PropTypes.number.isRequired,
  gap: PropTypes.number.isRequired,
  // children: PropTypes.arrayOf(PropTypes.element),
};

WaterfallLayout.defaultProps = {
  columns: 2,
  gap: 20,
};

export default WaterfallLayout;
