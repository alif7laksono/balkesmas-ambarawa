"use client";
import { testimonials } from "../data/data";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IconQuote, IconStarFilled } from "@tabler/icons-react";
import {
  containerVariants,
  itemVariants,
  titleVariants,
} from "../animations/animations";

export default function Testimoni() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Title Section */}
          <motion.div className="text-center mb-12" variants={titleVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Apa kata mereka tentang Balkesmas Ambarawa?
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>

          {/* Testimonials Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="w-full"
              >
                <Card className="h-full bg-white shadow-md hover:shadow-lg transition-shadow p-3 sm:p-4 md:p-6 rounded-2xl">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <IconQuote className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <IconStarFilled
                            key={i}
                            className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
                              i < testimonial.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 italic mb-3 text-sm sm:text-base">
                      &apos;{testimonial.content}&apos;
                    </p>
                    <div className="border-t pt-3 sm:pt-4">
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {testimonial.author}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs sm:text-sm text-gray-500">
                          {testimonial.date}
                        </span>
                        {testimonial.source && (
                          <span className="text-[10px] sm:text-xs bg-blue-100 px-2 py-1 rounded">
                            {testimonial.source}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
