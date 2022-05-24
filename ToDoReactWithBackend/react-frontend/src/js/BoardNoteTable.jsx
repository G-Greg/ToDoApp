import React from "react";
import Note from "./Note";
import { NameModal} from "./NameModal";
import { NoteModal} from "./NoteModal";
import { Row, Col} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Draggable } from "react-beautiful-dnd";
import { PropTypes } from "prop-types";

export class BoardNoteTable extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            notes: props.notes,
            nameModalDisplay: false,
            noteModalDisplay: false,
            data: null
        };
    }
  
    nameModal = (bool) => {
        this.setState({
            nameModalDisplay: bool
        });
    };

    noteModal = (bool) => {
        this.setState({
            noteModalDisplay: bool
        });
    };

    handleModalClose = (modal, bool) => {
        if(modal === "Name"){
            this.setState({
                nameModalDisplay: bool
            });
        }
        else if(modal === "Note"){
            this.setState({
                noteModalDisplay: bool,
                data: null
            });
        }
    };

    handleOnClick = (id) => {
        axios.get(`api/todoitems/${id}`).then(res => {
            if (res.status === 200) {
                this.setState({
                    data: res.data
                });
                this.setState({
                    noteModalDisplay: true
                });
            }
        });
    };


    render(){
        return(
        <div className="noteTable">
                { this.state.nameModalDisplay ? <NameModal handleTitle={this.props.handleTitle} titleId={this.props.nemkey} handleClose={this.handleModalClose}/> : null }
                { this.state.noteModalDisplay ? <NoteModal loadData={this.state.data} handleNote={this.props.handleNote} columnIndex={this.props.nemkey} handleClose={this.handleModalClose} handleUpdate={this.props.handleUpdate}/> : null }
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
                    this.state.notes.sort((a, b) => (a.priority > b.priority || (a.priority === b.priority && a.customorder > b.customorder)) ? 1 : -1)
                    .map((note, noteIndex) => {
                        return (
                            <Draggable draggableId={note.id.toString()} key={note.id} index={noteIndex}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <Note 
                                            key = {noteIndex}
                                            id = {note.id}
                                            columnIndex = {this.props.nemkey}
                                            priority = {note.priority}
                                            title = {note.title}
                                            description={note.description}
                                            date = {note.date}
                                            handleDelete = {this.props.handleDelete}
                                            handleClick = {this.handleOnClick}
                                            />
                                    </div>
                                )}
                            </Draggable>
                        );
                    })
                }
            </div>
        </div>
    );}
}

BoardNoteTable.propTypes = {
    name: PropTypes.string,
    nemkey: PropTypes.number,
    notes: PropTypes.array,
    handleTitle: PropTypes.func,
    handleNote: PropTypes.func,
    handleUpdate: PropTypes.func,
    handleDelete: PropTypes.func
};
