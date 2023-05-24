import React, { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

import { BsPersonAdd } from "react-icons/bs";
import Invite from "./Invite";

function Navbar({ display, setDisplay }) {
  const [menu, setMenu] = useState(false);

  const [hamburgerMenu, setHamburgerMenu] = useState(false);

  const [invite, setInvite] = useState(false);

  const menuRef = useRef();

  const hamburgerMenuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (
        hamburgerMenuRef.current &&
        !hamburgerMenuRef.current.contains(e.target)
      ) {
        setHamburgerMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <div className="w-screen h-24 bg-[#fffafa]  flex items-center justify-between">
      <div className=" w-40 h-full flex flex-col justify-between ">
        <div
          className="p-4 cursor-pointer"
          onClick={() => {
            setHamburgerMenu(true);
          }}
        >
          <RxHamburgerMenu className="text-lg stroke-[.8px]" />
        </div>

        <div className="flex justify-between items-center p-2 pl-8 ">
          <div
            style={{ borderBottom: display === "all" && "3px solid red" }}
            className="cursor-pointer ease-in-out duration-200"
            onClick={() => setDisplay("all")}
          >
            All
          </div>
          <div
            style={{ borderBottom: display === "graph" && "3px solid red" }}
            className="cursor-pointer ease-in-out duration-200"
            onClick={() => setDisplay("graph")}
          >
            Graph
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pr-8">
        <div
          className="p-8 cursor-pointer flex items-center justify-between w-[15rem] hover:text-[#34C1D7]"
          onClick={() => setInvite(true)}
        >
          <BsPersonAdd />
          Invite Team Members
        </div>
        <div className="relative">
          <div
            className="h-16 w-16 bg-purple-500 flex items-center cursor-pointer justify-center rounded-full"
            onClick={() => setMenu((prev) => !prev)}
          >
            AM
          </div>
          {menu && (
            <div
              ref={menuRef}
              className="absolute top-20 flex flex-col justify-center items-start right-0 w-40 p-4 bg-[#F9FFFF] drop-shadow-md "
            >
              <div className="hover:bg-[#34C1D7] hover:text-white w-full cursor-pointer rounded-sm p-1 px-2">
                Dark Mode
              </div>
              <div className="hover:bg-[#34C1D7] hover:text-white w-full cursor-pointer rounded-sm p-1 px-2">
                Profile
              </div>
              <div className="hover:bg-[#34C1D7] hover:text-white w-full cursor-pointer rounded-sm p-1 px-2">
                What's New
              </div>
              <div className="hover:bg-[#34C1D7] hover:text-white w-full cursor-pointer rounded-sm p-1 px-2">
                Help
              </div>
              <div className="hover:bg-[#34C1D7] hover:text-white w-full cursor-pointer rounded-sm p-1 px-2">
                Send feedback
              </div>
              <div className="hover:bg-[#34C1D7] hover:text-white w-full cursor-pointer rounded-sm p-1 px-2">
                Logout
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        ref={hamburgerMenuRef}
        style={{ width: hamburgerMenu ? "12rem" : "0" }}
        className="fixed ease-in duration-300 top-0 h-screen overflow-hidden bg-[#34C1D7]"
      >
        <div
          className="pt-4 pl-4 cursor-pointer"
          onClick={() => {
            setHamburgerMenu(false);
          }}
        >
          <RxCross1 className="font-medium stroke-[.8px]" />
        </div>
        <ul className="flex flex-col items-start p-8 text-white">
          <li className="p-3 cursor-pointer text-lg hover:text-black">Home</li>
          <li className="p-3 cursor-pointer text-lg hover:text-black">
            About Us
          </li>
          <li className="p-3 cursor-pointer text-lg hover:text-black">
            Services
          </li>
          <li className="p-3 cursor-pointer text-lg hover:text-black">
            Pricing
          </li>
          <li className="p-3 cursor-pointer text-lg hover:text-black">
            Contact
          </li>
        </ul>
      </div>

      <Invite invite={invite} onClose={() => setInvite(false)} />
    </div>
  );
}

export default Navbar;
