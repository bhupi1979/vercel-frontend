import axios from 'axios'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Spinner } from "react-bootstrap";
let Studentlist= forwardRef ((props,ref )=> {
  const closeButtonRef=useRef(null)
  const ModalRef=useRef(null)
  let i=0
   const [loading, setLoading] = useState(true);
   const [msg, setMsg] = useState("")
  const [showMsg, setShowMsg] = useState(true);
   let [studentdata,setStudentdata]=useState([])
    let [errors, setErrors] = useState({})
     let [newEditstudent, setEditStudent] = useState({_id:"",name:"",email:"",phone:""})
     let [newupdatestudent,setupdatestudent]=useState({})
     useEffect(()=>{
      const modalEl = ModalRef.current;

  const handleClose = () => {
    setErrors({});
  }

  if (modalEl) {
    modalEl.addEventListener('hidden.bs.modal', handleClose);
  }

  
 studentgetdata()
 setTimeout(() => {
  
  setLoading(false)
 }, 10000)
 return () => {
    if (modalEl) {
      modalEl.removeEventListener('hidden.bs.modal', handleClose);
    }
  }
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
    //alert(id)
    let confirm1=confirm("DO YOU WANT DELETE THIS STUDENT RECOFED")
    if(confirm1)
    {
        axios.delete(`https://vercel-backend-g6yd.onrender.com/web/api/student/student-delete/${id}`).then((res)=>{
setMsg("Data deleted successfuly")
setShowMsg(true)
      setTimeout(() => {
        setShowMsg(false)
      }, 8000)
      studentgetdata()
        }).catch((err)=>{
          console.log(err.data)
            setMsg(err)
        })

    }
  }
  //************************* end of delete function */
  //start of edit function***************/
  let studentedit=(e)=>{
     let id=e.target.value 
     axios.get(`https://vercel-backend-g6yd.onrender.com/web/api/student/studentbyid/${id}`).then((res)=>{
          if (res.status)return res.data
     }).then((finaldata)=>{
      setEditStudent(finaldata.data)
     }).catch(err=>console.log(err.message))

  }
  //*****end of edit function */
  /****** */
  let onChangehandle=(e)=>{
    //alert(x)
   let {name,value}=e.target 
   setEditStudent((prev)=>({...prev,[name]:value}))
  }
  //************** */
  /******start of student update */
  let studentupdate=(e)=>{
    e.preventDefault()
    let errors1= validate()
    if(Object.keys(errors1).length>0)
    {
alert("form not submited")
    }
    else{
alert("form submited")
axios.put(`https://vercel-backend-g6yd.onrender.com/web/api/student/student-update/${newEditstudent._id}`,newEditstudent).then((res)=>{
  console.log(res.data.status)
  if(res.data.status)
  {
    
    setMsg("Data updated successfuly")

  }
  else{
    if (res.data.Error.keyPattern.email)
            setMsg("data did not save due to Duplicate Email value")
          else if (res.data.Error.keyPattern.phone)
            setMsg(" data disnot save due to Duplicate Phone value")
  }
   closeButtonRef.current.click()
   setShowMsg(true)
      setTimeout(() => {
        setShowMsg(false)
      }, 8000)
      studentgetdata()
}).catch((err)=>{
let errorMsg = "Something went wrong!";

        if (err.response) {
          errorMsg = err.response.data?.message || `Server Error: ${err.response.status}`;
        } else if (err.request) {
          errorMsg = "No response from server. Please try again.";
        } else {
          errorMsg = `Request error: ${err.message}`;
        }
        closeButtonRef.current.click()
       console.log(errorMsg)
        setMsg(errorMsg);
        setShowMsg(true);
        setTimeout(() => {
          setShowMsg(false);
        }, 8000);
})
    }
    
  }
  /*******end of student update */
  let validate=()=>{
    let temperror={}
    if(newEditstudent.name==""||newEditstudent.name==null)
    {
      temperror.name="Please enter the name can not be blank"
    }
    if(newEditstudent.email==""||newEditstudent.email==null)
      {
      temperror.email="Please enter the email can not be blank"
    }
    else if(! /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newEditstudent.email))
    {
      temperror.email="Please enter the valid email"
    }
    if(newEditstudent.phone==""||newEditstudent.phone==null)
      { 
        temperror.phone="Please enter the phone can not be blank"
    }
    else if(! /^\d{10}$/.test(newEditstudent.phone))
    {
      temperror.phone="Please enter valid 10 digit phone number and no alphabet"
    }
    setErrors(temperror)
    return temperror
  }
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
                   <td><button className="btn btn-warning text-white" value={item._id} onClick={studentedit} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button></td>
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
    {/* modal for edit */}
    
<button type="button" className="btn btn-primary" >
  Launch demo modal
</button>

{/* modal */}
<div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true" ref={ModalRef}>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {/* modal body start here */}
       <h4 className="bg bg-info text-black text-center p-1">Update The Student-Data</h4>
      <form onSubmit={studentupdate} noValidate className="mx-auto w-50" id="studentform">
        <input type="hidden" name="updateid" value={newEditstudent._id||""} />
        <div className="mb-3">
          <label className="form-label">Update Your Name</label>
          <input type="text" className="form-control" aria-describedby="emailHelp" name="name"  required value={newEditstudent.name||"" } onChange={onChangehandle} />
           {errors.name && <div className="text-danger">{errors.name}</div>} 
        </div>
        <div className="mb-3">
          <label className="form-label">update Your Email</label>
          <input type="email" className="form-control" name="email"  required value={newEditstudent.email||"" } onChange={onChangehandle} />
           {errors.email && <div className="text-danger">{errors.email}</div>} 
        </div>
        <div className="mb-3">
          <label className="form-label">update Your Phone Number</label>
          <input type="text" className="form-control" name="phone"  required value={newEditstudent.phone||"" } onChange={(e)=>{onChangehandle(e)}} />
           {errors.phone && <div className="text-danger">{errors.phone}</div>}
        </div>
        <button type="submit" className="btn btn-primary w-100" >Update</button>
      </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  ref={closeButtonRef}>Close</button>
        
      </div>
    </div>
  </div>
</div>
    </>
  )
})
export default Studentlist