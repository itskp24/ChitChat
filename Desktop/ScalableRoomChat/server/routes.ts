import { Router } from "express";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import { z } from "zod";
import { createServer } from "http";

interface Client {
  ws: WebSocket;
  roomId: number;
}

const AUTO_DELETE_TIMEOUT = parseInt(process.env.AUTO_DELETE_TIMEOUT || "300000"); // 5 minutes default
const clients = new Map<number, Set<Client>>();
const roomTimeouts = new Map<number, NodeJS.Timeout>();

export function registerRoutes() {
  const router = Router();

  // Create HTTP server for WebSocket
  const wsServer = createServer();
  const wss = new WebSocketServer({ 
    server: wsServer, 
    path: process.env.WS_PATH || '/ws'
  });

  // Start WebSocket server on a different port
  const wsPort = parseInt(process.env.WS_PORT || "5001");
  wsServer.listen(wsPort, "0.0.0.0", () => {
    console.log(`WebSocket server is running on port ${wsPort}`);
  });

  router.post("/rooms", async (req, res) => {
    try {
      const room = await storage.createRoom();

      // Set auto-delete timeout
      roomTimeouts.set(room.id, setTimeout(async () => {
        await storage.deleteRoom(room.id);
        const roomClients = clients.get(room.id);
        if (roomClients) {
          roomClients.forEach(client => {
            if (client.ws.readyState === WebSocket.OPEN) {
              client.ws.send(JSON.stringify({ type: "room_deleted" }));
              client.ws.close();
            }
          });
          clients.delete(room.id);
        }
        roomTimeouts.delete(room.id);
      }, AUTO_DELETE_TIMEOUT));

      res.json(room);
    } catch (error) {
      res.status(500).json({ message: "Failed to create room" });
    }
  });

  router.get("/rooms/:code", async (req, res) => {
    try {
      const room = await storage.getRoom(req.params.code);
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
      const messages = await storage.getRoomMessages(room.id);
      res.json({ room, messages });
    } catch (error) {
      res.status(500).json({ message: "Failed to get room" });
    }
  });

  wss.on("connection", (ws) => {
    let currentClient: Client | null = null;

    ws.on("message", async (data) => {
      try {
        const message = JSON.parse(data.toString());

        switch (message.type) {
          case "join": {
            const room = await storage.getRoom(message.code);
            if (!room) {
              ws.send(JSON.stringify({ type: "error", message: "Room not found" }));
              return;
            }

            const roomClients = clients.get(room.id) || new Set();
            currentClient = { ws, roomId: room.id };
            roomClients.add(currentClient);
            clients.set(room.id, roomClients);

            const messages = await storage.getRoomMessages(room.id);
            ws.send(JSON.stringify({ type: "joined", room, messages }));
            break;
          }

          case "message": {
            if (!currentClient) {
              ws.send(JSON.stringify({ type: "error", message: "Not joined to any room" }));
              return;
            }

            try {
              const parsedMessage = insertMessageSchema.parse({
                roomId: currentClient.roomId,
                content: message.content,
                imageUrl: message.imageUrl,
                username: message.username
              });

              const newMessage = await storage.addMessage(parsedMessage);
              const roomClients = clients.get(currentClient.roomId);

              if (roomClients) {
                roomClients.forEach(client => {
                  if (client.ws.readyState === WebSocket.OPEN) {
                    client.ws.send(JSON.stringify({ type: "new_message", message: newMessage }));
                  }
                });
              }
            } catch (error) {
              if (error instanceof z.ZodError) {
                ws.send(JSON.stringify({ type: "error", message: "Please enter a message and try again" }));
              } else {
                ws.send(JSON.stringify({ type: "error", message: "Failed to send message" }));
              }
            }
            break;
          }
        }
      } catch (error) {
        ws.send(JSON.stringify({ type: "error", message: "Invalid message format" }));
      }
    });

    ws.on("close", () => {
      if (currentClient) {
        const roomClients = clients.get(currentClient.roomId);
        if (roomClients) {
          roomClients.delete(currentClient);
          if (roomClients.size === 0) {
            clients.delete(currentClient.roomId);
          }
        }
      }
    });
  });

  return router;
}