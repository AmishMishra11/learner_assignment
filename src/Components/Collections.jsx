import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNote } from "../Context/NotesContext";

import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

function Collections({ item }) {
  const { dispatchNotes } = useNote();

  const [showChild, setShowChild] = useState(false);

  return (
    <div>
      <div className=" flex items-center justify-between">
        <div className=" flex items-center justify-between">
          {item.children.length > 0 && (
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
          )}

          <p> {item.title}</p>
        </div>
        <div className="flex items-center justify-between ">
          <div
            className="p-2 text-lg cursor-pointer"
            onClick={() => {
              dispatchNotes({
                type: "ADD_CHILD_NOTE",
                payload: {
                  parentId: item.id,
                  childNote: {
                    id: uuidv4(),
                    parentId: item.id,
                    title: `Collection Child`,
                    content: "child",
                    children: [],
                  },
                },
              });

              setShowChild(true);
            }}
          >
            +
          </div>
          <div
            className="p-2 text-lg cursor-pointer"
            onClick={() =>
              dispatchNotes({ type: "REMOVE_PARENT_NOTE", payload: item.id })
            }
          >
            -
          </div>
        </div>
      </div>
      {showChild && (
        <div className="pl-2">
          {item?.children?.map((item) => (
            <Collections item={item} key={item.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Collections;
