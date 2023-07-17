import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/NoteContext'
import Noteitem from '../components/Noteitem'
import { useNavigate } from 'react-router-dom'


function Notes(props) {
    const { showAlert } = props
    const { notes, getNotes, editNote } = useContext(NoteContext)
    const Navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('x-api-key')) {
            getNotes()
        } else {
            Navigate('/Login')
        }
        // eslint-disable-next-line
    }, [])

    const [value, setValue] = useState({ id: "", title: "", description: "", tag: "Default" })

    const onChange = (e) => {
        setValue({ ...value, [e.target.id]: e.target.value })
        // console.log(value)
    }

    const handleClick = (e) => {
        editNote(value, showAlert)
        refClose.current.click()
    }

    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (note) => {
        ref.current.click()
        setValue({ id: note._id, title: note.title, description: note.description, tag: note.tag })
        // console.log(note)
    }

    // console.log(notes, setNotes) 
    return (<>

        <button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title mx-5" id="exampleModalLabel">Edit Note - {value.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <label htmlFor="title" className='text-primary mx-2 mb-2'>Title</label>
                        <input type="text" className='form-control' placeholder='Title' id="title" value={value.title} onChange={onChange} /><br />
                        <label htmlFor="Description" className='text-primary mx-2 mb-2'>Description</label>
                        <input type="text" className='form-control' placeholder='Description' id="description" value={value.description} onChange={onChange} /><br />
                        <label htmlFor="Tag" className='text-primary mx-2 mb-2'>Tag</label>
                        <input type="text" className='form-control' placeholder='Tag' id="tag" value={value.tag} onChange={onChange} />
                    </div>
                    <div className="modal-footer">
                        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Descard</button>
                        <button type="button" disabled={value.title.length < 5 || value.description.length < 5} className="btn btn-success" onClick={handleClick} >Update Note</button>
                    </div>
                </div>
            </div>
        </div>

        <div className='container row my-3'>
            <h2>Your Notes</h2>
            <div className="container bg-danger mx-3">
                {notes.length === 0 && "No notes to Display"}
            </div>
            {notes.map((note) => {
                return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert} />
            })}
        </div>
    </>
    )
}

//! Noteitem has all properties of Notes.note "Forever"

export default Notes