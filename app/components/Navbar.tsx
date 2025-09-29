"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "../data/data";
import { Button } from "@/components/ui/button";
import { IconChevronRight, IconPhone, IconFileText } from "@tabler/icons-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [activeNestedSubmenu, setActiveNestedSubmenu] = useState<string | null>(
    null
  );

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setActiveSubmenu(null);
    setActiveNestedSubmenu(null);
  };

  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
    setActiveNestedSubmenu(null);
  };

  const toggleNestedSubmenu = (name: string) => {
    setActiveNestedSubmenu(activeNestedSubmenu === name ? null : name);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        when: "beforeChildren",
      },
    },
  };

  const dropdownItemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.15,
      },
    },
  };

  const renderNavLinks = (links: typeof navLinks, isMobile = false) => {
    return links.map((link) => (
      <motion.li
        key={link.name}
        variants={itemVariants}
        className="relative group"
        onMouseEnter={!isMobile ? () => setActiveSubmenu(link.name) : undefined}
        onMouseLeave={!isMobile ? () => setActiveSubmenu(null) : undefined}
      >
        <div className="flex items-center">
          <Link
            href={link.href}
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-100 transition-colors",
              "text-slate-700 hover:text-slate-900",
              "flex items-center gap-1"
            )}
          >
            {link.name}
            {/* Only show ChevronDown on desktop if there are subLinks */}
            {!isMobile && link.subLinks && link.subLinks.length > 0 && (
              <ChevronDown className="w-4 h-4" />
            )}
          </Link>

          {/* Mobile toggle button - only show ChevronRight */}
          {isMobile && link.subLinks && link.subLinks.length > 0 && (
            <button
              onClick={() => toggleSubmenu(link.name)}
              className="p-2 ml-auto"
              aria-label={`Toggle ${link.name} submenu`}
            >
              <ChevronRight
                className={`w-4 h-4 transition-transform ${
                  activeSubmenu === link.name ? "rotate-90" : ""
                }`}
              />
            </button>
          )}
        </div>

        {link.subLinks && link.subLinks.length > 0 && (
          <AnimatePresence>
            {activeSubmenu === link.name && (
              <motion.ul
                variants={dropdownVariants}
                initial="hidden"
                animate={
                  isMobile
                    ? activeSubmenu === link.name
                      ? "visible"
                      : "hidden"
                    : "visible"
                }
                exit="hidden"
                className={cn(
                  isMobile
                    ? "pl-6 space-y-1"
                    : "absolute left-0 mt-0 w-56 origin-top-left rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50"
                )}
              >
                {link.subLinks.map((subLink) => (
                  <motion.li
                    key={subLink.name}
                    variants={dropdownItemVariants}
                    className="relative"
                    onMouseEnter={
                      !isMobile
                        ? () => setActiveNestedSubmenu(subLink.name)
                        : undefined
                    }
                    onMouseLeave={
                      !isMobile ? () => setActiveNestedSubmenu(null) : undefined
                    }
                  >
                    <div className="flex items-center">
                      <Link
                        href={subLink.href}
                        className={cn(
                          "block px-4 py-2 text-sm hover:bg-slate-50 w-full text-left",
                          isMobile ? "text-slate-600" : "text-slate-700"
                        )}
                      >
                        {subLink.name}
                      </Link>
                      {isMobile &&
                        subLink.subLinks &&
                        subLink.subLinks.length > 0 && (
                          <button
                            onClick={() => toggleNestedSubmenu(subLink.name)}
                            className="p-2"
                            aria-label={`Toggle ${subLink.name} submenu`}
                          >
                            <ChevronRight
                              className={`w-4 h-4 transition-transform ${
                                activeNestedSubmenu === subLink.name
                                  ? "rotate-90"
                                  : ""
                              }`}
                            />
                          </button>
                        )}
                    </div>

                    {/* Third level dropdown */}
                    {subLink.subLinks && subLink.subLinks.length > 0 && (
                      <div className="relative group">
                        <div
                          className={cn(
                            "flex items-center justify-between w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50",
                            isMobile ? "" : "pr-6"
                          )}
                          onMouseEnter={() =>
                            setActiveNestedSubmenu(subLink.name)
                          }
                          onMouseLeave={() => setActiveNestedSubmenu(null)}
                          onClick={() =>
                            setActiveNestedSubmenu((prev) =>
                              prev === subLink.name ? null : subLink.name
                            )
                          }
                        >
                          <span>{subLink.name}</span>
                          {subLink.subLinks && subLink.subLinks.length > 0 && (
                            <IconChevronRight className="w-4 h-4 text-gray-400 ml-2" />
                          )}
                        </div>

                        <AnimatePresence>
                          {activeNestedSubmenu === subLink.name && (
                            <motion.ul
                              variants={dropdownVariants}
                              initial="hidden"
                              animate={
                                isMobile
                                  ? activeNestedSubmenu === subLink.name
                                    ? "visible"
                                    : "hidden"
                                  : "visible"
                              }
                              exit="hidden"
                              className={cn(
                                isMobile
                                  ? "pl-4"
                                  : "absolute left-full top-0 mt-0 w-56 origin-top-left rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50"
                              )}
                            >
                              {subLink.subLinks.map((thirdLevelLink) => (
                                <motion.li
                                  key={thirdLevelLink.name}
                                  variants={dropdownItemVariants}
                                >
                                  <Link
                                    href={thirdLevelLink.href}
                                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                  >
                                    {thirdLevelLink.name}
                                  </Link>
                                </motion.li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        )}
      </motion.li>
    ));
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16 lg:h-24">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/xlogo_black.png"
                width={125}
                height={125}
                alt="Logo Balkesmas Wilayah Ambarawa"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <motion.ul
              className="flex space-x-2"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {renderNavLinks(navLinks)}
            </motion.ul>
          </div>

          {/* Kontak Info - Desktop & Tablet */}
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            {/* Hubungi Kami */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 hover:bg-red-50 cursor-pointer"
            >
              <IconFileText size={24} className="text-red-500 flex-shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-slate-700">
                  Hubungi Kami
                </span>
                <a
                  href="https://simaswilyam.dinkesjatengprov.go.id/daftar/#/home"
                  className="text-black font-bold hover:text-red-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pendaftaran
                </a>
              </div>
            </motion.div>

            {/* Whatsapp */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 hover:bg-blue-50 cursor-pointer"
            >
              <IconPhone size={24} className="flex-shrink-0 text-green-600" />
              <div className="flex flex-col">
                <span className="font-semibold text-slate-700">Whatsapp</span>
                <a
                  href="https://wa.me/628112891084"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-green-600 hover:text-green-800 transition-colors"
                >
                  081-1289-1084
                </a>
              </div>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden pr-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <motion.ul
                className="px-2 pt-2 pb-4 space-y-1 bg-white"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {renderNavLinks(navLinks, true)}
              </motion.ul>
            </motion.div>

            <div
              key="contacts"
              className="px-4 py-4 flex flex-col gap-4 border-t border-slate-200"
            >
              {/* Hubungi Kami */}
              <div className="flex items-start gap-3 group cursor-pointer hover:bg-red-50 p-2 rounded transition-colors">
                <IconFileText size={20} className="text-red-500 mt-1" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-700">
                    Hubungi Kami
                  </span>
                  <a
                    href="https://simaswilyam.dinkesjatengprov.go.id/daftar/#/home"
                    className="text-black font-bold hover:text-red-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pendaftaran
                  </a>
                </div>
              </div>

              {/* Whatsapp */}
              <div className="flex items-start gap-3 group cursor-pointer hover:bg-blue-50 p-2 rounded transition-colors">
                <IconPhone size={20} className="mt-1 text-green-600" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-700">
                    Whatsapp
                  </span>
                  <a
                    href="https://wa.me/628112891084"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-green-600 hover:text-green-800 transition-colors"
                  >
                    081-1289-1084
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
