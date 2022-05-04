import React, { useEffect, useState } from 'react'

const PendingRequest = ()=>{

    const [data,setData] = useState([])
    useEffect(()=>{
       
            fetch("http://localhost:5000/student/requests", {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: "626f5fdef98b3a826067600a", is_approved: false }),
            }).then((response) => response.json())
            .then((response) => {
              setData(response)
            });
          
    },[])

    return (
        <div className="flex flex-col ">
            <div className="flex flex-col justify-center items-center py-3" style={{backgroundColor:'#6b5b95'}}>
                <span className="text-white">Pending Requests</span>
            </div>
            <div className="flex flex-col items-center w-full">
            {
                data.map((value)=> (
                    <PendingRequestObject id={value.student_id}/>
                ))
            }
            </div>
        </div>
    )
}


const PendingRequestObject = ({id})=>{
    const [value,setValue] = useState("")
    useEffect(()=>{
        fetch(`http://localhost:5000/student/details/${id}`, {
            method: "get",
            headers: { "Content-Type": "application/json" },
          }).then((response) => response.json())
          .then((response) => {
            console.log("Pending Request Object",response)
            setValue(response[0])
          });
    },[])
    return (
        <div
        className="flex  mt-4 w-1/2 px-3 py-2 bg-white flex-col border-2 border-slate-600 rounded-2xl shadow-md shadow-neutral-200"
      >
        <div className="items-center flex">
          <span className="ml-4">{value.first_name}</span>
          <span className="ml-1">{value.last_name}</span>
        </div>
      </div>
    )
}

export default PendingRequest