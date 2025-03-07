import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  code: z.string().min(1, "Room code is required")
});

export default function JoinRoom() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      code: ""
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    localStorage.setItem("chat-username", values.username);
    setLocation(`/room/${values.code.toUpperCase()}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Code</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="Enter room code"
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                  className="text-center"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" size="lg">
          Join Room
        </Button>
      </form>
    </Form>
  );
}