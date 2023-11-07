import React, { useContext, useState } from "react";
import UpdateNotes from "../Popup/UpdateNotes";
import Cardcss from "./Card.module.css";
import NoteContext from "../context/Notes/NotesContext";
const Card = ({ index, updateListArray, taskId, title, description }) => {
  const [modal, setModal] = useState(false);
  const { deleteNote } = useContext(NoteContext);

  const handleDelete = async (taskIdToDelete) => {
    try {
      await deleteNote(taskIdToDelete);
      console.log("Task deleted");
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC",
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1",
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1",
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1",
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD",
    },
  ];

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div className={Cardcss["card-wrapper"]}>
      <div
        className={Cardcss["card-top"]}
        style={{ backgroundColor: colors[index % 5].primaryColor }}
      ></div>
      <div className={Cardcss["task-holder"]}>
        <span className={Cardcss["card-header"]}>{title}</span>
        <p className={Cardcss["description"]}>{description}</p>

        <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
          <i
            className="far fa-edit mr-3"
            style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }}
            onClick={() => setModal(true)}
          ></i>
          <i
            className="fas fa-trash-alt"
            style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }}
            onClick={() => handleDelete(taskId)}
          ></i>
        </div>
      </div>
      <UpdateNotes
        modal={modal}
        toggle={toggle}
        taskId={taskId}
        updateTask={updateListArray}
      />
    </div>
  );
};

export default Card;
