import React from 'react';
import Note from './Note';
import { NameModal} from './NameModal'
import { Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';

const BoardNoteTable = ({name, notes}) => {
    
    const state = {
        old_notes: [],
        name: name,
        display: false
    }
  
    const editName = (bool) => {
        console.log(bool)
        this.setState({
            display: bool
        })
    }


    const newNote = () => {
        this.setState({
            old_notes : [...state.old_notes, <Note key={state.old_notes.length}/>]
        })
        console.log(state.old_notes)
    }

    /*
    search = () => {
        notes: this.state.notes.map(note => ((note.key === 0)? ({...notes, key: 21}) : ({...notes}) ))
    }*/
    
    //console.log(this.state.notes, this.state.name, this.state.notes.length)
    return(
        <div className="noteTable">
                { state.display ? <NameModal/> : null }
            <Row>
                <Col md="8">
                    <h4>{state.name}</h4>
                </Col> 

                <Col md="1">
                    <h4>{state.old_notes.length}</h4>
                </Col> 

                <Col md="1">
                    <a onClick={() => editName(!state.display)}>
                    <FontAwesomeIcon icon={faPen} />
                    </a>
                </Col>

                <Col md="2">
                    <a onClick={() => newNote()}>
                        <FontAwesomeIcon icon={faPlus} />
                    </a>
                </Col>
            </Row>
            <hr/>
            <div className='NoteList'>
                {
                notes.map((note, noteIndex) => {
                    return(
                    <Note 
                    key = {noteIndex} 
                    priority = {note.priority}
                    title = {note.cardTitle}
                    desc = {note.desc}
                    date = {note.date}
                    />)})}
            </div>
        </div>
    )
}

export default BoardNoteTable;