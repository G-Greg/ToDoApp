import React from 'react';
import Note from './Note';
import { NameModal} from './NameModal'
import { NoteModal} from './NoteModal'
import { Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
//import { propTypes } from 'react-bootstrap/esm/Image';

export class BoardNoteTable extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            notes: props.notes,
            nameModalDisplay: false,
            noteModalDisplay: false
        }
    }
  
    nameModal = (bool) => {
        console.log(bool)
        this.setState({
            nameModalDisplay: bool
        })
    }

    noteModal = (bool) => {
        console.log(bool)
        this.setState({
            noteModalDisplay: bool
        })
    }


    render(){
        return(
        <div className="noteTable">
                { this.state.nameModalDisplay ? <NameModal handleTitle={this.props.handleTitle} titleId={this.props.nemkey} /> : null }
                { this.state.noteModalDisplay ? <NoteModal handleNote={this.props.handleNote} columnIndex={this.props.nemkey} /> : null }
            <Row>
                <Col md="8">
                    <h4>{this.props.name}</h4>
                </Col> 

                <Col md="1">
                    <h4>{this.state.notes.length}</h4>
                </Col> 

                <Col md="1">
                    <i onClick={() => this.nameModal(!this.state.nameModalDisplay)}>
                    <FontAwesomeIcon icon={faPen} />
                    </i>
                </Col>

                <Col md="2">
                    <i onClick={() => this.noteModal(!this.state.noteModalDisplay)}>
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
                        />)})
                        }
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
