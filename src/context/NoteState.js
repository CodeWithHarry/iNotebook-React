import NoteContext from './NoteContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

const NoteState = (props) => {

  // const [Name, setName] = useState()
  // let user = Name


  // const url = "https://living-possible-wish.glitch.me";
  const url = "http://localhost:4000";

  const [notes, setNotes] = useState([])
  let navigate = useNavigate()




  //*Login
  const login = async (credential, showAlert) => {

    const { email, password } = credential

    await axios.post(`${url}/login`, { email, password })
      .then((res) => {
        const token = res.data.token
        localStorage.setItem('x-api-key', token)
        showAlert("Logged in succcessfully!", "success")
        navigate('/')
      })
      .catch((err) => {
        // Wow what a nice logic // err will not console everytime while error occurs by user
        if (err.response.data.status === false) {
          showAlert(`${err.response.data.message}`, "danger")
        } else {
          console.log(err)
        }

      })
  }


  //*SignUp
  const SignUp = async (credentials, showAlert) => {
    const { name, email, password } = credentials

    axios.post(`${url}/createUser`, { name, email, password })
      .then((res) => {
        localStorage.setItem("x-api-key", res.data.token)
        showAlert("Signed in successfully!", "success")
        navigate('/')
      })
      .catch((err) => {
        if (!err.response.data.status) {
          showAlert(`${err.response.data.message}`, "danger")
        } else {
          console.log(err)
        }
      })
  }


  //*GetNotes
  const getNotes = async () => {
    await axios.get(`${url}/getNotes`, { headers: { 'x-api-key': localStorage.getItem('x-api-key') } })
      .then((res) => { setNotes(res.data.message) })
      .catch((err) => { console.log(err.message) })
  }


  //*Add Note
  const addNote = async (note, showAlert) => {

    const { title, description, tag } = note
    setNotes(notes.concat(note))

    await axios.post(`${url}/createNote`, { title, description, tag }, { headers: { 'x-api-key': localStorage.getItem('x-api-key') } })
      .then((res) => { getNotes() }, showAlert("Added successfully!", "success")
      )
      // added successfully alert
      .catch((err) => {
        if (!err.response.data.status) {
          showAlert(`${err.response.data.message}`, "danger")
        } else {
          console.log(err)
        }
      })

    // setNotes(notes.concat(sample))
  }


  //*Edit Note
  const editNote = async (note, showAlert) => {

    const { id, title, description, tag } = note

    await axios.put(`${url}/updateNote/${id}`, { title, description, tag }, { headers: { 'x-api-key': localStorage.getItem('x-api-key') } })
      .then((res) => {
        getNotes()
        showAlert("Edited successfully", "success")

      })
      .catch((err) => {
        if (!err.response.data.status) {
          showAlert(`${err.response.data.message}`, "danger")
        } else {
          console.log(err)
        }
      })

    // not necessery //! if note not edited in database still this will show edited note 

    let newNotes = [...notes]
    for (let element of newNotes) {
      if (id === element._id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }


  //* Delete Note 
  const deleteNote = async (id, showAlert) => {
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
    // console.log("Deleting note with id - " + id)
    await axios.delete(`${url}/deleteNote/${id}`, { headers: { 'x-api-key': localStorage.getItem('x-api-key') } })
      .then(() => {
        getNotes()
        showAlert("Deleted successfully!", "warning")
      })
      .catch((err) => {
        if (!err.response.data.status) {
          showAlert(`${err.response.data.message}`, "danger")
        } else {
          console.log(err)
        }
      })
    // const newNotes = notes.filter((note) => { return note._id !== id })
    // setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes, login, SignUp}} >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;