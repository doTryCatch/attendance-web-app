import React,{useEffect,useState} from 'react'
import {Get,Post, Update} from "../crudOperation"
import Dashboard from '..'

function Attendence() {
    
    const [date,setDate]=useState(new Date().toISOString().slice(0, 10))
    const [selectedValues, setSelectedValues] = useState([]);
    const dt=new Date()
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
    async function update(data) {
        try {
          const result = await Update(data);
          // Update the state with the fetched data
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
  
    const set_date=(e)=>{
        setDate(e.target.value)
    }
const handleStatus=(e)=>{
    var roll=e.target.name
    var status=e.target.value
    const existingEntry = selectedValues.find((entry) => entry.roll === roll);
    if (existingEntry) {
      // Update the existing entry if found
      existingEntry.status = status;
    } else {
      // Add a new entry for this student
      const data = { roll: roll, status: status };
      setSelectedValues([...selectedValues, data]);
    }
    

}
    const upload=(e)=>{
      console.log(selectedValues)
        update([{branch:Branch,section:Section,dataToUpdate:selectedValues}])
    }

  return (
    // <Dashboard>
   <section className="attendence center min-h-[90vh] ">
    <div className="w-[100vh] bg-slate-50">
        <div className="head flex justify-between m-4">
            <h1>Attendence </h1>
            <input type="date" value={date} onChange={set_date}/>
        </div>
        <div className="Branch&section bg-pink-400">
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
        <div className="attendence_ui">
        <div className="head flex justify-between m-4 text-center">
            <h1 className='w-[70%] '>Student Name</h1>
            <p className='w-[30%]'>Status</p>
        </div>
      
        {data.length>0?(
             <div className="present_area  max-h-[40vh] overflow-scroll">
          
             {data.map((val,index)=>(
                
                  <div className="student flex justify-between  m-4" key={index}>
                  <h1 className='w-[40%] bg-orange-400 '>{val.name}</h1>
                  {val.record.some((elem)=>elem.date===date)?(
                          val.record.map((elem, recordIndex) => {
                            if (elem.date === date) {
                              return (
                                <div className="status  w-[30%] center h-8">
                                   <p key={recordIndex}>{elem.status}</p>
                                </div>
                               
                              );
                            }
                            return null;
                          })
                  ):(
                    
                    <div className="btn space-x-6 w-[60%] center h-8">
                      <p className='bg-orange-200'>Not Recorded</p>
                    <label className="custom-radio">
                      <input type="radio" name={val.roll} value="present" onChange={handleStatus} />
                      Present
                    </label>
                    <label className="custom-radio">
                      <input type="radio" name={val.roll} value="absent" onChange={handleStatus} />
                      Absent
                    </label>
                  </div>
                  
                  )}
                  
                 
              </div>
             ))}
             </div>
        ):(
            <p>loading...</p>
        )}
       
       <div className="btn"><button className='' onClick={upload}>Save Record</button></div>

        </div>
    </div>

   </section>
  //  </Dashboard>
  )
}

export default Attendence