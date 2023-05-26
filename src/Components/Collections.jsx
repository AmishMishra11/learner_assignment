import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNote } from "../Context/NotesContext";

import { MdDelete } from "react-icons/md";

import { BsDot } from "react-icons/bs";

import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";

function Collections({ item }) {
  const { stateNotes, dispatchNotes } = useNote();
  const { singleNote } = stateNotes;

  const selectedNote = singleNote.id === item.id;

  const [showChild, setShowChild] = useState(false);

  return (
    <div>
      <div
        className={`flex items-center justify-between hover:bg-[#d6d6d6] rounded-md px-1   ${
          selectedNote && "bg-[#34C1D7]"
        }`}
      >
        <div className=" flex items-center justify-between w-full">
          <div className="flex items-center justify-start w-full">
            {item.children.length > 0 ? (
              <div>
                {showChild ? (
                  <IoIosArrowDown
                    className="mr-2 cursor-pointer"
                    onClick={() => setShowChild(false)}
                  />
                ) : (
                  <IoIosArrowForward
                    className="mr-2 cursor-pointer"
                    onClick={() => setShowChild(true)}
                  />
                )}
              </div>
            ) : (
              <BsDot />
            )}

            <p
              className=" py-4 flex items-center text-ellipsis overflow-hidden max-w-[14rem] w-[calc(100%-1px)] h-[1.2em] whitespace-nowrap m-0.5"
              onClick={() => {
                dispatchNotes({ type: "SET_CURRENT_NOTE", payload: item });
              }}
            >
              {item.title ? item.title : "Untitled"}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <div
            className="text-lg cursor-pointer px-1"
            onClick={() => {
              dispatchNotes({
                type: "ADD_CHILD_NOTE",
                payload: {
                  parentId: item.id,
                  childNote: {
                    id: uuidv4(),
                    parentId: item.id,
                    title: "",
                    content: "",
                    children: [],
                  },
                },
              });

              setShowChild(true);
            }}
          >
            <AiOutlinePlus />
          </div>
          <div
            className="text-lg cursor-pointer px-1"
            onClick={() =>
              dispatchNotes({ type: "REMOVE_NOTE", payload: item.id })
            }
          >
            <MdDelete />
          </div>
        </div>
      </div>
      {showChild && (
        <div className="pl-2">
          {item?.children?.map((item) => (
            <div key={item.id} className="p-2 cursor-pointer">
              <Collections item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Collections;
