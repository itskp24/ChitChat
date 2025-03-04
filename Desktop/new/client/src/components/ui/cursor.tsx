import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if the target or any of its parents has the no-cursor-effect class
      const target = e.target as Element;
      const hasNoCursorEffect = target.closest('.no-cursor-effect') !== null;

      // Only show pointer effect if the element has pointer cursor AND is not in a no-cursor-effect zone
      setIsPointer(!hasNoCursorEffect && getComputedStyle(target).cursor === "pointer");
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: position.x - 12,
        y: position.y - 12,
        scale: isPointer ? 1.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      <div className="w-full h-full rounded-full bg-white" />
    </motion.div>
  );
}