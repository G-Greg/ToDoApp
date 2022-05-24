import React from "react";
import {Button, Modal, Form} from "react-bootstrap";
import {useState} from "react";
import { PropTypes } from "prop-types";


export function NameModal({handleTitle, handleClose, titleId}) {

  const Close = () => {
    handleClose("Name", false);
  };

  const [title, setTitle] = useState("");

  const collectData = () => {
    Close();
    handleTitle(title, titleId);
  };

  return (
    <>
      <Modal show={true} onHide={Close}>
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
          <Button variant="secondary" onClick={Close}>
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

NameModal.propTypes = {
  titleId: PropTypes.number,
  handleTitle: PropTypes.func,
  handleClose: PropTypes.func
};

  