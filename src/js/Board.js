import React from 'react';
import { Row } from 'react-bootstrap';
import {BoardNoteTable} from './BoardNoteTable';


export class Board extends React.Component{
    constructor() {
        super();
        this.state = {
            allNotes: {
                toDoBoard: {
                    title: "ToDo",
                    notes: []
                },
                inProgressBoard: {
                    title: "In Progress",
                    notes: []
                },
                doneBoard: {
                    title: "Done",
                    notes: []
                },
                blockedBoard: {
                    title: "Blocked",
                    notes: []
                },
            }
        }
    }


    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then((users) => this.setState({notes: users}));
    }

    render(){
        return(
            <div className="board">
                <h1>Project Board</h1>
                <hr/>
                <Row md={5}>
                    <BoardNoteTable name={this.state.allNotes.toDoBoard.title} tNotes={this.state.allNotes.toDoBoard.notes}/>
                    <BoardNoteTable name={this.state.allNotes.inProgressBoard.title} iPNotes={this.state.allNotes.inProgressBoard.notes}/>
                    <BoardNoteTable name={this.state.allNotes.doneBoard.title} dNotes={this.state.allNotes.doneBoard.notes}/>
                    <BoardNoteTable name={this.state.allNotes.blockedBoard.title} bNotes={this.state.allNotes.blockedBoard.notes}/>                    
                </Row>
            </div>
        )
    }
}