import React from "react";
import { Button, Row, Col, Card} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faExclamationCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { PropTypes } from "prop-types";


const Note = ({ id, priority, title, description, date, handleDelete, columnIndex, handleClick}) => {
    const getColor = () => {
        if (priority === 0){
            return "red";
        }
        else if (priority === 1){
            return "darkorange";
        }
        else if (priority === 2){
            return "dodgerblue";
        }
        else if (priority === 3){
            return "green";
        }
    };

    const prepareDelete = () => {
        handleDelete(id, columnIndex);
    };


    const click = () => {
        handleClick(id);
    };
    return(
        <Card style={{marginBottom: "3%"}} >
            <Card.Body onClick={click}>
                <Row>
                    <Col md="1">       
                    <div style={{color: getColor()}}>
                        <FontAwesomeIcon icon={faExclamationCircle}/>
                    </div>
                    </Col>
                    <Col md="11">
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>{description}</Card.Text>
                        <Card.Subtitle><FontAwesomeIcon icon={faCalendar} /> {date}</Card.Subtitle>

                    </Col>
                </Row>
            </Card.Body>
        <Card.Footer className="text-center">
            <Button as={Col} variant="danger" className="mx-2" onClick={prepareDelete}><FontAwesomeIcon icon={faTrash}/></Button>
        </Card.Footer>
        </Card>
    );
};

Note.propTypes = {
    id: PropTypes.number,
    priority: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    columnIndex: PropTypes.number,
    handleClick: PropTypes.func,
    handleDelete: PropTypes.func
};

export default Note;