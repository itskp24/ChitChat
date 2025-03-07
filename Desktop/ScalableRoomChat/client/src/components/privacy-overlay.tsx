import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PrivacyOverlay() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey) {
        if (e.key === "h") {
          e.preventDefault();
          setIsVisible(true);
        } else if (e.key === "s") {
          e.preventDefault();
          setIsVisible(false);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black z-50"
        />
      )}
    </AnimatePresence>
  );
}
