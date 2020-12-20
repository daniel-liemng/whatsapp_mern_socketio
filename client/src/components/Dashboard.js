import React from "react";

import { useConversationsContext } from "../contexts/ConversationsContext";
import Sidebar from "./Sidebar";
import OpenConversation from "./OpenConversation";

const Dashboard = ({ id }) => {
  const { selectedConversation } = useConversationsContext();

  return (
    <div className='d-flex' style={{ height: "100vh" }}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  );
};

export default Dashboard;
