import React from 'react';
import {Note} from './Note';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { PopupModal } from './PopupModal';



export class BoardNoteTable extends React.Component{
    
    state = {
        notes: [],
        name: this.props.name,
        display: false
    }
  
    editName = (bool) => {
         this.setState({
            display: bool
        })
    }


    newNote = () => {
        this.setState({
            notes : [...this.state.notes, <Note key={this.state.notes.length}/>]
        })
        console.log(this.state.notes)
    }

    /*eeditName = () => {
        var title = prompt('Name:')
        this.setState({
            name: title
        })
    }*/

    /*search = () => {
        notes: this.state.notes.map(note => ((note.key === 0)? ({...notes, key: 21}) : ({...notes}) ))
    }*/
    
    render(){
        return(
            <div className="noteTable">
                 { this.state.display ? <PopupModal /> : null }
                <Row>
                    <Col md="8">
                        <h4>{this.state.name}</h4>
                    </Col> 

                    <Col md="1">
                        <h4>{this.state.notes.length}</h4>
                    </Col> 

                    <Col md="1">
                        <a onClick={() => this.editName(!this.state.display)}>
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