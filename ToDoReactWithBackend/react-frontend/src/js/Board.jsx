import React from 'react';
import { Row } from 'react-bootstrap';
import { BoardNoteTable } from './BoardNoteTable';
import axios from 'axios';


export class Board extends React.Component{
    constructor() {
        super();
        this.state = {
            allNotes: [
                {
                    title: "ToDo",
                    notes: []
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
    
    handleTitleChange = (value, columnIndex) => {
        this.setState((state) => {
            state.allNotes[columnIndex].title = value
        })   
        this.forceUpdate()
    }

    handleNewNote = (newNote) => {
        axios.post('/api/todoitems', newNote)
            .then(res =>      
                this.setState({
                    ...this.state.allNotes[newNote.columnindex].notes.push(
                        {
                        id: res.data.id,
                        priority: newNote.priority,
                        cardTitle: newNote.title,
                        desc: newNote.description,
                        date: newNote.date
                    })
                }))
            .catch(error => console.error('Unable to update item', error));
    }

    handleDeleteNote = (id, columnIndex) => {
        const index = this.state.allNotes[columnIndex].notes.findIndex(note => note.id === id)
        this.setState({
            ...this.state.allNotes[columnIndex].notes.splice(index,1)
        })

        axios.delete(`api/todoitems/${id}`)

        this.forceUpdate()
    }

    handleMoveNote = (id, columnIndex, toMove) => {

        const found = this.state.allNotes[columnIndex].notes.find(n => n.id === id);

        this.setState({
            ...this.state.allNotes[columnIndex].notes.find(n => n.id === id).columnindex = toMove === "toRight" ? columnIndex + 1 : columnIndex - 1
        });

        console.log(found)
        //this.handleDeleteNote(id, columnIndex)
        //this.handleNewNote(found.priority, found.cardTitle, found.desc, found.date, toMove === "toRight" ? columnIndex + 1 : columnIndex - 1)

        axios.put(`api/todoitems/${id}`, found)

        this.forceUpdate()
    }

    handleUpdateNote = (id, updateNote) => {

        this.setState({
            ...this.state.allNotes[updateNote.columnindex].notes.map(n => n.id === id ? {...n, updateNote} : n)
        });

        console.log(this.state.allNotes)
        axios.put(`api/todoitems/${id}`, updateNote).catch(error => console.error('Unable to update item', error));

        this.forceUpdate()
    }
    
    componentDidMount() {
        axios.get('api/todoitems').then(res => {
            if (res.status === 200) {
                this.loadData(res.data);
            }
        });
    }

    loadData(data) {
        if (this.state.allNotes.some(arr => arr.notes.length !== 0)) return

        data.map((note) =>
            this.setState({
                ...this.state.allNotes[note.columnIndex].notes.push(
                {
                    id: note.id,
                    columnindex: note.columnIndex,
                    priority: note.priority,
                    cardTitle: note.title,
                    desc: note.description,
                    date: note.date
                })
            })
        )
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
                        handleDelete={this.handleDeleteNote}
                        handleMove={this.handleMoveNote}
                        handleUpdate={this.handleUpdateNote}/>
                    )
                }
                </Row>
            </div>
        )
    }
}