import React from 'react';
import {Note} from './Note';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';



export class BoardNoteTable extends React.Component{
    
    state = {
        notes: []
    }
  
    newNote = () => {
        this.setState({
            notes : [...this.state.notes, <Note key={this.state.notes.length}/>]
        })
        console.log(this.state.notes)
    }

    editName = () => {
        console.log(this.props.name)
        this.props.name = 'asd'
    }
    
    render(){
        return(
            <div className="noteTable">
                <Row>
                    <Col md="8">
                        <h4>{this.props.name}</h4>
                    </Col> 

                    <Col md="1">
                        <h4>{this.state.notes.length}</h4>
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
                    {this.state.notes}
                </div>
            </div>
        )
    }
}