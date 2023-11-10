'use-client'
import { useRouter } from 'next/router';
import React,{useEffect} from 'react';
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
const checkIfUserIsAuthenticated = () => {
    try {
      const Token = localStorage.getItem("token_key");
      if (Token) {
        const response = verify(Token);
        return response.then((res) => {
          if (!res) {
            return false;
          }
          return true;
          //  setLogin(true);
        });
      }
    } catch (err) {
      console.error(err);
      return false; // Return false if any errors occur
    }
  };
  
  const withAuth = (Component) => {
    const Wrapper = (props) => {
      const router = useRouter();
  
      useEffect(() => {
        const isAuthenticated = checkIfUserIsAuthenticated();
        if (!isAuthenticated) {
          router.push('/login');
        }
      }, []);
  
      return <Component {...props} />;
    };
  
    return Wrapper;
  };
  
  
  export default withAuth;