import axios from 'axios'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Spinner } from "react-bootstrap";
let Studentlist= forwardRef ((props,ref )=> {
  let i=0
   const [loading, setLoading] = useState(true);
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
  }));
  return (
    <>
    {loading &&
<div className="d-flex justify-content-center mt-5">
<Spinner animation="border" role="status" >
      <span className="text-danger visually-hidden">Loading...</span>
    </Spinner>
    </div>}
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
            <td><button className="btn btn-danger text-white">Delete</button></td>
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