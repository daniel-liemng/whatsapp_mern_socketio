import React, { createContext, useContext, useState } from "react";

import useLocalStorage from "../hooks/useLocalStorage";
import { useContactsContext } from "./ContactsContext";

const ConversationsContext = createContext();

// Seperate function, outside of component
const arrayEquality = (a, b) => {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  // every element in a = every element in b
  return a.every((element, index) => {
    return element === b[index];
  });
};

const ConversationsProvider = ({ id, children }) => {
  const { contacts } = useContactsContext();

  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );

  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  const createConversation = (recipients) => {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  };

  // Format conversation - show name of recipients instead of id
  const formattedConversations = conversations.map((conversation, index) => {
    // Get names of recipients based on contactId
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      // Get name, if not -> show id
      const name = (contact && contact.name) || recipient;

      return { id: recipient, name };
    });

    // format message -> show name of sender
    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      // Get name, if not -> show id
      const name = (contact && contact.name) || message.sender;

      const fromMe = id === message.sender;

      return { ...message, senderName: name, fromMe };
    });

    // Check if conversation is selected
    const selected = index === selectedConversationIndex;

    return { ...conversations, recipients, messages, selected };
  });

  const addMessageToConversation = ({ recipients, text, sender }) => {
    // Check if there is any conversation with the recipients, if not, add new conversation
    setConversations((prevConversations) => {
      let madeChange = false;
      const newMessage = { sender, text };

      // Create new conversation
      // Check if recipients in params match the recipients from previous conversations
      const newConversations = prevConversations.map((conversation) => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }

        return conversation;
      });

      if (madeChange) {
        return newConversations;
      } else {
        return [...prevConversations, { recipients, messages: [newMessage] }];
      }
    });
  };

  // Take recipient's ID and text
  const sendMessage = (recipients, text) => {
    addMessageToConversation({ recipients, text, sender: id });
  };

  return (
    <ConversationsContext.Provider
      value={{
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        setSelectedConversationIndex,
        createConversation,
        sendMessage,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};

const useConversationsContext = () => {
  return useContext(ConversationsContext);
};

export { ConversationsProvider, useConversationsContext };
