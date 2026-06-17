"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { footerLinks, APP_NAME, APP_TAGLINE } from "@/lib/data";
import { Activity, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, ArrowUp } from 'lucide-react';
import { fadeInUp, staggerContainer } from "@/lib/motion";

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const footerSections = [
  { title: "Product", links: footerLinks.product },
  { title: "Company", links: footerLinks.company },
  { title: "Support", links: footerLinks.support },
  { title: "Legal", links: footerLinks.legal },
];

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[#2A2A45] bg-[#0A0A14] overflow-hidden">
      {/* Subtle gradient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-48 bg-indigo-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-48 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8"
        >
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Link href="/dashboard" className="flex items-center gap-2.5 group mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sm text-[#64748B] leading-relaxed max-w-xs mb-6">
              {APP_TAGLINE}
            </p>
            <p className="text-xs text-[#475569] mb-4">
              Trusted by 2,400+ SaaS teams worldwide to track what matters most.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -2 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-[#2A2A45] flex items-center justify-center text-[#64748B] hover:text-white hover:bg-indigo-500/15 hover:border-indigo-500/30 transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={fadeInUp}>
              <h3 className="text-xs font-semibold text-[#E2E8F0] uppercase tracking-widest mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#64748B] hover:text-indigo-300 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-5 border-t border-[#2A2A45] flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <div className="flex items-center gap-4">
            <p className="text-xs text-[#475569]">
              © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </p>
            <span className="hidden sm:inline text-[#2A2A45]">|</span>
            <span className="hidden sm:inline text-xs text-[#475569]">
              v2.4.1 — Status:{" "}
              <span className="text-emerald-400 font-medium">All systems operational</span>
            </span>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-indigo-300 transition-colors group"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}