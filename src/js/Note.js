import React from 'react';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const Note = ({priority, title, desc, date}) => {
        return(
        <Card style={{marginBottom: '3%'}}>
            <Card.Body>
                <Row>
                    <Col md="1">        
                    <div>
                        <FontAwesomeIcon icon={faExclamationCircle} />
                    </div>
                    </Col>
                    <Col md="11">
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>{desc}</Card.Text>
                        <Card.Subtitle>{date}</Card.Subtitle>
                    <Row className="mx-0">
                        <Button as={Col} variant="primary">Button #1</Button>
                        <Button as={Col} variant="secondary" className="mx-2">Button #2</Button>
                        <Button as={Col} variant="success">Button #3</Button>
                    </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default Note;