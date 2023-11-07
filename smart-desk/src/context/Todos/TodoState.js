import React, { useState } from "react";

import TodoContext from "./TodoContext";

const TodoState = (props) => {
  const host = "http://localhost:8000";

  const todoInitial = [];

  const [todos, setTodos] = useState(todoInitial);

  //get all notes
  const getTodos = async () => {
    const response = await fetch(`${host}/api/todos/getAlltodos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();

    setTodos(json);
  };

  //add a todo

  const addTodo = async (title, description) => {
    const response = await fetch(`${host}/api/todos/createtodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description }),
    });

    //logic to edit in client
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
  };

  //delete a todo
  const deleteTodo = async (id) => {
    //API CALL
    const response = await fetch(`${host}/api/todos/deleteTodo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    console.log(json);
    console.log("deleting todos");
    const newTodo = todos.filter((todos) => {
      return todos._id !== id;
    });
    setTodos(newTodo);
  };

  //update todos
  const editTodo = async (id, title, description) => {
    //Api call
    const response = await fetch(`${host}/api/todos/updateTodo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description }),
    });
    const json = response.json();
    console.log(json);

    for (let index = 0; index < todos.length; index++) {
      const element = todos[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
      }
    }
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, deleteTodo, editTodo, getTodos }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoState;
