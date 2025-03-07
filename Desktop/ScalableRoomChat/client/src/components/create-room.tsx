import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import type { Room } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
});

export default function CreateRoom() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: ""
    }
  });

  const createRoom = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/rooms");
      return res.json() as Promise<Room>;
    },
    onSuccess: (room) => {
      localStorage.setItem("chat-username", form.getValues("username"));
      setLocation(`/room/${room.code}`);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create room"
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => createRoom.mutate())} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your username" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button 
          type="submit"
          className="w-full"
          size="lg"
          disabled={createRoom.isPending}
        >
          {createRoom.isPending ? "Creating..." : "Create New Room"}
        </Button>
      </form>
    </Form>
  );
}