import React, {useContext} from 'react'
import NoteContext from '../context/NoteContext'

function Noteitem(props) {

    const {showAlert} = props
    const {deleteNote} = useContext(NoteContext)

    const { note, updateNote } = props;

    return (
        <div className='col-md-4'>
            <div className="card  my-3">
                <div className='card-body' >
                    <div className="d-flex align-items-center">
                        <h5 className='card-title'>{note.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{ deleteNote(note._id, showAlert)}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className='card-text'> {note.description}</p>
                    <p className='card-text'> {note.tag}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem