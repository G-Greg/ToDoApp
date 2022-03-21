import React from 'react';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export class TodoFragment extends React.Component{
    render(){
        return( 
            <Row>
            <Col md="2">        
            <div>
                <FontAwesomeIcon icon={faExclamationCircle} />
            </div>
            </Col>
            <Col md="10">
            <div className='todoTitle'>
                <h5>ToDo Title</h5>
            </div>

            <div className='description'>
                <p>This is the description</p>
            </div>

            <div className='deadline'>
                <p>2022.10.10</p>
            </div>
            

            <Row className="mx-0">
                <Button as={Col} variant="primary">Button #1</Button>
                <Button as={Col} variant="secondary" className="mx-2">Button #2</Button>
                <Button as={Col} variant="success">Button #3</Button>
            </Row>

            </Col>
        </Row>

        )
    }
}