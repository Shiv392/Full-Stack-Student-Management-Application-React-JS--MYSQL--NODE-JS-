import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Student() {
    const [id,setId]=useState('')
    const [name,setName]=useState('');
    const [course,setCourse]=useState('');
    const [fee,setFees]=useState(0);
    //to store all data from database 
    const [students,setStudents]=useState([]);
    useEffect(()=>{
        (async ()=> load()) ();
    },[]);
    const load=async()=>{
        let response = await axios.get('http://localhost:8000/user');
        console.log(response.data);
        setStudents(response.data.user);
        console.log(students);
    }
    //adding new data to the table
    const save=async (e)=>{
         e.preventDefault();
         try{
             await axios.post('http://localhost:8000/user',{
                name:name,
                course:course,
                fee:fee
             })
             alert('new student added successfully');
             load();
             setName('');
             setCourse('');
             setFees(0)
         }
         catch(err){
        alert('student adding unsuccessfull');
        console.log('adding error',err);
         }
    }
    const update= async (e)=>{
    e.preventDefault();
    try{
await axios.put('http://localhost:8000/user/update/'+ students.find(u => u.id===id).id || id,{
    id:id,
    name:name,
    course:course,
    fee:fee
   })
   alert('updated registration successfull')
    }
    catch(err){
      console.log('error while updating new user',err);
    }
    }
    //deleting the user from table
    const deleteStudent=async (id)=>{
  
    
    await axios.delete(`http://localhost:8000/user/delete/${id}`);
    alert('student deleted successfully');
    load();
   
    
    }
    const editStudent=(student)=>{
         setName(student.name);
         setCourse(student.course);
         setFees(student.fee)
    }
  return (
    <>
    <div className='container mt-3'>
      <h1 className='text text-danger'>Students Details</h1>
      <form className='form mt-3'>
        <div className='form-group'>
            <input type='text ' className='form-control' id="student_id" hidden value={id}
            onChange={(e)=> setId(e.target.value)}
            />
            <label>Student Name</label>
                <input  type="text" class="form-control" id="name"
                value={name}
                onChange={(event) =>
                  {
                    setName(event.target.value);      
                  }}
                  required
                />
        </div>
        <div className='form-group'>
            <label>Course</label>
            <input type='text ' className='form-control' id="course"  value={course} onChange={(e)=>setCourse(e.target.value)} required />
        </div>
        <div className='form-group'>
            <label>Fees</label>
            <input type='number' className='form-control' id='fee' value={fee} onChange={e=> setFees(e.target.value)} required />
        </div>
      </form>
  <div className='mt-3'>
    <button onClick={save} className='btn btn-primary'>Add Student</button>
    <button onClick={update} className='btn btn-warning'>Upadate</button>
  </div>

    </div>
    <table className='table table-dark mt-5' align='center'>
        <thead >
            <tr>
                <th>Student Id</th>
                <th>Student Name</th>
                <th>Course</th>
                <th>Fee</th>
                <th>Actions</th>
            </tr>
        </thead>
        {students.map((student)=>{
            return (
                <tbody>
                    <tr>
                    <th scope='row'>{student.id}</th>
                    <td>{student.name}</td>
                    <td>{student.course}</td>
                    <td>{student.fee} Rs</td>
                    <td>
            <button onClick={()=> editStudent(student)} className='btn btn-warning'>Edit</button>
            <button onClick={()=> deleteStudent(student.id)} className='btn btn-danger'>Delete</button>
                    </td>
                    </tr>
                </tbody>
            );
        })}
    </table>
    </>
  )
}

export default Student
