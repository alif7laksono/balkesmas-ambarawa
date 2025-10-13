"use client";
import { motion } from "framer-motion";
import GrabCar from "./components/GrabCar";

export default function GrabAd() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-green-700 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <GrabCar />
      </div>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 bg-white text-green-600 px-6 py-3 rounded-full font-bold shadow-lg z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Download App
      </motion.button>
    </div>
  );
}
