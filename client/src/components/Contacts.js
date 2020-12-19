import React from "react";
import { ListGroup } from "react-bootstrap";

import { useContactsContext } from "../contexts/ContactsContext";

const Contacts = () => {
  const { contacts } = useContactsContext();

  return (
    <ListGroup variant='flush'>
      {contacts.map((contact) => (
        <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Contacts;
