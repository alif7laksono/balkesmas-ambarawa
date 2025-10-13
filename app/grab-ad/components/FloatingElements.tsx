import { motion } from "framer-motion";

export default function FloatingElements() {
  const floatingElements = [
    { emoji: "🚗", size: "w-16 h-16", delay: 0 },
    { emoji: "📱", size: "w-12 h-12", delay: 1 },
    { emoji: "⭐", size: "w-10 h-10", delay: 2 },
    { emoji: "🎯", size: "w-14 h-14", delay: 1.5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none">
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size} text-2xl flex items-center justify-center`}
          style={{
            left: `${20 + index * 20}%`,
            top: `${10 + index * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3 + index,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          {element.emoji}
        </motion.div>
      ))}
    </div>
  );
}
