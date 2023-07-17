import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'


function Login(props) {
    const {showAlert} = props
    const { login } = useContext(NoteContext)
    const [state, setState] = useState({ email: "", password: "" })

    const onChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault()
        login(state, showAlert)
    }

    return (
        <div>
            <form onSubmit={handleClick}>
                <h2 className='mt-5'>Please Login to continue Notebook</h2>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input onChange={onChange} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={onChange} type="password" className="form-control" id="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary my-3">Login</button>
            </form>
        </div>
    )
}

export default Login