import React, { useState, useEffect, useContext } from "react";
import Clock from "./Clock";
import Createtask from "../Popup/Createtask";
import Card from "./Card";
import todocss from "./Todo.module.css";
import TodoContext from "../context/Todos/TodoContext"; // Import the context
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const { todos, getTodos, deleteTodo, editTodo } = useContext(TodoContext); // Get context values

  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("Token:", token); // Log the token
    if (!token) {
      navigate("/");
    } else {
      getTodos(); // Use the getTodos function from the context
    }
  }, [token, navigate, getTodos]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleDeleteTask = async (taskIdToDelete) => {
    try {
      await deleteTodo(taskIdToDelete); // Use the deleteTodo function from the context
      console.log("Task deleted");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdateTask = async (taskId, updatedTitle, updatedDescription) => {
    try {
      await editTodo(taskId, updatedTitle, updatedDescription); // Use the editTodo function from the context
      console.log("Task updated");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const todosArray = Array.from(todos);
  return (
    <div className={todocss["todo-container"]}>
      <Clock />
      <h2>
        Create- <span className="danger"> Todo</span>
      </h2>
      <div className={todocss["todo-card"]}>
        <div className={todocss["header"]}>
          <h2>Todo List</h2>
          <button className="" onClick={() => setModal(true)}>
            Create Task
          </button>
        </div>
        {/* {loading && <p>Loading todos...</p>} */}
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        <div className={todocss["task"]}>
          {todosArray.map((task, index) => (
            <Card
              key={index}
              taskId={task._id}
              title={task.title}
              description={task.description}
              deleteTask={handleDeleteTask}
              index={index}
              updateListArray={handleUpdateTask}
            />
          ))}
        </div>
      </div>
      <Createtask toggle={toggle} modal={modal} token={token} />
    </div>
  );
};

export default Todo;
