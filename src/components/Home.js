import React from 'react'
import Notes from '../components/Notes'
import AddNote from '../components/AddNote'

function Home(props) {

  return (<>
    <AddNote  showAlert={props.showAlert} />
    <Notes showAlert={props.showAlert} /> 
  </>
  )
}

export default Home