import React, { createContext, useReducer } from "react";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/Authpage";
import { Route, Routes } from "react-router-dom";
import TodoState from "./context/Todos/TodoState";
import NoteState from "./context/Notes/NotesState";
import "./App.css";

export const UserContext = createContext();

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/dashboard/*"
          element={
            <TodoState>
              <NoteState>
                <Dashboard />
              </NoteState>
            </TodoState>
          }
        />
      </Routes>
    </>
  );
};

export default App;
