import React from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import {useState} from "react";


export function NoteModal({handleNote, handleClose, columnIndex}) {

  const Close = () => {
    handleClose("Note", false)
  }

  const [priority, setPriority] = useState(0);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("")
  const [date, setDate] = useState()

  const collectData = () => {
    Close()
    handleNote(priority, title, desc, date.replaceAll('-','.'), columnIndex)
  }

  return (
    <>
      <Modal show={true} onHide={Close}>
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
              <Form.Select onChange={e => setPriority(e.target.selectedIndex)}>
                <option value="0">Critical</option>
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
              </Form.Select>
            </Form.Group>

            <Form.Label>Description</Form.Label>
            <Form.Group className="mb-3" controlId="desc">
              <Form.Control as="textarea" rows={3} onChange={e => setDesc(e.target.value)} placeholder="Description" required/>
            </Form.Group>


            <Form.Label>Date</Form.Label>
            <Form.Group className="mb-3" controlId="date">
              <Form.Control type="date" onChange={e => setDate(e.target.value)}/>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={Close}>
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


  