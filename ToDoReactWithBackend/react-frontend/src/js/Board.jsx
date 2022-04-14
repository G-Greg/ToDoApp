import React from 'react';
import { Row } from 'react-bootstrap';
import { BoardNoteTable } from './BoardNoteTable';


export class Board extends React.Component{
    constructor() {
        super();
        this.state = {
            counter: 1,
            allNotes: [
                {
                    title: "ToDo",
                    notes: [
                        {
                            id: 0,
                            priority: 1,
                            cardTitle: "CardTitle",
                            desc: "This is the description",
                            date: "2022.10.10"
                        }
                    ]
                },
                {
                    title: "In Progress",
                    notes: []
                },
                {
                    title: "Done",
                    notes: []
                },
                {
                    title: "Blocked",
                    notes: []
                },
            ]
        }
    }
    
    setCounter = () => {
        this.setState({
            counter: this.state.counter+1
        })
    }
    
    handleTitleChange = (value, columnIndex) => {
        this.setState({
            ...this.state.allNotes[columnIndex].title = value
        })   
        this.forceUpdate()
    }

    handleNewNote = (priority, title, desc, date, columnIndex) => {
        this.setCounter()
        this.setState({
            ...this.state.allNotes[columnIndex].notes.push(
            {
                id: this.state.counter,
                priority: priority,
                cardTitle: title,
                desc: desc,
                date: date
            })
        })   
        this.forceUpdate()
    }

    handleDeleteNote = (id, columnIndex) => {
        console.log(id, columnIndex)
        delete this.state.allNotes[columnIndex][id]
        this.forceUpdate()

    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then((users) => this.setState({fullnewuser: users}));
    }

    render(){
        return(
            <div className="board">
                <h1>Project Board</h1>
                <hr/>
                <Row md={5}>
                {
                    this.state.allNotes.map((_, boardIndex) => 
                        <BoardNoteTable key={boardIndex} nemkey={boardIndex} name={this.state.allNotes[boardIndex].title} notes={this.state.allNotes[boardIndex].notes} 
                        handleTitle={this.handleTitleChange}
                        handleNote={this.handleNewNote}
                        handleDelete={this.handleDeleteNote}/>         
                    )
                }
                </Row>
            </div>
        )
    }
}