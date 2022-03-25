import React from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import {useState} from "react";


export function NameModal() {

  const [title, setTitle] = useState("");
  const [show, setShow] = useState(true);

  const handleClose = () => {
    console.log(title)
    setShow(false);
  }
  const handleShow = () => setShow(true);

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
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


  