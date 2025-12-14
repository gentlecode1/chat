import type { ServerWebSocket } from "bun";

const usernames = new WeakMap<ServerWebSocket, string>();

const server = Bun.serve({
  port: process.env.PORT || 3000,
  fetch(req, server) {
    const url = new URL(req.url);

    if (url.pathname === "/ws") {
      const success = server.upgrade(req);
      if (success) {
        return undefined;
      }
    }

    if (url.pathname === "/chat") {
      return new Response(Bun.file("test.html"));
    }

    return new Response("Chat server - Visit /chat to access the chat");
  },
  websocket: {
    message(ws, message) {
      const data = JSON.parse(message.toString());

      if (data.type === "join") {
        usernames.set(ws, data.user);

        server.publish("chat", JSON.stringify({
          type: "user_joined",
          message: `${data.user} has joined the chat`,
          timestamp: new Date().toISOString()
        }));
      } else if (data.type === "username_change") {
        usernames.set(ws, data.newName);
        
        server.publish("chat", JSON.stringify({
          type: "username_change",
          message: `${data.oldName} is now known as ${data.newName}`,
          timestamp: new Date().toISOString()
        }));
      } else {
        server.publish("chat", JSON.stringify({
          type: "message",
          user: data.user || "Anonymous",
          message: data.message,
          timestamp: new Date().toISOString()
        }));
      }
    },
    open(ws) {
      ws.subscribe("chat");
    },
    close(ws) {
      const username = usernames.get(ws);
      if (username) {
        server.publish("chat", JSON.stringify({
          type: "user_left",
          message: `${username} has left the chat`,
          timestamp: new Date().toISOString()
        }));
        usernames.delete(ws);
      }
    },
  },
});

console.log(`🚀 Servidor de chat ejecutándose en http://localhost:${server.port}`);