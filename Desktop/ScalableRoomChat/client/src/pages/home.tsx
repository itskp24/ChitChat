import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateRoom from "@/components/create-room";
import JoinRoom from "@/components/join-room";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [background, setBackground] = useState(localStorage.getItem("app-background") || "");

  const handleBackgroundChange = (url: string) => {
    setBackground(url);
    localStorage.setItem("app-background", url);
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: background ? `url(${background})` : 'linear-gradient(to bottom right, hsl(280 85% 5%), hsl(280 85% 15%))',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-md mb-6 px-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Enter background image URL"
            value={background}
            onChange={(e) => handleBackgroundChange(e.target.value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleBackgroundChange("")}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="w-full max-w-md backdrop-blur-sm bg-black/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-br from-primary to-primary/80 bg-clip-text text-transparent">
            Real-Time Chat
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <CreateRoom />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <JoinRoom />
        </CardContent>
      </Card>
    </div>
  );
}