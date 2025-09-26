"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "../data/data";
import { containerVariants, itemVariants } from "../animations/animations";

export default function InformasiPublik() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <Badge
              variant="secondary"
              className="mb-4 bg-slate-200 text-slate-800"
            >
              Informasi Publik
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              Pelayanan Balkesmas Ambarawa
            </h1>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                whileHover="hover"
                className="group"
              >
                <motion.div className="h-full bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">
                      {post.title}
                    </h3>
                    <Button
                      variant="outline"
                      className="border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 group-hover:border-slate-400 transition-colors"
                      asChild
                    >
                      <a href={post.url}>
                        Baca Selengkapnya
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
