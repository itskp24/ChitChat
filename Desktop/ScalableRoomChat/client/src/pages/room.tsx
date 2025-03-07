import { useRoute } from "wouter";
import { useWebSocket } from "@/lib/websocket";
import MessageList from "@/components/message-list";
import MessageInput from "@/components/message-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function Room() {
  const [, params] = useRoute("/room/:code");
  const { connected, messages, sendMessage, error } = useWebSocket(params?.code || null);
  const [background] = useState(localStorage.getItem("app-background") || "");

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4"
        style={{
          backgroundImage: background ? `url(${background})` : 'linear-gradient(to bottom right, hsl(280 85% 5%), hsl(280 85% 15%))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Alert variant="destructive" className="w-full max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        backgroundImage: background ? `url(${background})` : 'linear-gradient(to bottom right, hsl(280 85% 5%), hsl(280 85% 15%))',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Card className="w-full max-w-4xl h-[80vh] backdrop-blur-sm bg-black/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="bg-gradient-to-br from-primary to-primary/80 bg-clip-text text-transparent">
              Room: {params?.code}
            </span>
            <span className={`h-2 w-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-5rem)] flex flex-col gap-4">
          <MessageList messages={messages} />
          <MessageInput onSend={sendMessage} />
        </CardContent>
      </Card>
    </div>
  );
}