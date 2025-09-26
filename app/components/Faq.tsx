"use client";
import React, { useState } from "react";
import Image from "next/image";
import { faqs } from "../data/data";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  IconChevronDown,
  IconHelp,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import {
  containerVariants,
  itemVariants,
  titleVariants,
} from "../animations/animations";

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/banner/bg-1.jpg"
          alt="Background FAQ"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 " />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Title Section */}
          <motion.div className="text-center mb-12" variants={titleVariants}>
            <div className="inline-flex items-center justify-center p-3 rounded-full mb-4">
              <IconHelp className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
          </motion.div>

          {/* FAQ Content */}
          <motion.div
            className="max-w-4xl mx-auto"
            variants={containerVariants}
          >
            {/* FAQ Accordion */}
            <div className="space-y-4 mb-12">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    className="w-full flex justify-between items-center p-6 text-left"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h3 className="font-semibold text-lg md:text-xl">
                      {faq.question}
                    </h3>
                    <IconChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        activeIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ${
                      activeIndex === index ? "max-h-96 pb-6" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
