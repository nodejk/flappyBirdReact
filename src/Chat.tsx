import express from "express";
import socketio from "socket.io";

const Chat = (props: any) => {
  const app = express();
  app.set("chat", process.env.PORT || 3000);

  var https = require("https").Server(app);

  app.get("/", (req: any, res: any) => {
    res.send("hello");
  });
  return <div></div>;
};

export default Chat;
