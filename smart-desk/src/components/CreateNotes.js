import React, { useState, useEffect, useContext } from "react";
import Clock from "./Clock";
import Notes from "../Popup/Notes";
import NotesCard from "./NotesCard";
import notescss from "./Note.module.css";
import todocss from "./Todo.module.css";
import NotesContext from "../context/Notes/NotesContext";
import { useNavigate } from "react-router-dom";

const CreateNotes = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const { notes, getNotes, editNote } = useContext(NotesContext);

  const token = localStorage.getItem("token");
  useEffect(() => {
    console.log("Token:", token); // Log the token
    if (!token) {
      navigate("/");
    } else {
      getNotes(); // Use the getTodos function from the context
    }
  }, [token, navigate, getNotes]);

  const toggle = () => {
    setModal(!modal);
  };

  // const handleDeleteTask = async (taskIdToDelete) => {
  //   try {
  //     await deleteNote(taskIdToDelete); // Use the deleteTodo function from the context
  //     console.log("Task deleted");
  //   } catch (error) {
  //     console.error("Error deleting task:", error);
  //   }
  // };

  const handleUpdateTask = async (taskId, updatedTitle, updatedDescription) => {
    try {
      await editNote(taskId, updatedTitle, updatedDescription); // Use the editTodo function from the context
      console.log("Note updated");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const notesArray = Array.from(notes);

  return (
    <>
      <div className={notescss["notes-container"]}>
        <Clock />
        <h2>
          Create- <span className="danger"> Notes</span>
        </h2>
        <div className={todocss["todo-card"]}>
          <div className={todocss["header"]}>
            <button className="" onClick={() => setModal(true)}>
              Create Notes
            </button>
          </div>
          <div className={todocss["task"]}>
            {notesArray.map((note, index) => (
              <NotesCard
                key={index} // Use "note._id" as the key
                taskId={note._id}
                title={note.title} // Pass the correct properties
                description={note.description} // Pass the correct properties
                index={index} // Pass the index as a prop
                updateListArray={handleUpdateTask}
              />
            ))}
          </div>
        </div>
      </div>
      <Notes toggle={toggle} modal={modal} token={token} />
    </>
  );
};

export default CreateNotes;
