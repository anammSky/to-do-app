import React, { useState } from "react";
import "../assets/boards.css";

export default function Boards() {
    const [formData, setFormData] = useState({
        addBoard: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    }
    function handleSubmit(event) {
        event.preventDefault();
        // function to api
        toggleShown();
    }

    const [isShown, setIsShown] = useState(false);
    function toggleShown() {
        setIsShown(prevShown => !prevShown);
    }
    return (
        <aside>
            <form className="board" onSubmit={handleSubmit}>
                <div className="board__name__container">
                    <h3 className="board__name">Board 1</h3>
                    <h3 className="board__name">Board 2</h3>
                    <h3 className="board__name">Board 3</h3>
                    <h3 className="board__name">Board 4</h3>
                    {isShown && (
                        <input
                            className="board__name__input"
                            type="text"
                            id="addBoard"
                            name="addBoard"
                            value={formData.addBoard}
                            onChange={handleChange}
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
                        <button type="submit" className="btn board__btn" onClick={handleSubmit}>
                            Add
                        </button>
                        <button
                            type="button"
                            className="btn board__btn btn--danger"
                            onClick={toggleShown}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </form>
        </aside>
    );
}
