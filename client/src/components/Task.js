import React, { useState } from "react";
import "../assets/task.css";
import edit from "../assets/edit.svg";
import save from "../assets/save.svg";
// import deleteSVG from "../assets/bin.svg";
import deleteSVG from "../assets/delete.svg";
import fetchDeleteOneTask from "./utils/tasks/fetchDeleteOneTask";
import fetchPatchOneTask from "./utils/tasks/fetchPatchOneTask";
export default function Task(props) {
    const id = props.id;
    const [isComplete, setIsComplete] = useState(false);
    const [taskEdit, setTaskEdit] = useState({
        title: props.title,
        content: props.content || " ",
        finishBy: "2022-12-14 22:11",
    });
    const [isEdit, setIsEdit] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setTaskEdit(setTaskEdit => {
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

    async function handleEdit(event) {
        setIsEdit(!isEdit);
        // call to api
        const editOrSaveBtn = document.getElementsByClassName("editbtnimg")[0];
        if (editOrSaveBtn.id === "edit") {
            editOrSaveBtn.src = save;
            editOrSaveBtn.alt = "save";
            editOrSaveBtn.id = "save";
        } else {
            await fetchPatchOneTask(
                id,
                taskEdit.title,
                taskEdit.content,
                isComplete,
                taskEdit.finishBy
            );
            editOrSaveBtn.src = edit;
            editOrSaveBtn.alt = "edit";
            editOrSaveBtn.id = "edit";
        }
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
                {isEdit && (
                    <input
                        value={taskEdit.title}
                        name="title"
                        className="task__title--edit"
                        onChange={handleChange}
                    />
                )}
                {!isEdit && <h1 className="task__title">{taskEdit.title}</h1>}
            </div>
            <div className="task__section__content">
                {isEdit && (
                    <textarea
                        value={taskEdit.content ? taskEdit.content : " "}
                        name="content"
                        className="task__content--edit"
                        onChange={handleChange}
                    />
                )}
                {!isEdit && <p className="task__content">{taskEdit.content} </p>}
            </div>
            <div className="task__section__btns">
                <button type="button" onClick={handleDelete} className="task__btn">
                    <img className="task__btn__img" src={deleteSVG} alt="delete" />
                </button>
                <button type="button" onClick={handleEdit} className="task__btn">
                    <img className="task__btn__img editbtnimg" src={edit} alt="edit" id="edit" />
                </button>
            </div>
        </article>
    );
}
