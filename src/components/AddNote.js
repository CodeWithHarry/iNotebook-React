import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'

function Form(props) {

  const {showAlert} = props
  let { addNote } = useContext(NoteContext)
  const [note, setNotes] = useState({ title: "", description: "", tag: "General" })

  const onChange = (e) => {
    setNotes({ ...note, [e.target.id]: e.target.value }) //https://youtu.be/GsVXwTeMn4o //* New Syntax
  }

  const handleClick = (e) => {
    e.preventDefault() // To avoid reload page
    addNote(note, showAlert)
    setNotes({ title: "", description: "", tag: "" })
    props.showAlert("Added successfully!", 'success')
  }

  return (
    <div className="container mt-3">
      <h1 className='text-center'>Add Note</h1>
      <form className='my-3' onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea type="text" className="form-control" id="description" value={note.description}  onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label" >Tag</label>
          <input type="text" className="form-control" id="tag" value={note.tag}  onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Add Note</button>
      </form>
    </div>
  )
}
// onSubmit should on form tag
//! What is different between onClick and onSubmit
export default Form