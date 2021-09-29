import React, { useState, useEffect } from 'react'
import studentService from './services/students'

const Entry = ({ missingField, handleInputChange }) => {
  return (
      <li>
          <label>{missingField}</label>
          <input name={missingField} type={missingField} required onChange={handleInputChange}/>
      </li>
  )
}

const MissingFields = ({ incompleteFields, student, updatedMissingList, handleInputChange}) => {
  if (incompleteFields.length > 0 && Object.keys(student).length !== 0) {
    return(
      <>
        <form onSubmit={updatedMissingList}>
            {incompleteFields.map(missingField => 
            <Entry key={missingField} missingField={missingField} handleInputChange={handleInputChange}/>
            )}
            <button type="submit">Submit</button>
        </form>
      </>
    )
  }
  return null
}

const App = () => {
  
    const [ student, setStudent ] = useState({})
    const [ incompleteFields, setIncompleteFields ] = useState([])
    const [ newStudentId, setStudentId] = useState(0)
    const [ formData, setFormData] = useState({})

    console.log(newStudentId, 'HandleStudentID')
    
    useEffect(() => {
      const requiredFields = {
        A: ["dob", "idNumber", "gender"],
        B: ["address"],
        C: ["provinces", "schools", "grades"],
        D: ["serialNumber", "imei"]
      }

      let incomplete = Object.keys(requiredFields)
        .map(fields => requiredFields[fields])
        .flat()
        .filter(field => student[field] === null || !student.hasOwnProperty(field))
        console.log(incomplete)
        setIncompleteFields(incomplete)
    }, [student])
  
    const checkStudent = (event) => {
      event.preventDefault()
      const id = newStudentId
      console.log(id, 'logged variable')
      studentService
        .getIncomplete(id)
        .then(initialStudent => {
          setStudent(initialStudent)
        })
    }

    const updatedMissingList = (event) => {
      event.preventDefault()
      const returnedTarget = {...student, ...formData}
      console.log(returnedTarget)
      studentService
        .update(newStudentId, returnedTarget)
        .then( updatedStudent => {
          window.alert(`${updatedStudent.firstName} has been updated`)
          setStudent({})
        })
    }

    const handleInputChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value.trim()
      })
    }

    const handleStudentID = (event) => {
      setStudentId(event.target.value)
      setStudent({})
    }
  
    return (
      <div>
        <form onSubmit={checkStudent}>
          <label>Please enter student ID</label>
          <br/>
          <input value={newStudentId} onChange={handleStudentID}/>
          <button type="submit">check</button>
        </form>
        <MissingFields 
          incompleteFields={incompleteFields}
          student={student} 
          updatedMissingList={updatedMissingList}
          handleInputChange={handleInputChange}
        />
      </div>
    )
  }
  
  export default App