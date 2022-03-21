import React from 'react';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

export class TodoFragment extends React.Component{
    render(){
        return( 
        <div>
            <div>
                <p>!</p>
            </div>

            <div className='todoTitle'>
                <h1>ToDo Title</h1>
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
        </div>
        )
    }
}