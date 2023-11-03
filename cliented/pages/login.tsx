import React, { useEffect } from "react";  
import { useRouter } from "next/router";
import { useState } from "react";


export default function Page() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      console.log("fetch")
      const response = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      console.log("fetched")
  
      if (response.status === 200) {
        console.log("response")
        const data = await response.json();
        console.log(data);
        localStorage.setItem("token_key",data.token)
       
      } else {
        throw new Error('Authentication failed');
      }
    } catch (err) {
      console.error(err);
    }
    router.push("/")
  };
  
  const set_username = (e) => {
    setUsername(e.target.value);
  };
  const set_password = (e) => {
    setPassword(e.target.value);
  };

  const handle_login = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent Enter key from adding a new line in the input field
      handleLogin(e); // Trigger form submission when Enter is pressed
    }
  };

  
  return (
    <>
   
      <section className="login">
        <div className="login_container space-y-24 md:space-y-10">
      <div className="input-area bg-slate-100">
        
      <form onSubmit={handleLogin} className="bg-slate-100">
        <div className="bg-slate-900 p-6 rounded-lg shadow-md space-y-4 ">
          <div className="  center  space-x-1">
            <div className="input   ">
              <input
                type="text"
            
                onChange={set_username}
                className="text-orange-500 w-full px-3 py-2 border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="username"
                required
              />
            </div>
          </div>

          <div className="center space-x-1">
            <div className="input ">
              <input
                type="password"
               
                onChange={set_password}
                className="w-full px-3 py-2 border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-500 text-green-600"
                placeholder=" password"
                required
              />
            </div>
          </div>
          <div className="btn_container center">
          <div className="btn center text-white bg-slate-700 rounded-lg h-10 w-20 hover:scale-125 hover:bg-green-600 duration-100 ease-in-out">
            <button type="submit" onKeyDown={handle_login}>Enter</button>
          </div>
          </div>
         
        </div>
        
     
    </form>
    </div>
    </div>
      </section>
    </>
  );
}

