import React from "react";
import { Row } from "react-bootstrap";
import { BoardNoteTable } from "./BoardNoteTable";
import axios from "axios";
import { DragDropContext, Droppable} from "react-beautiful-dnd";

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
        };
    }
    
    handleTitleChange = (value, columnIndex) => {
        this.setState((state) => {
            state.allNotes[columnIndex].title = value;
        });  
        this.forceUpdate();
    };

    handleNewNote = (newNote) => {
        axios.post("/api/todoitems", newNote)
            .then(res =>      
                this.setState({
                    ...this.state.allNotes[newNote.columnindex].notes.push(
                    {
                        id: res.data.id,
                        customorder: this.getNextOrder(newNote.columnindex),
                        priority: newNote.priority,
                        title: newNote.title,
                        description: newNote.description,
                        date: newNote.date
                    })
                }))
            .catch(error => console.error("Unable to update item", error));
    };

    handleDeleteNote = (id, columnIndex) => {
        const index = this.state.allNotes[columnIndex].notes.findIndex(note => note.id === id);
        this.setState({
            ...this.state.allNotes[columnIndex].notes.splice(index,1)
        });

        axios.delete(`api/todoitems/${id}`);
        this.forceUpdate();
    };


    handleUpdateNote = (id, updateNote) => {
        const index = this.state.allNotes[updateNote.columnindex].notes.findIndex(n => n.id === id);
        let copy = this.state.allNotes[updateNote.columnindex];
        copy.notes[index] = {
            id: id,
            priority: updateNote.priority,
            customorder: updateNote.customorder,
            title: updateNote.title,
            description: updateNote.description,
            date: updateNote.date
        };

        this.setState({...this.state.allNotes[updateNote.columnindex], notes:copy});

        axios.put(`api/todoitems/${id}`, updateNote).catch(error => console.error("Unable to update item", error));
        this.forceUpdate();
    };
    
    componentDidMount() {
        axios.get("api/todoitems").then(res => {
            if (res.status === 200) {
                this.loadData(res.data);
            }
        });
    }

    loadData(data) {
        if (this.state.allNotes.some(arr => arr.notes.length !== 0)) return;
        console.log(this.state.allNotes);
        data.map((note) =>
            this.setState({
                ...this.state.allNotes[note.columnIndex].notes.push(
                {
                    id: note.id,
                    columnindex: note.columnIndex,
                    customorder: note.customOrder,
                    priority: note.priority,
                    title: note.title,
                    description: note.description,
                    date: note.date
                })
            })
        );
    }

    getNextOrder = (columnindex) => {
        let max = 0;
        for (let i = 0; i < this.state.allNotes[columnindex].notes.length; i++) {
            if (this.state.allNotes[columnindex].notes[i].customorder > max) {
                max = this.state.allNotes[columnindex].notes[i].customorder;
            }
        }
        return max+1;
    };

    onDragEnd = (move) => {

        let note = this.state.allNotes[move.source.droppableId].notes.find(n => n.id === parseInt(move.draggableId));
        const index = this.state.allNotes[move.source.droppableId].notes.findIndex(n => n.id === note.id);

        if (move.source.droppableId === move.destination.droppableId) {
            const items = Array.from(this.state.allNotes[move.source.droppableId].notes);
            const [reorderedItem] = items.splice(move.source.index, 1);
            items.splice(move.destination.index, 0, reorderedItem);

            let copy = this.state;
            copy.allNotes[move.source.droppableId].notes = items;
            this.setState({copy});

            for (let i = 0; i < this.state.allNotes[move.source.droppableId].notes.length; i++) {
                let customCopy = this.state;
                customCopy.allNotes[move.source.droppableId].notes[i].customorder = i;
                this.setState({customCopy});       
            }
        
            axios.put(`api/todoitems/column/${parseInt(move.source.droppableId)}`, this.state.allNotes[move.source.droppableId].notes)
                .catch(error => console.error("Unable to update item", error));
        }
        else {
            note.columnindex = move.destination ? parseInt(move.destination.droppableId) : note.columnindex;

            this.setState({
                ...this.state.allNotes[move.source.droppableId].notes.splice(index, 1)
            });

            this.setState({
                ...this.state.allNotes[move.destination.droppableId].notes.push(
                {
                    id: note.id,
                    columnindex: note.columnindex,
                    customorder: note.customorder,
                    priority: note.priority,
                    title: note.title,
                    description: note.description,
                    date: note.date
                })
            });

            axios.put(`api/todoitems/${note.id}`, note).catch(error => console.error("Unable to update item", error));
            console.log(this.state.allNotes);
        }
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
                            {(provided) => (
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
        );
    }
}