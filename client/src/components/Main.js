import React from "react";
// import PropTypes from "prop-types";
// import Task from "./Task";
import { useState } from "react";
// import fetchGetAllTasks from "./utils/fetGetAllTasks";
import AddTask from "./AddTask";
import WaterfallLayout from "./WaterfallLayout";

const Main = (props) => {
  const [isShown, setIsShown] = useState(false);
  function toggleShown() {
    setIsShown((prevShown) => !prevShown);
  }
  return (
    <main className="tasks__main">
      <section className="task__bntAdd__container">
        {!isShown && (
          <button type="button" className="btn" onClick={toggleShown}>
            Add Task
          </button>
        )}
      </section>
      {isShown && <AddTask handleClick={toggleShown} />}
      {/* add media querie for columns size */}
      <WaterfallLayout columns={2} gap={25} />
    </main>
  );
};

export default Main;
