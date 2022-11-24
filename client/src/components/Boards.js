import React from "react";
import "../assets/boards.css";

export default function Boards() {
  return (
    <section className="board">
      <div className="board__name__container">
        <h3 className="board__name">Board 1</h3>
        <h3 className="board__name">Board 2</h3>
        <h3 className="board__name">Board 3</h3>
        <h3 className="board__name">Board 4</h3>
      </div>
      <button className="btn board__btn">Add Board</button>
    </section>
  );
}
