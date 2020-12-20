import React from "react";
import { ListGroup } from "react-bootstrap";

import { useConversationsContext } from "../contexts/ConversationsContext";

const Conversations = () => {
  const {
    conversations,
    setSelectedConversationIndex,
  } = useConversationsContext();

  console.log("122", conversations);

  return (
    <ListGroup variant='flush'>
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          key={index}
          action
          onClick={() => setSelectedConversationIndex(index)}
          active={conversation.selected}
        >
          {conversation.recipients
            .map((recipient) => recipient.name)
            .join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Conversations;
