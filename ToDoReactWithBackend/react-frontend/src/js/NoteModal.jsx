import React from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import {useState, useEffect} from "react";


export function NoteModal({handleNote, handleClose, columnIndex, loadData, handleUpdate}) {

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }    
    setValidated(true);
    event.currentTarget.checkValidity() ? collectData(event) : console.log("Not submited")
  };
  
  const Close = () => {
    handleClose("Note", false)
  }

  const [priority, setPriority] = useState(0);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("")
  const [date, setDate] = useState()

  const collectData = (event) => {
      Close()

      if (loadData === null) {
        const newNote = {
            columnindex: columnIndex,
            priority: priority,
            title: title,
            description: desc,
            date: date.replaceAll('-', '.')
        }
        handleNote(newNote)
    }
    else {
      const updateNote = {
          columnindex: columnIndex,
          priority: event.target.elements[1].value,
          title: event.target.elements[0].value,
          description: event.target.elements[2].value,
          date: event.target.elements[3].value.replaceAll('-', '.')
      }
      handleUpdate(loadData.id, updateNote)
    }
  }

  useEffect(() => {
      if (loadData) {
        setPriority(loadData.priority)
        setTitle(loadData.title)
        setDesc(loadData.description)
        setDate(loadData.date)
      }
  });

  return (
    <>
      <Modal show={true} onHide={Close}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Label>Title</Form.Label>
            <Form.Group className="mb-3" controlId="titleName">
              <Form.Control type="text" autoFocus onChange={e => setTitle(e.target.value)} placeholder="Title" defaultValue={loadData ? loadData.title : ""} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="prio">
              <Form.Label>Priority</Form.Label>
                <Form.Select onChange={e => setPriority(e.target.selectedIndex)} defaultValue={loadData ? loadData.priority : 0}>
                <option value="0">Critical</option>
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
              </Form.Select>
            </Form.Group>

            <Form.Label>Description</Form.Label>
            <Form.Group className="mb-3" controlId="desc">
              <Form.Control as="textarea" rows={3} onChange={e => setDesc(e.target.value)} placeholder="Description" defaultValue={loadData ? loadData.description : ""} required/>
            </Form.Group>


            <Form.Label>Date</Form.Label>
            <Form.Group className="mb-3" controlId="date">
              <Form.Control type="date" onChange={e => setDate(e.target.value)} defaultValue={loadData ? loadData.date.replaceAll('.', '-') : ""} required/>
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={Close}>Close</Button>
              <Button type="submit" variant="primary">Add Note</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}


  