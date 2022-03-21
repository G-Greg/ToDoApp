import React from 'react';
import { Row } from 'react-bootstrap';
import {BoardTODO} from './BoardTODO.js';
import {BoardInProgress} from './BoardInProgress';
import {BoardDone} from './BoardDone';
import {BoardBlocked} from './BoardBlocked';

export class Board extends React.Component{
    render(){
        return(
            <div className="container">
                <h1>Project Board</h1>
                <Row md={4}>
                    <BoardTODO/>
                    <BoardInProgress/>
                    <BoardDone/>
                    <BoardBlocked/>
                </Row>
            </div>
        )
    }
}