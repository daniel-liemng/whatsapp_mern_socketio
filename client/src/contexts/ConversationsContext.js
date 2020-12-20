import React, { createContext, useContext, useState } from "react";

import useLocalStorage from "../hooks/useLocalStorage";
import { useContactsContext } from "./ContactsContext";

const ConversationsContext = createContext();

const ConversationsProvider = ({ children }) => {
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

    // Check if conversation is selected
    const selected = index === selectedConversationIndex;

    return { ...conversations, recipients, selected };
  });

  // const selectedConversationIndex = (index) => {
  //   console.log("i1", index);
  // };

  console.log("conver", conversations);

  return (
    <ConversationsContext.Provider
      value={{
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        setSelectedConversationIndex,
        createConversation,
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
