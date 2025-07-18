import { useEffect, useRef, useState } from "react";
import Studentlist from "./Studentlist";
import axios from "axios";
export default function Newform() {
  const studentListRef = useRef()
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("")
  const [showMsg, setShowMsg] = useState(true);
  //let [studentdata,setStudentdata]=useState([])
  const countRef = useRef(0)
  const [count, setCount] = useState(1)
  //    useEffect(()=>{
  //  studentgetdata()
  //  setTimeout(() => {

  //   setLoading(false)
  //  }, 10000); 



  // },[])
  // let studentgetdata=()=>{
  //   axios.get("https://vercel-backend-g6yd.onrender.com/web/api/student/student-view").then((res)=>{
  //     //alert(res.data)
  //     //console.log(res.data)
  //          return res.data
  //   }).then((finaldata)=>{
  //    // console.log(finaldata)
  //     if(finaldata.status)
  //       setStudentdata(finaldata.data)
  //   }).catch(error => {
  //   console.error('Error fetching data:', error); // Handle error
  // })
  // }

  // useEffect(()=>{
  //     countRef.current=count
  // },[count])
  let [newstudent, setStudent] = useState({})
  let [errors, setError] = useState({})
  //function for inserting data
  const student = (e) => {
    e.preventDefault();

    let validateerror = validate()
    if (Object.keys(validateerror).length > 0) {
      //alert("form not sumbitted")

    }
    else {
      //alert("form submitted")
      let formdata = { name: newstudent.studentname, email: newstudent.studentemail, phone: newstudent.studentphone }
      axios.post("https://vercel-backend-g6yd.onrender.com/web/api/student/student-insert", formdata).then((response) => {
        console.log(response.data)
        console.log(response.data.status)
        // alert(response.data)
        if (response.data.status) {
          setMsg("Data saved successfuly")

        }
        else if (response.data.status == 0) {

          //console.log("the errordata=="+response.data.Error.keyPattern.email)
          if (response.data.Error.keyPattern.email)
            setMsg("data did not save due to Duplicate Email value")
          else if (response.data.Error.keyPattern.phone)
            setMsg(" data disnot save due to Duplicate Phone value")

        }
        //studentgetdata()
        studentListRef.current.refreshList()

      }
        //end of response data

      )
        .catch((error) => {
          console.error(error)
          if (error.response) {
            // Server responded with a status code out of 2xx
            setMsg(`Error: ${error.response.data.message || error.response.statusText}`);
          } else if (error.request) {
            // Request was made but no response
            setMsg('No response from server. or network error');
          } else {
            // Other errors
            setMsg(`Request error: ${error.message}`);
          }

        })
      alert("newmsg")
      setStudent({})
      setShowMsg(true)
      setTimeout(() => {
        setShowMsg(false)
      }, 8000)
    }
  }
  const validate = () => {
    let temperror = {}
    let regexemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    let regexphone = /^\d{10}$/
    //  alert("the value of name"+newstudent.studentname)
    //  alert("the value of email"+newstudent.studentemail)
    //  alert("the phone value"+newstudent.studentphone)
    if (newstudent.studentname == "" || newstudent.studentname == null) {
      temperror.name = "please enter the name or name cannot be blank"
      //setError(temperror)
    }
    if (newstudent.studentemail == "" || newstudent.studentemail == null)
      temperror.email = "Please Enter the email"
    else if (!regexemail.test(newstudent.studentemail))
      temperror.email = "please enter valid email"
    if (newstudent.studentphone == "" || newstudent.studentphone == null)
      temperror.phone = "Please Enter the Phone number"
    else if (!regexphone.test(newstudent.studentphone))
      temperror.phone = "phone number must be 10 digit and digit only"
    setError(temperror)
    return temperror
  }
  const ChangeHandle = (e) => {
    const { name, value } = e.target
    setStudent(prev => ({ ...prev, [name]: value }))
  }
  
  
  return (
    <>

      <h1 className="bg bg-info text-black text-center p-1">Enter The Student-Data</h1>
      <form onSubmit={student} noValidate className="mx-auto w-50" id="studentform">
        <div className="mb-3">
          <label className="form-label">Enter Your Name</label>
          <input type="text" className="form-control" aria-describedby="emailHelp" name="studentname" onChange={ChangeHandle} required value={newstudent.studentname || ""} />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Enter Your Email</label>
          <input type="email" className="form-control" name="studentemail" onChange={ChangeHandle} required value={newstudent.studentemail || ""} />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Enter Your Phone Number</label>
          <input type="text" className="form-control" name="studentphone" onChange={ChangeHandle} required value={newstudent.studentphone || ""} />
          {errors.phone && <div className="text-danger">{errors.phone}</div>}
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Data</button>
      </form>
      {msg && showMsg && <h1 className="position-fixed top-0 end-0 text-white bg-danger">{msg}</h1>}
      {/* {loading &&
<div className="d-flex justify-content-center mt-5">
<Spinner animation="border" role="status" >
      <span className="text-danger visually-hidden">Loading...</span>
    </Spinner>
    </div>} */}
      {<Studentlist ref={studentListRef} />}
    </>
  )
}