import React from 'react';
import { Button, Row, Col, Card} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faExclamationCircle, faArrowLeft, faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';


const Note = ({id, priority, title, desc, date, handleDelete, columnIndex, handleUpdate, handleClick}) => {
    const getColor = () => {
        if (priority === 0){
            return "red"
        }
        else if (priority === 1){
            return "darkorange"
        }
        else if (priority === 2){
            return "dodgerblue" 
        }
        else if (priority === 3){
            return "green"
        }
    }

    const prepareDelete = () => {
        handleDelete(id, columnIndex)
    }

    const moveRight = () => {
        //handleMove(id, columnIndex, "toRight")
        prepareUpdate("toRight")
    }

    const moveLeft = () => {
        //handleMove(id, columnIndex, "toLeft")
        prepareUpdate("toLeft")
    }

    const prepareUpdate = (toMove) => {
        const index = toMove === "toRight" ? columnIndex + 1 : columnIndex - 1
        const updateNote = {
            id: id,
            columnindex: index,
            priority: priority,
            title: title,
            description: desc,
            date: date
        }
        handleUpdate(id, updateNote)
    }

    const click = () => {
        handleClick(id)
    }
    return(
        <Card style={{marginBottom: '3%'}} >
            <Card.Body onClick={click}>
                <Row>
                    <Col md="1">       
                    <div style={{color: getColor()}}>
                        <FontAwesomeIcon icon={faExclamationCircle}/>
                    </div>
                    </Col>
                    <Col md="11">
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>{desc}</Card.Text>
                        <Card.Subtitle><FontAwesomeIcon icon={faCalendar} /> {date}</Card.Subtitle>

                    </Col>
                </Row>
            </Card.Body>
        <Card.Footer className="text-center">
            {columnIndex > 0 ? <Button as={Col} variant="success" onClick={moveLeft}><FontAwesomeIcon icon={faArrowLeft}/></Button> : null}
            <Button as={Col} variant="danger" className="mx-2" onClick={prepareDelete}><FontAwesomeIcon icon={faTrash}/></Button>
            {columnIndex < 3 ? <Button as={Col} variant="success" onClick={moveRight}><FontAwesomeIcon icon={faArrowRight}/></Button> : null}
        </Card.Footer>
        </Card>
    )
}

export default Note;