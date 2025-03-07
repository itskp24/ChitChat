import { useState, useEffect, useCallback } from "react";
import type { Room, Message } from "@shared/schema";

const WS_URL = import.meta.env.VITE_WS_URL;

interface WebSocketHook {
  connected: boolean;
  messages: Message[];
  sendMessage: (content: string, imageUrl?: string) => void;
  error: string | null;
}

export function useWebSocket(roomCode: string | null): WebSocketHook {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomCode) return;

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "join", code: roomCode }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "joined":
          setConnected(true);
          setMessages(data.messages);
          break;

        case "new_message":
          setMessages(prev => [...prev, data.message]);
          break;

        case "room_deleted":
          setError("This room has been deleted");
          ws.close();
          break;

        case "error":
          setError(data.message);
          break;
      }
    };

    ws.onclose = () => {
      setConnected(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [roomCode]);

  const sendMessage = useCallback((content: string, imageUrl?: string) => {
    if (socket?.readyState === WebSocket.OPEN) {
      const username = localStorage.getItem("chat-username");
      if (!username) return;

      socket.send(JSON.stringify({
        type: "message",
        content,
        imageUrl,
        username
      }));
    }
  }, [socket]);

  return { connected, messages, sendMessage, error };
}