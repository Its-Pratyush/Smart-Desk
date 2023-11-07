import React, { useContext, useState } from "react";
import Createtaskcss from "./Createtask.module.css";
import TodoContext from "../context/Todos/TodoContext";

const Createtask = ({ modal, toggle }) => {
  const { addTodo } = useContext(TodoContext);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSave = async () => {
    try {
      // Call the addTodo function from the context
      await addTodo(taskData.title, taskData.description);
      setTaskData({ title: "", description: "" });
      toggle();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <>
      {modal && (
        <div className={Createtaskcss.modal}>
          <div onClick={toggle} className={Createtaskcss["overlay-body"]}></div>
          <div className={Createtaskcss["modal-content"]}>
            <h2>Add-Task</h2>
            <form method="POST">
              <input
                type="text"
                placeholder="Title"
                value={taskData.title}
                onChange={handleChange}
                name="title"
              />
              <textarea
                name="description"
                id="text-area"
                cols="30"
                rows="10"
                value={taskData.description}
                onChange={handleChange}
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

export default Createtask;
