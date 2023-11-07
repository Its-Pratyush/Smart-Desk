import React, { useState, useContext } from "react";
import Createtaskcss from "./Createtask.module.css";
import NoteContext from "../context/Notes/NotesContext";

const UpdateNote = ({ modal, toggle, updateTask, taskId }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const { editNote } = useContext(NoteContext);

  const handleSave = async () => {
    try {
      await editNote(taskId, title, description);
      updateTask(taskId, title, description); // Update the task in the parent component
      toggle(); // Close the modal
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <>
      {modal && (
        <div className={Createtaskcss.modal}>
          <div onClick={toggle} className={Createtaskcss["overlay-body"]}></div>
          <div className={Createtaskcss["modal-content"]}>
            <h2>Update-Note</h2>
            <form method="POST">
              <input
                type="text"
                placeholder="Title"
                value={title} // Bind input value to the state
                onChange={(e) => setTitle(e.target.value)} // Handle title change
                name="title"
              />
              <textarea
                name="description"
                id="text-area"
                cols="30"
                rows="10"
                value={description} // Bind textarea value to the state
                onChange={(e) => setDescription(e.target.value)} // Handle description change
              ></textarea>
            </form>

            <button className={Createtaskcss["close-modal"]} onClick={toggle}>
              CLOSE
            </button>
            <button className={Createtaskcss.submit} onClick={handleSave}>
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateNote;
