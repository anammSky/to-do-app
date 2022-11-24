import React from "react"
import "../assets/task.css"
import edit from '../assets/edit.svg'
export default function Header() {
    return(
        <div className="task">
            <input className="task_check" type="checkbox"></input>
            <h1 className="task_title">The title</h1>
            <p className="task_content">This is a test content :D. For testing!</p>
            <button className="task_delete"><svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="binIconTitle" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000"> <title id="binIconTitle">Bin</title> <path d="M19 6L5 6M14 5L10 5M6 10L6 20C6 20.6666667 6.33333333 21 7 21 7.66666667 21 11 21 17 21 17.6666667 21 18 20.6666667 18 20 18 19.3333333 18 16 18 10"/> </svg></button>
            <button className="task_edit"><img src={edit} alt="edit" /></button>
        </div>
    )
}
