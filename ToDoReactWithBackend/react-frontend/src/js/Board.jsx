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

    handleNewNote = (priority, title, desc, date, columnIndex) => {
        this.setState({
            ...this.state.allNotes[columnIndex].notes.push(
            {
                priority: priority,
                cardTitle: title,
                desc: desc,
                date: date
            })
        })

        var item = {
            columnindex: columnIndex,
            priority: priority,
            title: title,
            description: desc,
            date: date
        }

        console.log(item)
        axios.post('/api/todoitems', item).catch(error => console.error('Unable to update item', error));

        this.forceUpdate()
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
    
    componentDidMount() {
        axios.get('api/todoitems').then(res => {
            if (res.status === 200) {
                this.loadData(res.data);
            }
        });
    }

    loadData(data) {
        if (this.state.allNotes.some(arr => arr.notes.length !== 0)) return
        console.log(data)
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
                        handleMove={this.handleMoveNote}/>         
                    )
                }
                </Row>
            </div>
        )
    }
}