import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message } from "@shared/schema";
import { motion } from "framer-motion";

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const username = localStorage.getItem("chat-username");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className="flex-1 rounded-md">
      <div className="space-y-4 p-4">
        {messages.map((message) => {
          const isOwnMessage = message.username === username;

          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`rounded-lg p-4 max-w-[80%] ${
                  isOwnMessage 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}
              >
                {!isOwnMessage && (
                  <p className="text-xs font-medium mb-1">{message.username}</p>
                )}
                {message.imageUrl && (
                  <img
                    src={message.imageUrl}
                    alt="Shared image"
                    className="mb-2 rounded-md max-h-60 object-contain"
                  />
                )}
                <p className="text-sm break-words">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}