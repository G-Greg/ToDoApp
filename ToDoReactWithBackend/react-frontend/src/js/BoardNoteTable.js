import React from 'react';
import Note from './Note';
import { NameModal} from './NameModal'
import { Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
//import { propTypes } from 'react-bootstrap/esm/Image';

export class BoardNoteTable extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            notes: props.notes,
            name: props.name,
            display: false
        }
    }
  
    editName = (bool) => {
        console.log(bool)
        this.setState({
            display: bool
        })
    }

//teszt

    newNote = () => {
        this.setState({
            notes : [...this.state.notes, <Note key={this.state.notes.length}/>]
        })
        console.log(this.state.notes)
    }

    /*
    search = () => {
        notes: this.state.notes.map(note => ((note.key === 0)? ({...notes, key: 21}) : ({...notes}) ))
    }*/
    
    //console.log(this.state.notes, this.state.name, this.state.notes.length)
    render(){
        return(
        <div className="noteTable">
                { this.state.display ? <NameModal/> : null }
            <Row>
                <Col md="8">
                    <h4>{this.state.name}</h4>
                </Col> 

                <Col md="1">
                    <h4>{this.state.notes.length}</h4>
                </Col> 

                <Col md="1">
                    <i onClick={() => this.editName(!this.state.display)}>
                    <FontAwesomeIcon icon={faPen} />
                    </i>
                </Col>

                <Col md="2">
                    <i onClick={() => this.newNote()}>
                        <FontAwesomeIcon icon={faPlus} />
                    </i>
                </Col>
            </Row>
            <hr/>
            <div className='NoteList'>
                {
                this.state.notes.map((note, noteIndex) => {
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
    )}
}

/*
type check

BoardNoteTable.propTypes = {
    name: propTypes.string
};
*/
