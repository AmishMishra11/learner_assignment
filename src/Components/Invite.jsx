import React from "react";

function Invite({ invite, onClose }) {
  if (!invite) {
    return null;
  }
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[rgba(0, 81, 112, 0.1)] backdrop-blur-[1px] z-10"
      onClick={() => onClose()}
    >
      <div
        className="flex flex-col w-[28rem] h-[18rem] p-8 rounded-lg bg-[#506B76]"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-xl text-[#CEE9EE]">Invite Team Members</h1>
        <div className="pt-4 text-white">
          <div className="flex justify-between items-center p-2">
            <p>Person 1</p>
            <button className="border-white p-2 border-2 hover:text-black rounded ">
              Invite
            </button>
          </div>
          <div className="flex justify-between items-center p-2">
            <p>Person 2</p>
            <button className="border-white p-2 border-2 hover:text-black rounded ">
              Invite
            </button>
          </div>
          <div className="flex justify-between items-center p-2">
            <p>Person 3</p>
            <button className="border-white p-2 border-2 hover:text-black rounded ">
              Invite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invite;
