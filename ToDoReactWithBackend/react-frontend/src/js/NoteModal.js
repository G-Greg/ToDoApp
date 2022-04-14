import React from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import {useState} from "react";


export function NoteModal({handleNote, columnIndex}) {

  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => setShow(true);


  const [priority, setPriority] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("")
  const [date, setDate] = useState("")

  const collectData = () => {
    handleClose()
    handleNote(priority, title, desc, date, columnIndex)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Title</Form.Label>
            <Form.Group className="mb-3" controlId="titleName">
              <Form.Control type="text" autoFocus onChange={e => setTitle(e.target.value)} placeholder="Title"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="prio">
              <Form.Label>Priority</Form.Label>
              <Form.Select aria-label="Default select example">
                <option value="0">Three</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>

            <Form.Label>Description</Form.Label>
            <Form.Group className="mb-3" controlId="desc">
              <Form.Control as="textarea" rows={3} onChange={e => setDesc(e.target.value)} placeholder="Description"/>
            </Form.Group>


            <Form.Label>Date</Form.Label>
            <Form.Group className="mb-3" controlId="desc">
              <Form.Control type="date" onChange={e => setDate(e.target.value)}/>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={collectData}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


  