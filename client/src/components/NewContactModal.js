import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { useContactsContext } from "../contexts/ContactsContext";

const NewContactModal = ({ closeModal }) => {
  const { createContact } = useContactsContext();

  const idRef = useRef();
  const nameRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    createContact(idRef.current.value, nameRef.current.value);
    closeModal();
  };

  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>ID</Form.Label>
            <Form.Control type='text' ref={idRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' ref={nameRef} required />
          </Form.Group>

          <Button type='submit'>Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewContactModal;
