import React from 'react';
import { Row } from 'react-bootstrap';
import { BoardNoteTable } from './BoardNoteTable';
import axios from 'axios';
import { DragDropContext, Droppable} from 'react-beautiful-dnd';

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


    handleUpdateNote = (id, updateNote) => {

        const index = this.state.allNotes[updateNote.columnindex].notes.findIndex(n => n.id === id);
        this.setState({
            ...this.state.allNotes[updateNote.columnindex].notes[index] = {
                id: id,
                priority: updateNote.priority,
                cardTitle: updateNote.title,
                desc: updateNote.description,
                date: updateNote.date
            }
        });

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
        console.log(this.state.allNotes)
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

    onDragEnd = (move) => {
        let note = this.state.allNotes[move.source.droppableId].notes.find(n => n.id === parseInt(move.draggableId))
        const index = this.state.allNotes[move.source.droppableId].notes.findIndex(n => n.id === note.id)

        note.columnindex = move.destination ? parseInt(move.destination.droppableId) : note.columnindex

        let item = {
            id: note.id,
            columnindex: note.columnindex,
            priority: note.priority,
            title: note.cardTitle,
            description: note.desc,
            date: note.date
        }

        this.setState({
            ...this.state.allNotes[move.source.droppableId].notes.splice(index, 1)
        })


        this.setState({
            ...this.state.allNotes[move.destination.droppableId].notes.push(
            {
                id: note.id,
                columnindex: note.columnindex,
                priority: note.priority,
                cardTitle: note.cardTitle,
                desc: note.desc,
                date: note.date
            })
        })

        axios.put(`api/todoitems/${note.id}`, item).catch(error => console.error('Unable to update item', error));
    };

    render(){
        return(
            <div className="board">
                <h1>Project Board</h1>
                <hr/>
                <DragDropContext onDragEnd={this.onDragEnd}>
                <Row md={5}>
                {
                    this.state.allNotes.map((_, boardIndex) => 
                        <Droppable droppableId={boardIndex.toString()} key={boardIndex}>
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef}>

                                    <BoardNoteTable
                                        key={boardIndex}
                                        nemkey={boardIndex}
                                        name={this.state.allNotes[boardIndex].title}
                                        notes={this.state.allNotes[boardIndex].notes}
                                        handleTitle={this.handleTitleChange}
                                        handleNote={this.handleNewNote}
                                        handleDelete={this.handleDeleteNote}
                                        handleUpdate={this.handleUpdateNote}
                                    />
                                {provided.placeholder}</div>
                            )}
                        </Droppable>
                    )
                }
                </Row>
                </DragDropContext>
            </div>
        )
    }
}