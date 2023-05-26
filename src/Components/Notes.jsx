import React, { useEffect, useState } from "react";
import { useNote } from "../Context/NotesContext";

import Editor from "./Editor";

function Notes() {
  const { stateNotes, dispatchNotes } = useNote();
  const { singleNote } = stateNotes;
  const { content, title, id } = singleNote;

  const [tempTitle, setTempTitle] = useState("");

  useEffect(() => {
    setTempTitle(title);
  }, [id]);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const debounceTitle = debounce((newTitle) => handleTitleChange(newTitle));

  const handleTitleChange = (value) => {
    dispatchNotes({
      type: "EDIT_NOTE",
      payload: {
        id: id,
        newContent: {
          title: value,
        },
      },
    });
  };

  return (
    <div className=" w-full p-4 pl-10 ">
      {/* title edit */}
      <input
        className="w-3/4 break-words border-0 outline-0 text-black text-4xl leading-loose font-semibold p-4"
        value={tempTitle}
        placeholder="Enter Note Title"
        onChange={(e) => {
          setTempTitle(e.target.valuee);
          debounceTitle(e.target.value);
        }}
      />

      {/* body edit */}
      <div className="mt-4 h-[80%] w-[90%] ">
        <Editor content={content} id={id} />
      </div>
    </div>
  );
}

export default Notes;
