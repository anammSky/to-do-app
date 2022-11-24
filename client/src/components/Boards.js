import React, { useState } from "react";
import "../assets/boards.css";

export default function Boards() {
  const [isShown, setIsShown] = useState(false);
  function toggleShown() {
    setIsShown((prevShown) => !prevShown);
  }
  return (
    <section className="board">
      <div className="board__name__container">
        <h3 className="board__name">Board 1</h3>
        <h3 className="board__name">Board 2</h3>
        <h3 className="board__name">Board 3</h3>
        <h3 className="board__name">Board 4</h3>
        {isShown && (
          <input
            className="board__name__input"
            type="text"
            id="add-board"
            name="add-board"
          ></input>
        )}
      </div>
      {!isShown && (
        <button className="btn board__btn" onClick={toggleShown}>
          Add Board
        </button>
      )}
      {isShown && (
        <div className="board__btn__container">
          <button className="btn board__btn" onClick={toggleShown}>
            Add
          </button>
          <button className="btn board__btn btn--danger" onClick={toggleShown}>
            Cancel
          </button>
        </div>
      )}
    </section>
  );
}
