"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { ArrowRight, TrendingUp, TrendingDown, Users, DollarSign, Activity, BarChart2, Shield, Zap, Globe, Star, CheckCircle, ChevronRight, Sparkles, ArrowUp } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { APP_NAME, APP_TAGLINE, BRAND_COLORS } from "@/lib/data";

// ─── Inline mock data ────────────────────────────────────────────────────────

const revenueData = [
  { month: "Jan", revenue: 38000, mrr: 31000, users: 1200 },
  { month: "Feb", revenue: 42000, mrr: 34000, users: 1380 },
  { month: "Mar", revenue: 47000, mrr: 38000, users: 1520 },
  { month: "Apr", revenue: 44000, mrr: 36000, users: 1610 },
  { month: "May", revenue: 53000, mrr: 43000, users: 1790 },
  { month: "Jun", revenue: 61000, mrr: 50000, users: 2010 },
  { month: "Jul", revenue: 58000, mrr: 48000, users: 2140 },
  { month: "Aug", revenue: 67000, mrr: 55000, users: 2380 },
  { month: "Sep", revenue: 74000, mrr: 61000, users: 2590 },
  { month: "Oct", revenue: 82000, mrr: 68000, users: 2810 },
  { month: "Nov", revenue: 91000, mrr: 75000, users: 3040 },
  { month: "Dec", revenue: 103000, mrr: 86000, users: 3290 },
];

const kpiCards = [
  {
    label: "Monthly Recurring Revenue",
    value: "$86,400",
    change: 14.2,
    icon: DollarSign,
    color: BRAND_COLORS.primary,
    glow: "shadow-indigo-500/20",
    bg: "from-indigo-500/10 to-indigo-500/5",
    border: "border-indigo-500/20",
  },
  {
    label: "Active Users",
    value: "3,290",
    change: 8.7,
    icon: Users,
    color: BRAND_COLORS.accent,
    glow: "shadow-cyan-500/20",
    bg: "from-cyan-500/10 to-cyan-500/5",
    border: "border-cyan-500/20",
  },
  {
    label: "Avg. Session Duration",
    value: "4m 32s",
    change: 5.1,
    icon: Activity,
    color: BRAND_COLORS.success,
    glow: "shadow-emerald-500/20",
    bg: "from-emerald-500/10 to-emerald-500/5",
    border: "border-emerald-500/20",
  },
  {
    label: "Churn Rate",
    value: "1.8%",
    change: -0.4,
    icon: TrendingDown,
    color: BRAND_COLORS.warning,
    glow: "shadow-amber-500/20",
    bg: "from-amber-500/10 to-amber-500/5",
    border: "border-amber-500/20",
  },
];

const features = [
  {
    icon: BarChart2,
    title: "Real-Time Analytics",
    description:
      "Watch your metrics update live as events stream in. No more waiting for overnight batch jobs — see revenue, signups, and churn the moment they happen.",
    color: "#6366F1",
    glow: "shadow-indigo-500/20",
  },
  {
    icon: Zap,
    title: "Instant Alerts",
    description:
      "Set threshold-based alerts for any metric. Get notified via Slack, email, or webhook the second your churn spikes or a revenue milestone is hit.",
    color: "#06B6D4",
    glow: "shadow-cyan-500/20",
  },
  {
    icon: Globe,
    title: "Multi-Source Ingestion",
    description:
      "Connect Stripe, Segment, Mixpanel, and 40+ integrations in minutes. Pulse unifies all your data into a single source of truth.",
    color: "#8B5CF6",
    glow: "shadow-purple-500/20",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description:
      "SOC 2 Type II certified. All data encrypted at rest and in transit. Role-based access controls keep sensitive metrics visible only to the right people.",
    color: "#10B981",
    glow: "shadow-emerald-500/20",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Share dashboards, annotate charts, and leave comments directly on data points. Align your entire team around the same numbers.",
    color: "#F59E0B",
    glow: "shadow-amber-500/20",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description:
      "Pulse's AI surfaces anomalies, forecasts trends, and explains the 'why' behind metric changes — so you spend less time digging and more time deciding.",
    color: "#EF4444",
    glow: "shadow-red-500/20",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Head of Growth",
    company: "Loomify",
    avatar: "/images/sarah-chen-headshot.jpg",
    quote:
      "Pulse replaced four separate tools for us. Our team went from spending 3 hours a week on reporting to 15 minutes. The real-time alerts alone saved us from a churn crisis last quarter.",
    stars: 5,
  },
  {
    name: "Marcus Webb",
    role: "CTO",
    company: "Stackform",
    avatar: "/images/marcus-webb-headshot.jpg",
    quote:
      "The multi-source ingestion is genuinely magical. We connected Stripe, Segment, and our internal Postgres in under an hour. Now every stakeholder has the same dashboard.",
    stars: 5,
  },
  {
    name: "Priya Nair",
    role: "VP of Product",
    company: "Driftly",
    avatar: "/images/priya-nair-headshot.jpg",
    quote:
      "I've tried every analytics tool on the market. Pulse is the first one where the AI insights actually make sense. It caught a pricing experiment anomaly we would have missed for weeks.",
    stars: 5,
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "Perfect for early-stage SaaS teams getting serious about metrics.",
    features: [
      "Up to 5 team members",
      "10 connected data sources",
      "30-day data retention",
      "Standard dashboards",
      "Email alerts",
      "Community support",
    ],
    cta: "Start free trial",
    highlighted: false,
    badge: null,
  },
  {
    name: "Growth",
    price: "$149",
    period: "/mo",
    description: "For scaling teams that need deeper insights and collaboration.",
    features: [
      "Up to 25 team members",
      "Unlimited data sources",
      "1-year data retention",
      "Custom dashboards",
      "Slack + webhook alerts",
      "AI-powered insights",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "$499",
    period: "/mo",
    description: "For large organizations with advanced security and compliance needs.",
    features: [
      "Unlimited team members",
      "Unlimited data sources",
      "Unlimited data retention",
      "White-label dashboards",
      "SSO & SCIM provisioning",
      "SOC 2 compliance reports",
      "Dedicated success manager",
    ],
    cta: "Contact sales",
    highlighted: false,
    badge: null,
  },
];

const stats = [
  { value: "2,400+", label: "SaaS teams" },
  { value: "$4.2B", label: "Revenue tracked" },
  { value: "99.98%", label: "Uptime SLA" },
  { value: "< 2s", label: "Data latency" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function KPICardItem({
  card,
  index,
}: {
  card: (typeof kpiCards)[0];
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = card.icon;
  const isNegativeGood = card.label === "Churn Rate";
  const positive = isNegativeGood ? card.change < 0 : card.change > 0;

  return (
    <motion.div
      variants={scaleIn}
      whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`relative rounded-2xl border ${card.border} bg-gradient-to-br ${card.bg} p-5 shadow-lg ${card.glow} overflow-hidden`}
    >
      <div className="absolute inset-0 rounded-2xl bg-[#16162A]/60 pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${card.color}20`, border: `1px solid ${card.color}30` }}
          >
            <Icon className="w-5 h-5" style={{ color: card.color }} />
          </div>
          <span
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
              positive
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-red-500/15 text-red-400"
            }`}
          >
            {positive ? (
              <ArrowUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {Math.abs(card.change)}%
          </span>
        </div>
        <p className="text-2xl font-bold text-white mb-1">{card.value}</p>
        <p className="text-xs text-[#94A3B8]">{card.label}</p>
      </div>
    </motion.div>
  );
}

function FeatureCard({ feature }: { feature: (typeof features)[0] }) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = feature.icon;
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={shouldReduceMotion ? {} : { y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative rounded-2xl border border-[#2A2A45] bg-[#16162A]/80 p-6 hover:border-indigo-500/30 transition-all duration-300"
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${feature.color}08, transparent 70%)`,
        }}
      />
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 shadow-lg"
        style={{
          backgroundColor: `${feature.color}15`,
          border: `1px solid ${feature.color}25`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: feature.color }} />
      </div>
      <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
      <p className="text-sm text-[#64748B] leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={scaleIn}
      whileHover={shouldReduceMotion ? {} : { y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-[#2A2A45] bg-[#16162A]/80 p-6 flex flex-col gap-4"
    >
      <div className="flex items-center gap-1">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-sm text-[#CBD5E1] leading-relaxed flex-1">"{t.quote}"</p>
      <div className="flex items-center gap-3 pt-2 border-t border-[#2A2A45]">
        <img
          src={t.avatar}
          alt={t.name}
          className="w-9 h-9 rounded-full object-cover border border-[#2A2A45]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=6366F1&color=fff&size=36`;
          }}
        />
        <div>
          <p className="text-sm font-semibold text-white">{t.name}</p>
          <p className="text-xs text-[#64748B]">
            {t.role} · {t.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function PricingCard({ plan }: { plan: (typeof pricingPlans)[0] }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={shouldReduceMotion ? {} : { y: -6 }}
      transition={{ duration: 0.25 }}
      className={`relative rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300 ${
        plan.highlighted
          ? "border-2 border-indigo-500/60 bg-gradient-to-b from-indigo-500/10 to-[#16162A] shadow-2xl shadow-indigo-500/20"
          : "border border-[#2A2A45] bg-[#16162A]/80"
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {plan.badge}
        </span>
      )}
      <div>
        <h3 className="text-base font-semibold text-white mb-1">{plan.name}</h3>
        <p className="text-xs text-[#64748B] leading-relaxed">{plan.description}</p>
      </div>
      <div className="flex items-end gap-1">
        <span className="text-4xl font-extrabold text-white">{plan.price}</span>
        <span className="text-sm text-[#64748B] mb-1">{plan.period}</span>
      </div>
      <ul className="space-y-2.5 flex-1">
        {(plan.features ?? []).map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-[#94A3B8]">
            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link
          href="/dashboard"
          className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            plan.highlighted
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
              : "bg-white/5 border border-[#2A2A45] text-white hover:bg-white/10 hover:border-indigo-500/30"
          }`}
        >
          {plan.cta}
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1E1E2E] border border-[#2A2A45] rounded-xl p-3 shadow-xl text-xs">
      <p className="text-[#94A3B8] mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="font-semibold" style={{ color: entry.color }}>
          {entry.name === "revenue" || entry.name === "mrr"
            ? `$${(entry.value ?? 0).toLocaleString()}`
            : (entry.value ?? 0).toLocaleString()}{" "}
          <span className="text-[#64748B] font-normal capitalize">{entry.name}</span>
        </p>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<"revenue" | "users">("revenue");

  return (
    <main className="min-h-screen bg-[#0A0A14] text-white overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-600/8 rounded-full blur-[80px]" />
          <div className="absolute top-10 right-1/4 w-64 h-64 bg-cyan-600/8 rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-screen-xl mx-auto">
          {/* Badge */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold px-4 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              Now with AI-powered anomaly detection
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5"
            >
              <span className="text-white">The analytics dashboard</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                your SaaS deserves
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-[#94A3B8] leading-relaxed max-w-2xl mx-auto mb-8"
            >
              {APP_TAGLINE} Pulse Analytics unifies your revenue, user, and product
              data into one beautiful, real-time dashboard — so you always know
              what's driving growth and what's holding it back.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow text-sm"
                >
                  Open Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/analytics"
                  className="inline-flex items-center gap-2 bg-white/5 border border-[#2A2A45] text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 hover:border-indigo-500/30 transition-all text-sm"
                >
                  View Analytics
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* KPI Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
          >
            {kpiCards.map((card, i) => (
              <KPICardItem key={card.label} card={card} index={i} />
            ))}
          </motion.div>

          {/* Hero Chart */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-[#2A2A45] bg-[#16162A]/80 p-5 shadow-2xl shadow-black/40"
          >
            {/* Chart header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="text-base font-semibold text-white">Revenue Overview</h2>
                <p className="text-xs text-[#64748B]">Last 12 months · Updated live</p>
              </div>
              <div className="flex items-center gap-2">
                {(["revenue", "users"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeTab === tab
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "text-[#64748B] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab === "revenue" ? "Revenue" : "Users"}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-56 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                {activeTab === "revenue" ? (
                  <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A45" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2} fill="url(#revGrad)" dot={false} />
                    <Area type="monotone" dataKey="mrr" stroke="#06B6D4" strokeWidth={2} fill="url(#mrrGrad)" dot={false} />
                  </AreaChart>
                ) : (
                  <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A45" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="users" stroke="#10B981" strokeWidth={2} fill="url(#usersGrad)" dot={false} />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="border-y border-[#2A2A45] bg-[#16162A]/40 py-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-screen-xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeInUp}
              className="text-center"
            >
              <p className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-1">
                {s.value}
              </p>
              <p className="text-sm text-[#64748B]">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-screen-xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <span className="inline-block text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
              Platform Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Everything you need to grow faster
            </h2>
            <p className="text-[#94A3B8] max-w-xl mx-auto text-base leading-relaxed">
              Pulse Analytics is purpose-built for SaaS teams who need more than
              vanity metrics — you need actionable intelligence, delivered instantly.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((f) => (
              <FeatureCard key={f.title} feature={f} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DASHBOARD PREVIEW ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D1A]">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <span className="inline-block text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3">
                Live Dashboard
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5 leading-tight">
                Your metrics, beautifully unified in one place
              </h2>
              <p className="text-[#94A3B8] leading-relaxed mb-6">
                Stop context-switching between Stripe, Mixpanel, and spreadsheets.
                Pulse pulls every signal into a single, customizable dashboard that
                updates in under 2 seconds — so your whole team is always aligned.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Drag-and-drop dashboard builder",
                  "40+ pre-built chart templates",
                  "Shareable public dashboard links",
                  "Scheduled PDF/CSV exports",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-[#CBD5E1]">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow text-sm"
                >
                  Explore Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right chart panel */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="rounded-2xl border border-[#2A2A45] bg-[#16162A]/80 p-5 shadow-2xl shadow-black/40"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-white">Monthly Revenue vs MRR</p>
                  <p className="text-xs text-[#64748B]">Jan – Dec 2024</p>
                </div>
                <span className="text-xs bg-emerald-500/15 text-emerald-400 px-2 py-1 rounded-full font-medium">
                  +14.2% YoY
                </span>
              </div>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A45" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="revenue" fill="#6366F1" radius={[4, 4, 0, 0]} opacity={0.85} />
                    <Bar dataKey="mrr" fill="#06B6D4" radius={[4, 4, 0, 0]} opacity={0.7} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#2A2A45]">
                <span className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 inline-block" />
                  Revenue
                </span>
                <span className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500 inline-block" />
                  MRR
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <span className="inline-block text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">
              Customer Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Loved by SaaS teams worldwide
            </h2>
            <p className="text-[#94A3B8] max-w-xl mx-auto text-base">
              Over 2,400 companies trust Pulse Analytics to make faster, smarter
              decisions every single day.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D1A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-600/6 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-screen-xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <span className="inline-block text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
              Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-[#94A3B8] max-w-xl mx-auto text-base">
              Start free for 14 days. No credit card required. Cancel anytime.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
          >
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl mx-auto text-center rounded-3xl border border-indigo-500/25 bg-gradient-to-br from-indigo-500/10 via-purple-500/8 to-cyan-500/8 p-12 shadow-2xl shadow-indigo-500/10 relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-indigo-500/15 rounded-full blur-[60px]" />
          </div>
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-indigo-500/30">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to see your data clearly?
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Join 2,400+ SaaS teams who replaced their fragmented reporting stack
              with Pulse Analytics. Set up in minutes, insights in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-7 py-3 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow text-sm"
                >
                  Start free trial
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/analytics"
                  className="inline-flex items-center gap-2 bg-white/5 border border-[#2A2A45] text-white font-semibold px-7 py-3 rounded-xl hover:bg-white/10 hover:border-indigo-500/30 transition-all text-sm"
                >
                  View live demo
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
            <p className="text-xs text-[#475569] mt-5">
              14-day free trial · No credit card required · Cancel anytime
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}