import React, { useEffect, useState } from "react";
import { Post } from "../crudOperation";

import Dashboard from "..";

function register() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [section, setSection] = useState("");
  const [branch, setBranch] = useState("");
  const push = async () => {
    try {
      const data = await Post({
        name: name,
        roll: roll,
        section: section,
        branch: branch,
      });
    } catch (err) {
      console.error("Failed to insert data:", err);
    }
  };
  const register = () => {
    console.log("clicked");
    push();
  };

  return (
    // <Dashboard>
      <section className="register center my-10">
        <div className="register_container bg-slate-800 w-[70%] text-white">
          <div className="head flex space-x-10 m-2  text-center">
            <label htmlFor="Name" className="w-[50%]">
              Name
            </label>
            <label htmlFor="ROll" className="w-[20%]">
              ROll
            </label>
            <label htmlFor="Section" className="w-[20%]">
              Section
            </label>
            <label htmlFor="Branch" className="w-[20%]">
              Branch
            </label>
          </div>
          <hr />
          <div className="input  flex space-x-10 m-2 my-4 text-white ">
            <div className="name center rounded-lg  shadow-[inset_1px_-1px_2px_4px_rgba(0,0,0,0.6)] w-[50%]">
              <input
                type="text"
                className="h-10 rounded-lg outline-none w-[80%] bg-transparent"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="roll center rounded-lg  shadow-[inset_1px_-1px_2px_4px_rgba(0,0,0,0.6)]">
              <input
                type="text"
                className="h-10  rounded-lg outline-none w-[50%]  bg-transparent"
                onChange={(e) => {
                  setRoll(e.target.value);
                }}
              />
            </div>

            <div className="class center rounded-lg  shadow-[inset_1px_-1px_2px_4px_rgba(0,0,0,0.6)]">
              <input
                type="text"
                className="h-10  rounded-lg outline-none w-[50%]  bg-transparent"
                onChange={(e) => {
                  setSection(e.target.value);
                }}
              />
            </div>
            <div className="class center rounded-lg  shadow-[inset_1px_-1px_2px_4px_rgba(0,0,0,0.6)]">
              <input
                type="text"
                className="h-10  rounded-lg outline-none w-[50%]  bg-transparent"
                onChange={(e) => {
                  setBranch(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="btn bg-blue-400 w-28 center rounded-lg ml-[40%] m-5 h-10 hover:scale-110 duration-150  text-lg">
            <button onClick={register}>Register</button>
          </div>
        </div>
      </section>
    // {/* </Dashboard> */}
  );
}

export default register;
