import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNote } from "../Context/NotesContext";
import { AiOutlinePlus } from "react-icons/ai";

import { FaForward, FaBackward } from "react-icons/fa";

import Collections from "./Collections";

function Sidebar() {
  const { stateNotes, dispatchNotes } = useNote();

  const [showSideBar, setShowSidebar] = useState(true);

  const { allNotes } = stateNotes;

  let templength = allNotes?.length;

  return (
    <div
      className={`bg-[#F1F5F9] ease-in duration-300 h-full ${
        showSideBar ? " w-[30rem] lg:w-1/3 " : "w-0"
      }`}
    >
      <div className="flex justify-between items-center p-3">
        <p className="text-lg font-medium">Notes</p>

        <div className="flex justify-between items-center">
          <AiOutlinePlus
            className="cursor-pointer"
            onClick={() => {
              dispatchNotes({
                type: "ADD_PARENT_NOTE",
                payload: {
                  id: uuidv4(),
                  parentId: "",
                  title: `Collection ${templength}`,
                  content: "parent note",
                  children: [],
                },
              });
            }}
          />

          {showSideBar ? (
            <div
              className="p-2 cursor-pointer w-30 "
              onClick={() => setShowSidebar(false)}
            >
              <FaBackward />
            </div>
          ) : (
            <div
              className="p-2 cursor-pointer fixed w-30 left-0"
              onClick={() => setShowSidebar(true)}
            >
              <FaForward />
            </div>
          )}
        </div>
      </div>

      <div className="py-4">
        {allNotes?.map((item) => (
          <div key={item.id} className="p-2">
            <Collections item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
