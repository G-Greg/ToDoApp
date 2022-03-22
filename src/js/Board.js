import React from 'react';
import { Row } from 'react-bootstrap';
import {BoardNoteTable} from './BoardNoteTable';

export class Board extends React.Component{
    render(){
        return(
            <div className="container">
                <h1>Project Board</h1>
                <hr/>
                <Row md={4}>
                    <BoardNoteTable name="TODO"/>
                    <BoardNoteTable name="In Progress"/>
                    <BoardNoteTable name="Done"/>
                    <BoardNoteTable name="Blocked"/>
                </Row>
            </div>
        )
    }
}