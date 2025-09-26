"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IconHeartbeat, IconUsers, IconArrowRight } from "@tabler/icons-react";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";

import {
  containerVariants,
  itemVariants,
  imageVariants,
} from "../animations/animations";
import { Badge } from "@/components/ui/badge";

export default function TentangKami() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Left side - Image */}
          <motion.div
            className="w-full lg:w-1/2 relative aspect-video lg:aspect-square rounded-xl overflow-hidden shadow-xl"
            variants={imageVariants}
          >
            <Image
              src="/images/profil/gedung4.jpg"
              alt="Gedung Balkesmas Wilayah Ambarawa"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            className="w-full lg:w-1/2 space-y-6"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Badge>Tentang Kami</Badge>
            </motion.div>

            <motion.h3
              className="text-xl md:text-2xl font-semibold text-gray-800"
              variants={itemVariants}
            >
              Meningkatkan Kesehatan Masyarakat Secara Menyeluruh
            </motion.h3>

            <motion.p
              className="text-gray-600 leading-relaxed"
              variants={itemVariants}
            >
              Balkesmas Wilayah Ambarawa memiliki tujuan untuk meningkatkan
              status kesehatan melalui upaya kesehatan perorangan dan masyarakat
              secara menyeluruh dan proaktif.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4"
              variants={itemVariants}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <IconHeartbeat size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Pelayanan Kesehatan Perorangan Sekunder
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Layanan komprehensif untuk kebutuhan kesehatan individu
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <IconUsers size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Pelayanan Kesehatan Masyarakat Sekunder
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Program kesehatan yang berfokus pada masyarakat luas
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button size={isMobile ? "default" : "lg"}>
                Selengkapnya
                <IconArrowRight className="ml-2" size={18} />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
