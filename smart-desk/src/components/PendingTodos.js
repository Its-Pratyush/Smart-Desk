import React, { useState, useEffect, useContext } from "react";
import pendingcss from "./Pending.module.css";
import TodoContext from "../context/Todos/TodoContext";
import { useNavigate } from "react-router-dom";
const PendingTodos = React.memo(() => {
  const { todos } = useContext(TodoContext);
  const navigate = useNavigate();
  const navigateToAddTodo = () => {
    navigate("/dashboard/todo");
  };

  return (
    <>
      <div className={pendingcss["pending-todos"]}>
        <h2>Your-Todos</h2>
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>{todo.title}</li>
          ))}
        </ul>
        <button onClick={navigateToAddTodo}>Add-Todo</button>
      </div>
    </>
  );
});

export default PendingTodos;
