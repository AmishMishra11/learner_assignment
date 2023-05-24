import { useState } from "react";
import Navbar from "./Components/Navbar";

function App() {
  const [display, setDisplay] = useState("all");

  return (
    <div className="App">
      <Navbar display={display} setDisplay={setDisplay} />

      {display === "all" ? (
        <div className="text-blue-600 bg-slate-200 h-[calc(100vh-6rem)]">
          Build in progress...
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
