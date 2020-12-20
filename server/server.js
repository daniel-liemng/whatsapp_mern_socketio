const io = require("socket.io")(5000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  // id from client
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      // Remove the current recipient from the list of recipients
      const newRecipients = recipients.filter((r) => r !== recipient);

      // Add the sender to the list and remove the person receiving the message
      // Create a proper list
      newRecipients.push(id);

      // Send message to room
      // Here: room is recipient ID
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});
