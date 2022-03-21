import React from 'react';
import {TodoFragment} from './Fragment';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

export class BoardInProgress extends React.Component{
    render(){
        return(
            <div className="container">
                <Row md={3}>
                    <h3>In Progress</h3>
                    <Button variant="primary">Add</Button>
                    <FontAwesomeIcon icon="fas fa-trash-alt" />
                </Row>
                <TodoFragment/>
            </div>
        )
    }
}