import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useNote } from "../Context/NotesContext";

function Notes() {
  const { dispatchNotes } = useNote();
  useEffect(() => {
    let test = JSON.parse(localStorage.getItem("allNotes") || "[]");
    if (test) dispatchNotes({ type: "LOAD_ALL_NOTES", payload: test });
  }, [dispatchNotes]);

  return (
    <div className="flex h-full ">
      <Sidebar />
      <main className="bg-red-200 w-full p-4 pl-10">Build in progress</main>
    </div>
  );
}

export default Notes;
