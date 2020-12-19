import React, { createContext, useContext } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = createContext();

const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  const createContact = (id, name) => {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  };

  console.log("cc", contacts);

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
};

const useContactsContext = () => {
  return useContext(ContactsContext);
};

export { ContactsProvider, useContactsContext };
