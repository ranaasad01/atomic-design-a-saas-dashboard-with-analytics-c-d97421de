"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { navLinks, APP_NAME } from "@/lib/data";
import { Bell, Settings, Menu, X, Activity, ChevronDown, Search, User } from 'lucide-react';

const notifications = [
  { id: 1, text: "Revenue milestone: $50K MRR reached", time: "2m ago", unread: true },
  { id: 2, text: "New user signup spike detected", time: "18m ago", unread: true },
  { id: 3, text: "Churn rate dropped below 2%", time: "1h ago", unread: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setNotifOpen(false);
  }, [pathname]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#0F0F1A]/95 backdrop-blur-xl border-b border-[#2A2A45] shadow-lg shadow-black/20"
          : "bg-[#0F0F1A]/80 backdrop-blur-md border-b border-[#2A2A45]/50"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.08, rotate: 5 }}
              transition={{ duration: 0.2 }}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-indigo-500/30"
            >
              <Activity className="w-4 h-4 text-white" />
            </motion.div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
              Pulse 
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link key={link.href} href={link.href}>
                  <motion.span
                    whileHover={shouldReduceMotion ? {} : { y: -1 }}
                    className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? "text-white bg-indigo-500/15 shadow-sm"
                        : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-indigo-500/10 border border-indigo-500/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    )}
                  </motion.span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-[#2A2A45] text-[#64748B] hover:text-white hover:bg-white/8 transition-all text-sm"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-xs">Search…</span>
              <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-[#64748B] font-mono">⌘K</kbd>
            </motion.button>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                onClick={() => setNotifOpen((v) => !v)}
                className="relative w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 border border-[#2A2A45] text-[#94A3B8] hover:text-white hover:bg-white/8 transition-all"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-indigo-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </motion.button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute right-0 top-11 w-80 rounded-xl bg-[#16162A] border border-[#2A2A45] shadow-2xl shadow-black/40 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-[#2A2A45] flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">Notifications</span>
                      <span className="text-xs text-indigo-400 cursor-pointer hover:text-indigo-300">Mark all read</span>
                    </div>
                    <div className="divide-y divide-[#2A2A45]">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`px-4 py-3 hover:bg-white/3 transition-colors cursor-pointer ${n.unread ? "bg-indigo-500/5" : ""}`}
                        >
                          <div className="flex items-start gap-2.5">
                            {n.unread && (
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                            )}
                            <div className={n.unread ? "" : "pl-4"}>
                              <p className="text-xs text-[#E2E8F0] leading-relaxed">{n.text}</p>
                              <p className="text-[10px] text-[#64748B] mt-0.5">{n.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2.5 border-t border-[#2A2A45]">
                      <span className="text-xs text-[#64748B] hover:text-indigo-400 cursor-pointer transition-colors">
                        View all notifications →
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Avatar */}
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-white/5 border border-[#2A2A45] cursor-pointer hover:bg-white/8 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs font-medium text-[#E2E8F0]">Alex Chen</span>
              <ChevronDown className="w-3 h-3 text-[#64748B]" />
            </motion.div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 border border-[#2A2A45] text-[#94A3B8] hover:text-white transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-[#2A2A45] bg-[#0F0F1A]/98 backdrop-blur-xl"
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <motion.div
                    key={link.href}
                    initial={shouldReduceMotion ? {} : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "text-white bg-indigo-500/15 border border-indigo-500/20"
                          : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="mt-2 pt-2 border-t border-[#2A2A45] flex items-center gap-3 px-3 py-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white">Alex Chen</p>
                  <p className="text-[10px] text-[#64748B]">alex@pulseanalytics.io</p>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}