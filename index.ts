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
    
    return new Response("Chat server - Visita / para acceder al chat");
  },
  websocket: {
    message(ws, message) {
      const data = JSON.parse(message.toString());
      
      server.publish("chat", JSON.stringify({
        type: "message",
        user: data.user || "Anónimo",
        message: data.message,
        timestamp: new Date().toISOString()
      }));
    },
    open(ws) {
      ws.subscribe("chat");
      
      server.publish("chat", JSON.stringify({
        type: "user_joined",
        message: "Un usuario se ha conectado",
        timestamp: new Date().toISOString()
      }));
    },
    close(ws) {
      server.publish("chat", JSON.stringify({
        type: "user_left", 
        message: "Un usuario se ha desconectado",
        timestamp: new Date().toISOString()
      }));
    },
  },
});

console.log(`🚀 Servidor de chat ejecutándose en http://localhost:${server.port}`);