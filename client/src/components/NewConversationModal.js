import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

import { useContactsContext } from "../contexts/ContactsContext";
import { useConversationsContext } from "../contexts/ConversationsContext";

const NewConversationModal = ({ closeModal }) => {
  const { contacts } = useContactsContext();
  const { createConversation } = useConversationsContext();

  const [selectedContactsIds, setSelectedContactsIds] = useState([]);

  const handleCheckboxChange = (contactId) => {
    setSelectedContactsIds((prevSelectedContactIds) => {
      if (selectedContactsIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => prevId !== contactId);
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createConversation(selectedContactsIds);
    closeModal();
  };

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type='checkbox'
                value={selectedContactsIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}

          <Button type='submit'>Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;
