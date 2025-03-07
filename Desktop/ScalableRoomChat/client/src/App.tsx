import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import Room from "@/pages/room";
import NotFound from "@/pages/not-found";
import PrivacyOverlay from "@/components/privacy-overlay";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/room/:code" component={Room} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <PrivacyOverlay />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
