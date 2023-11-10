// components/Layout.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Home from "./components/home";
import Attendence from "./components/attendence";
import Register from "./components/register";
import withAuth from "./auth/withAuth"



function Layout({ children }) {
  const router = useRouter();
  const [login, setLogin] = useState(true);

  const [activeComponent, setActiveComponent] = useState("Home");
  const [path, setPath] = useState("/dashboard");


  const handleComponentChange = (componentName) => {
    const newUrl = `/${componentName}`;
    window.history.pushState({}, "", newUrl);
    setActiveComponent(componentName);
 
  };


  return (
    <>
      {login ? (
        <section className="dashboard">
          <div className="navbar flex text-bold bg-slate-500 cursor-pointer my-2 text-white">
            <div className="list-items">
              <ul className="flex space-x-6">
                <li onClick={() => handleComponentChange("Home")}>Home</li>
                <li onClick={() => handleComponentChange("Attendence")}>
                  Attendence
                </li>
                <li onClick={() => handleComponentChange("Register")}>
                  Register
                </li>
              </ul>
            </div>
          </div>
          {/* {router.pathname === '/dashboard' ? ( */}
          <div>
            {activeComponent === "Home" && <Home />}
            {activeComponent === "Attendence" && <Attendence />}
            {activeComponent === "Register" && <Register />}
          </div>
          {/* ) : (
        children
      )} */}
        </section>
      ) : (
        <p>loading</p>
      )}
    </>
  );
}

export default withAuth(Layout);