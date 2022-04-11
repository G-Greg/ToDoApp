import React from 'react';
import { Row } from 'react-bootstrap';
import { BoardNoteTable } from './BoardNoteTable';


export class Board extends React.Component{
    constructor() {
        super();
        this.state = {
            allNotes: [
                {
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
        console.log(value)



        this.setState((state, props) => {
            console.log(state, props)
            console.log(columnIndex)
            state.allNotes[columnIndex].title = value
        })   
        this.forceUpdate()




        /*
        this.setState({
            allNotes: {...this.state.allNotes, toDoBoard:{...this.state.allNotes.toDoBoard, title: "something"}}
        })

        this.setState((state, props) => {
            console.log(state,props)
            state.allNotes[Object.keys(state.allNotes)[columnIndex]].title = value
        })     

        this.setState(function(state) {
            return { 
            blockedBoard: Object.assign({}, 
                state.allNotes.blockedBoard.title, {
                title: value 
            })
            }
        })

        this.setState({
            blockedBoard:{ title: 'jack'}
        })

        /*this.setState({
            allNotes: {
                  allNotes.map(),
                  title: 'something'
            }
        })*/

        /*this.setState({
            title: {...this.state.allNotes.key(columnIndex).title, title:""}
            //prevState.allNotes.map(table => ((table.columnIndex === 0)? {...table, title: "21"} : table ))
        })*/
        console.log(this.state)
    }

    newNoteClickTesting = (e) =>{
        console.log(e)
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
                        <BoardNoteTable key={boardIndex} nemkey={boardIndex} name={this.state.allNotes[boardIndex].title} notes={this.state.allNotes[boardIndex].notes} handleTitle={this.handleTitleChange} />         
                    )
                }
                </Row>
            </div>
        )
    }
}