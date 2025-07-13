import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Studentlist({datalist}) {
  let i=0
    
  return (
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
            datalist.length ?
            
              datalist.map((item,index)=>
           (
                <tr key={index}>
                  <td>{++i}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                   <td><button className="btn btn-info">Edit</button></td>
            <td><button className="btn btn-danger">Delete</button></td>
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
  )
}
