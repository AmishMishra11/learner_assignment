import { createContext, useContext, useReducer } from "react";
import { NotesRducer } from "../Reducer/NotesReducer";

const NotesContext = createContext();

const NotesContextProvider = ({ children }) => {
  const [stateNotes, dispatchNotes] = useReducer(NotesRducer, {
    allNotes: [],
    singleNote: {},
  });

  return (
    <NotesContext.Provider value={{ stateNotes, dispatchNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

const useNote = () => useContext(NotesContext);

export { NotesContextProvider, useNote };
