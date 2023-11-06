// components/Layout.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Home from "./components/home";
import Attendence from "./components/attendence";
import Register from "./components/register";
const Cookies = require("js-cookie");
const JWT = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

async function verify(token) {
  var Data;
  await fetch("/api/verify", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) return res.json();
    })
    .then((data) => (Data = data));
  return Data;
}
function Layout({ children }) {
  const router = useRouter();
  const [login, setLogin] = useState(false);

  const [activeComponent, setActiveComponent] = useState("Home");
  const [path, setPath] = useState("/dashboard");

  useEffect(() => {
    //try  get  token from cookies or wherever you managed to storage it...
    // const token=Cookies.get('loginToken')
    try {
      const Token = localStorage.getItem("token_key");
      if (Token) {
        const response = verify(Token);

        response.then((res)=>{
         if(!res) router.push('/login')
         setLogin(true);

        })
       
      } else{
        router.push('/login')
      }
        
      
    } catch (err) {
      console.error(err);
    }
  }, []);
  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
    // setPath(componentName)
    // window.history.pushState(null, null, '/dashboard/' + componentName);
  };
  // if (activeComponent=="Home"){
  //   router."/Home"
  // }
  // }else if(activeComponent=="Register"){
  //   router.push(router.pathname+"/Register")

  // }else if(activeComponent=="Attendence"){
  //   router.push(router.pathname+"/Attendence")

  // }

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

export default Layout;