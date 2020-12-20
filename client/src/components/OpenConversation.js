import React, { useState, useCallback } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

import { useConversationsContext } from "../contexts/ConversationsContext";

const OpenConversation = () => {
  const { sendMessage, selectedConversation } = useConversationsContext();

  const [text, setText] = useState("");

  // auto-scroll to the lastMessage when adding a new message
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  // Pass recipient's ID and text
  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );

    setText("");
  };

  return (
    <div className='d-flex flex-column flex-grow-1'>
      <div className='flex-grow-1 overflow-auto'>
        <div className='d-flex flex-column align-items-end justify-content-end px-3'>
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className='my-1 d-flex flex-column'
              >
                <div
                  className={`${
                    message.fromMe ? "bg-primary text-white" : "border"
                  } rounded px-2 py-1`}
                >
                  {message.text}
                </div>
                <div
                  className={`${
                    message.fromMe ? "text-right" : ""
                  } 'text-muted small`}
                >
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='m-2'>
          <InputGroup>
            <Form.Control
              as='textarea'
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              style={{ height: "75px", resize: "none" }}
            />
            <InputGroup.Append>
              <Button type='submit'>Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
};

export default OpenConversation;
