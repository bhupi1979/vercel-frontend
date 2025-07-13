import axios from 'axios'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Spinner } from "react-bootstrap";
let Studentlist= forwardRef ((props,ref )=> {
  let i=0
   const [loading, setLoading] = useState(true);
   const [msg, setMsg] = useState("")
  const [showMsg, setShowMsg] = useState(true);
   let [studentdata,setStudentdata]=useState([])
     useEffect(()=>{
 studentgetdata()
 setTimeout(() => {
  
  setLoading(false)
 }, 10000)
     },[])
   let  studentgetdata=()=>{
    axios.get("https://vercel-backend-g6yd.onrender.com/web/api/student/student-view").then((res)=>{
      //alert(res.data)
      //console.log(res.data)
           return res.data
    }).then((finaldata)=>{
     // console.log(finaldata)
      if(finaldata.status)
        setStudentdata(finaldata.data)
    }).catch(error => {
    console.error('Error fetching data:', error); // Handle error
  })
  }
  useImperativeHandle(ref, () => ({
    refreshList: studentgetdata
  }))

  //*********function for deletion of record************//
  let deletestudentdata=(e)=>{
    //alert('ur in delete and id is=='+e.target.value)
    let id=e.target.value
    alert(id)
    let confirm1=confirm("DO YOU WANT DELETE THIS STUDENT RECOFED")
    if(confirm1)
    {
        axios.delete(`https://vercel-backend-g6yd.onrender.com/web/api/student/student-delete/${id}`).then((res)=>{
setMsg("Data deleted successfuly")
setShowMsg(true)
      setTimeout(() => {
        setShowMsg(false)
      }, 8000)
        }).catch((err)=>{
          console.log(err.data)
            setMsg(err)
        })

    }
  }
  //************************* */
  return (
    <>
    {loading &&
<div className="d-flex justify-content-center mt-5">
<Spinner animation="border" role="status" >
      <span className="text-danger visually-hidden">Loading...</span>
    </Spinner>
    </div>}
          {msg && showMsg && <h1 className="position-fixed top-0 end-0 text-white bg-danger">{msg}</h1>}

    <div>
       <div className="container mt-5">
      <h1 className="text-danger">Student-List</h1>
       {/* <h1>the currnt valueis{count}</h1>
      <h1>the previous value is {countRef.current}    </h1>
      <button className="btn btn-primary" onClick={onref}>clickforcountchange</button> */} 
      <table className="table table-success table-striped table-hover text-center ">
        <thead>
        <tr>
          <th>Srno</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th colSpan="2">Action</th>
        </tr>
         </thead>
         <tbody>
          {
            studentdata.length ?
            
              studentdata.map((item,index)=>
           (
                <tr key={index}>
                   <td>{++i}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                   <td><button className="btn btn-warning text-white">Edit</button></td>
            <td><button className="btn btn-danger text-white" onClick={deletestudentdata} value={item._id}>Delete</button></td>
                </tr>
              )
            )
          
            :
            <tr><td colSpan="4">Nodata found</td></tr>
          }
          {/* <tr>
            <td>1</td>
            <td>dd</td>
            <td>dd</td>
            <td>dd</td>
            <td><button className="btn btn-info">Edit</button></td>
            <td><button className="btn btn-danger">Delete</button></td>
          </tr>
          <tr>
            <td>1</td>
            <td>dd</td>
            <td>dd</td>
            <td>dd</td>
            <td><button className="btn btn-info">Edit</button></td>
            <td><button className="btn btn-danger">Delete</button></td>
          </tr>
          <tr>
            <td>1</td>
            <td>dd</td>
            <td>dd</td>
            <td>dd</td>
            <td><button className="btn btn-info">Edit</button></td>
            <td><button className="btn btn-danger">Delete</button></td>
          </tr>
          <tr>
            <td>1</td>
            <td>dd</td>
            <td>dd</td>
            <td>dd</td>
            <td><button className="btn btn-info">Edit</button></td>
            <td><button className="btn btn-danger">Delete</button></td>
          </tr> */}
         </tbody>
      </table>
    </div>
    </div>
    </>
  )
})
export default Studentlist