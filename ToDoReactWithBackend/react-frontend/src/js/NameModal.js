import React from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import {useState} from "react";


export function NameModal({handleTitle, titleId}) {


  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => setShow(true);


  const [title, setTitle] = useState("");

  const collectData = () => {
    handleClose()
    handleTitle(title, titleId)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New name of the column</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="titleName">
              <Form.Control type="text" autoFocus onChange={e => setTitle(e.target.value)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={collectData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


  