import React from 'react';
import {Note} from './Note';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';

const notes = [];

export class BoardNoteTable extends React.Component{
    listNotes(){
        return notes.map((note) => console.log(234));
    }
    
    newNote = () => {
        notes.push(<Note key={notes.length}/>)
        console.log(notes)
        return notes
    }

    editName = () => {
        console.log(this.props.name)
    }
    
    render(){
        return(
            <div className="container">
                <Row>
                    <Col md="9">
                        <h3>{this.props.name}</h3>
                    </Col> 

                    <Col md="1">
                        <a onClick={this.editName}>
                        <FontAwesomeIcon icon={faPen} />
                        </a>
                    </Col>

                    <Col md="2">
                        <a onClick={() => this.newNote()}>
                            <FontAwesomeIcon icon={faPlus} />
                        </a>
                    </Col>
                </Row>
                <hr/>
                <div className='NoteList'>
                    {notes}
                </div>
            </div>
        )
    }
}