import React, { useContext, useState } from "react";
import Createtaskcss from "./Createtask.module.css";
import NoteContext from "../context/Notes/NotesContext";

const Notes = ({ modal, toggle }) => {
  const { addNote } = useContext(NoteContext);
  const [todoData, setTodoData] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData({ ...todoData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await addNote(todoData.title, todoData.description);
      setTodoData({ title: "", description: "" });
      toggle();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <>
      {modal && (
        <div className={Createtaskcss["modal"]}>
          <div onClick={toggle} className={Createtaskcss["overlay-body"]}></div>
          <div className={Createtaskcss["modal-content"]}>
            <h2>Add-Note</h2>
            <form method="POST">
              <input
                type="text"
                placeholder="Title"
                value={todoData.title}
                onChange={handleChange}
                name="title"
              />
              <textarea
                name="description"
                id="text-area"
                cols="30"
                rows="10"
                value={todoData.description}
                onChange={handleChange}
              ></textarea>
            </form>

            <button className={Createtaskcss["close-modal"]} onClick={toggle}>
              CLOSE
            </button>
            <button className={Createtaskcss["submit"]} onClick={handleSave}>
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;
