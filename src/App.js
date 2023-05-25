import { useState } from "react";
import Navbar from "./Components/Navbar";
import Notes from "./Components/Notes";

function App() {
  const [display, setDisplay] = useState("all");

  return (
    <div className="App">
      <Navbar display={display} setDisplay={setDisplay} />

      {display === "all" ? (
        <div className="  h-[calc(100vh-6rem)]">
          <Notes />
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
