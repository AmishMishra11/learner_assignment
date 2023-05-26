import { useEffect, useState } from "react";

import Navbar from "./Components/Navbar";
import { useNote } from "./Context/NotesContext";
import Notes from "./Components/Notes";
import Sidebar from "./Components/Sidebar";

function App() {
  const [display, setDisplay] = useState("all");

  const { stateNotes, dispatchNotes } = useNote();

  const { singleNote } = stateNotes;

  const noteIdExists = singleNote?.id?.length;

  useEffect(() => {
    let test = JSON.parse(localStorage.getItem("allNotes") || "[]");
    if (test) dispatchNotes({ type: "LOAD_ALL_NOTES", payload: test });
  }, [dispatchNotes]);

  return (
    <div className="App">
      <Navbar display={display} setDisplay={setDisplay} />

      {display === "all" ? (
        <div className="  h-[calc(100vh-6rem)]">
          <div className="flex h-full ">
            <Sidebar />

            {noteIdExists ? (
              <Notes />
            ) : (
              <div className="w-full">Create a Note</div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-blue-600 bg-orange-300 h-[calc(100vh-6rem)]">
          Graph
        </div>
      )}
    </div>
  );
}

export default App;
