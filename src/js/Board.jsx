import React from 'react';
import { Row } from 'react-bootstrap';
import BoardNoteTable from './BoardNoteTable';


export class Board extends React.Component{
    constructor() {
        super();
        this.state = {
            allNotes: {
                toDoBoard: {
                    title: "ToDo",
                    notes: [
                        {
                            priority: 1,
                            cardTitle: "CardTitle",
                            desc: "This is the description",
                            date: "2022.10.10"
                        }
                    ]
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


    newNoteClickTesting = (e) =>{
        console.log(e)
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
                    <BoardNoteTable name={this.state.allNotes.toDoBoard.title} notes={this.state.allNotes.toDoBoard.notes}/>
                    <BoardNoteTable name={this.state.allNotes.inProgressBoard.title} notes={this.state.allNotes.inProgressBoard.notes}/>
                    <BoardNoteTable name={this.state.allNotes.doneBoard.title} notes={this.state.allNotes.doneBoard.notes}/>
                    <BoardNoteTable name={this.state.allNotes.blockedBoard.title} notes={this.state.allNotes.blockedBoard.notes}/>                    
                </Row>
            </div>
        )
    }
}