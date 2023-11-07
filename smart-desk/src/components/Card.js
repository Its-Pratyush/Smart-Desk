import React, { useContext, useState } from "react";
import EditTask from "../Popup/EditTask";
import Cardcss from "./Card.module.css";
import TodoContext from "../context/Todos/TodoContext";
const Card = ({ index, updateListArray, taskId, title, description }) => {
  const [modal, setModal] = useState(false);
  const { deleteTodo } = useContext(TodoContext);

  const handleDeleteTask = async (taskIdToDelete) => {
    try {
      await deleteTodo(taskIdToDelete); // Use the deleteTodo function from the context
      console.log("Task deleted");
    } catch (error) {
      console.error("Error deleting task:", error);
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
            onClick={() => handleDeleteTask(taskId)}
          ></i>
        </div>
      </div>
      <EditTask
        modal={modal}
        toggle={toggle}
        updateTask={updateListArray}
        taskId={taskId}
      />
    </div>
  );
};

export default Card;
