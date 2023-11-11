
import React,{ useEffect,useState} from "react";

import withAuth from "../auth/withAuth"


function home() {
  return(
    <>
    <h1 className="text-white">home area</h1>
    </>
  )
}



export default withAuth(home)