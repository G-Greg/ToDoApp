import React from 'react';
import { Row } from 'react-bootstrap';
import {BoardNoteTable} from './BoardNoteTable';
import { PopupModal } from './PopupModal';


export class Board extends React.Component{


    render(){
        return(
            <div className="board">
                <h1>Project Board</h1>
                <hr/>
                <Row md={5}>
                    <BoardNoteTable name="TODO"/>
                    <BoardNoteTable name="In Progress"/>
                    <BoardNoteTable name="Done"/>
                    <BoardNoteTable name="Blocked"/>                    
                </Row>
            </div>
        )
    }
}