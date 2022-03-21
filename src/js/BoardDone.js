import React from 'react';
import {TodoFragment} from './Fragment';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';

export class BoardDone extends React.Component{
    render(){
        return(
            <div className="container">
                <Row>
                <Col md="9">
                    <h3>Done</h3>
                </Col>                    
                <Col md="1">
                    <FontAwesomeIcon icon={faPen} />
                </Col>                    
                <Col md="2">
                    <FontAwesomeIcon icon={faPlus} />
                </Col>
                    
                    
                    
                </Row>
                <hr/>
                <TodoFragment/>
            </div>
        )
    }
}