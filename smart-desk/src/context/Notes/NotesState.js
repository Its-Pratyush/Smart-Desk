import React, { useState } from "react";

import NoteContext from "./NotesContext";

const NoteState = (props) => {
  const host = "https://smart-desk-mern.vercel.app";
  const initialState = [];

  const [notes, setNotes] = useState(initialState);

  //get all the notes

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/getAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();

    setNotes(json);
  };

  //add a note
  const addNote = async (title, description) => {
    const response = await fetch(`${host}/api/notes/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description }),
    });
    const newNote = await response.json();
    setNotes([...notes, newNote]);
  };

  //delete a note

  const deleteNote = async (id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    console.log(json);
    console.log("deleting all the notes");
    const newNote = notes.filter((notes) => {
      return notes._id !== id;
    });
    setNotes(newNote);
  };

  //edit note
  const editNote = async (id, title, description) => {
    //api call
    const response = fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description }),
    });
    const json = response.json();
    console.log(json);

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, getNotes, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
