import React, { useEffect, useState } from 'react'

const AcceptRequest = ()=>{

    const [data,setData] = useState([])
    useEffect(()=>{
       
            fetch("http://localhost:5000/alumni/requests", {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: localStorage.getItem('id'), is_approved: false }),
            }).then((response) => response.json())
            .then((response) => {
              setData(response)
            });
          
    },[])

    return (
        <div className="flex flex-col ">
            <div className="flex flex-col justify-center items-center py-3" style={{backgroundColor:'#6b5b95'}}>
                <span className="text-white" >Pending Requests</span>
            </div>
            <div className="flex flex-col items-center w-full">
            {
                data.map((value)=> (
                    <AcceptRequestObject id={value.student_id}/>
                ))
            }
            </div>
        </div>
    )
}

const sendReuest = (id) => {
    fetch("http://localhost:5000/alumni/acceptReferral", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, alumni_id: localStorage.getItem('id') })
    }).then((response) => {
      if (response.status === 200){
        alert('Request accepted!')
      }
      else{
        alert('Request Already Accepted')
      }
    })
  };



const AcceptRequestObject = ({id, date})=>{
    const [value,setValue] = useState("")
    const [space,setSpace] = useState(" ")
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
      className="flex flex-col pt-5 h-full justify-start items-center"
      style={{
        width: "100%",
        paddingLeft: "10px",
        backgroundColor: "#6b5b95",
      }}
    >
        <div
        className="flex  mt-4 w-1/2 px-3 py-2 bg-white flex-col border-2 border-slate-600 rounded-2xl shadow-md shadow-neutral-200"
        onClick={() => {
          sendReuest(value._id);
        }}
      >
        <div className="items-center flex">
          <span className="ml-4">{value.first_name}</span>
          <span className="ml-1">{value.last_name}</span>
          <span className="ml-1">{space}</span>
          <div>asked you for a referral.</div>
        </div>
      </div>
      </div>
    )
}

export default AcceptRequest