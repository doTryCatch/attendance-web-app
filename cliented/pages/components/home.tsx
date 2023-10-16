
import React,{ useEffect,useState} from "react";
import {Update,Get} from "../crudOperation"


function home() {

  const [data,setData]=useState([])
  const [Branch,setBranch]=useState('CSE')
  const [Section,setSection]=useState('A')
 

 
  useEffect(()=>{
 
    async function fetchData() {
      try {
        const result = await Get();
        const info=result.filter(elem=>elem.branch==Branch&&elem.section==Section)
        info.length>0?setData(info[0].data):setData([]); // Update the state with the fetched data
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
   
  fetchData();

  
  },[Branch,Section]);
const section=(e)=>{
  setSection(e.target.value)
}
const branch=(e)=>{
  setBranch(e.target.value)
}
  return (
 
    <section className="home">
    <div className="contaner center ">
    <div className="attendence_status bg-slate-800 rounded-lg m-4  w-[80%]  ">
      <div className="content center">
        <div className="heading m-4 w-full flex justify-between">
          <div className="head "> Attendence Status</div>
          <div className="section"> section -D10</div>
        </div>
       
      </div>
      <div className="Branch&section">
  <select id="branch" onChange={branch}>
    <option value="CSE">CSE</option>
    <option value="AI">AI</option>
    <option value="AIML">AIML</option>
  </select>
  <select id="Section" onChange={section}>
    
    <option value="section_a">A</option>
    <option value="section_b">B</option>
    <option value="section_c">C</option>
  </select>
</div>

      <hr />
      <div className="heading w-full text-white  text-bold text-[20px] grid grid-cols-3 gap-1 mx-4">
       <h1>Student Name</h1>
       <h1>ROll</h1>
       <h1>Percentage(%)</h1>
      </div>
      <hr />
      <div className="text-white w-full center m-4">
  {data.length > 0 ? (
    <table className="w-full text-left">
      <tbody>
        {data.map((data, index) => (
          <tr key={index}>
            <td>{data.name}</td>
            <td>{data.roll}</td>
            <td>{data.percentage}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>loading...</p>
  )}
</div>

    </div>
  
  </div>
  </section>

  )
}

export default home