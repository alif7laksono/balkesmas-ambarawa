"use client";
import { motion, Variants } from "framer-motion";
import AnimatedText from "./AnimatedText";
import FloatingElements from "./FloatingElements";

export default function GrabCar() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const featureVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1 + i * 0.2,
        duration: 0.6,
      },
    }),
  };

  const features = [
    { icon: "⚡", title: "Cepat", desc: "Driver terdekat" },
    { icon: "💰", title: "Terjangkau", desc: "Harga transparan" },
    { icon: "🛡️", title: "Aman", desc: "Perjalanan nyaman" },
  ];

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo */}
      <motion.div className="mb-8" variants={itemVariants}>
        <motion.div
          className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-green-600 font-bold text-2xl"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          GRAB
        </motion.div>
      </motion.div>

      {/* Main Text */}
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <AnimatedText
          text="Perjalanan Lebih Mudah"
          className="text-5xl md:text-7xl font-bold mb-4"
        />
        <AnimatedText
          text="Dengan GrabCar"
          className="text-4xl md:text-6xl font-bold text-yellow-400"
          delay={0.5}
        />
      </motion.div>

      {/* Features */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-full max-w-4xl"
        variants={itemVariants}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center"
            variants={featureVariants}
            custom={index}
            initial="hidden"
            animate="visible"
            whileHover={{
              scale: 1.05,
              y: -10,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl mb-2">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-white/80">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Car Animation */}
      <motion.div
        className="relative w-full max-w-2xl h-32"
        variants={itemVariants}
      >
        <motion.div
          className="absolute bottom-0 left-0 w-24 h-12 bg-green-800 rounded-lg flex items-center justify-center"
          animate={{
            x: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-6 h-6 bg-yellow-400 rounded-full mr-2"></div>
          <div className="text-white font-bold">GRAB</div>
        </motion.div>

        {/* Road */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-white/30">
          <motion.div
            className="h-full bg-yellow-400 w-8"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </motion.div>

      {/* Floating Elements */}
      <FloatingElements />
    </motion.div>
  );
}
