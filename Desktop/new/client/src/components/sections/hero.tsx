import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import { useState, useEffect } from "react";

export function Hero() {
  const [visitorName, setVisitorName] = useState<string | null>(null);

  useEffect(() => {
    // Get the visitor's name from localStorage
    const storedName = localStorage.getItem("visitorName");
    setVisitorName(storedName);

    // Listen for storage changes (in case name is updated)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "visitorName") {
        setVisitorName(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          {visitorName && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-muted-foreground"
            >
              Welcome, {visitorName}! 👋
            </motion.p>
          )}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            KHANDLA PARTH
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Experienced Frontend Developer with 3+ years of expertise in building modern, 
            dynamic web applications
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button size="lg" className="gap-2">
              <FiDownload className="w-5 h-5" />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}