"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Eye, ShoppingCart, Zap, Globe, Clock, CheckCircle, AlertCircle, MoreHorizontal, Download, RefreshCw, Filter, Calendar } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const kpiCards = [
  {
    id: "mrr",
    label: "Monthly Recurring Revenue",
    value: 84320,
    prefix: "$",
    suffix: "",
    change: 12.4,
    changeLabel: "vs last month",
    icon: DollarSign,
    color: BRAND_COLORS.primary,
    gradient: "from-indigo-500/20 to-indigo-600/5",
    border: "border-indigo-500/20",
  },
  {
    id: "users",
    label: "Total Active Users",
    value: 24891,
    prefix: "",
    suffix: "",
    change: 8.7,
    changeLabel: "vs last month",
    icon: Users,
    color: BRAND_COLORS.accent,
    gradient: "from-cyan-500/20 to-cyan-600/5",
    border: "border-cyan-500/20",
  },
  {
    id: "churn",
    label: "Churn Rate",
    value: 1.8,
    prefix: "",
    suffix: "%",
    change: -0.4,
    changeLabel: "vs last month",
    icon: TrendingDown,
    color: BRAND_COLORS.success,
    gradient: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-500/20",
  },
  {
    id: "arpu",
    label: "Avg Revenue Per User",
    value: 42.5,
    prefix: "$",
    suffix: "",
    change: 3.2,
    changeLabel: "vs last month",
    icon: Zap,
    color: BRAND_COLORS.warning,
    gradient: "from-amber-500/20 to-amber-600/5",
    border: "border-amber-500/20",
  },
];

const revenueData = [
  { month: "Jan", revenue: 52000, mrr: 48000, target: 55000 },
  { month: "Feb", revenue: 58000, mrr: 53000, target: 58000 },
  { month: "Mar", revenue: 61000, mrr: 57000, target: 62000 },
  { month: "Apr", revenue: 67000, mrr: 63000, target: 65000 },
  { month: "May", revenue: 71000, mrr: 68000, target: 70000 },
  { month: "Jun", revenue: 75000, mrr: 72000, target: 74000 },
  { month: "Jul", revenue: 79000, mrr: 76000, target: 78000 },
  { month: "Aug", revenue: 84320, mrr: 81000, target: 82000 },
];

const userGrowthData = [
  { month: "Jan", newUsers: 1200, activeUsers: 18400, churned: 320 },
  { month: "Feb", newUsers: 1450, activeUsers: 19200, churned: 290 },
  { month: "Mar", newUsers: 1680, activeUsers: 20100, churned: 310 },
  { month: "Apr", newUsers: 1920, activeUsers: 21300, churned: 280 },
  { month: "May", newUsers: 2100, activeUsers: 22400, churned: 260 },
  { month: "Jun", newUsers: 2350, activeUsers: 23500, churned: 240 },
  { month: "Jul", newUsers: 2600, activeUsers: 24100, churned: 220 },
  { month: "Aug", newUsers: 2890, activeUsers: 24891, churned: 198 },
];

const trafficSourceData = [
  { name: "Organic Search", value: 38, color: BRAND_COLORS.primary },
  { name: "Direct", value: 24, color: BRAND_COLORS.accent },
  { name: "Referral", value: 18, color: BRAND_COLORS.secondary },
  { name: "Social Media", value: 12, color: BRAND_COLORS.success },
  { name: "Email", value: 8, color: BRAND_COLORS.warning },
];

const conversionData = [
  { stage: "Visitors", count: 48200, rate: 100 },
  { stage: "Sign-ups", count: 9640, rate: 20 },
  { stage: "Trial", count: 4820, rate: 10 },
  { stage: "Paid", count: 1688, rate: 3.5 },
];

const weeklyActivityData = [
  { day: "Mon", sessions: 3200, conversions: 142 },
  { day: "Tue", sessions: 3800, conversions: 168 },
  { day: "Wed", sessions: 4100, conversions: 195 },
  { day: "Thu", sessions: 3900, conversions: 182 },
  { day: "Fri", sessions: 4400, conversions: 210 },
  { day: "Sat", sessions: 2800, conversions: 98 },
  { day: "Sun", sessions: 2200, conversions: 76 },
];

const recentTransactions = [
  { id: "TXN-8821", customer: "Acme Corp", plan: "Enterprise", amount: 1299, status: "paid", date: "Aug 12" },
  { id: "TXN-8820", customer: "Bright Labs", plan: "Pro", amount: 299, status: "paid", date: "Aug 12" },
  { id: "TXN-8819", customer: "Nova Systems", plan: "Starter", amount: 49, status: "pending", date: "Aug 11" },
  { id: "TXN-8818", customer: "Orbit Media", plan: "Enterprise", amount: 1299, status: "paid", date: "Aug 11" },
  { id: "TXN-8817", customer: "Spark Digital", plan: "Pro", amount: 299, status: "failed", date: "Aug 10" },
  { id: "TXN-8816", customer: "Apex Solutions", plan: "Pro", amount: 299, status: "paid", date: "Aug 10" },
  { id: "TXN-8815", customer: "Zenith Cloud", plan: "Enterprise", amount: 1299, status: "paid", date: "Aug 9" },
];

const topPages = [
  { path: "/dashboard", views: 18420, bounce: "24%", duration: "4m 12s" },
  { path: "/analytics", views: 12380, bounce: "31%", duration: "3m 48s" },
  { path: "/pricing", views: 9840, bounce: "42%", duration: "2m 55s" },
  { path: "/features", views: 7620, bounce: "38%", duration: "3m 10s" },
  { path: "/integrations", views: 5910, bounce: "29%", duration: "4m 02s" },
];

const systemStatus = [
  { service: "API Gateway", status: "operational", uptime: "99.98%" },
  { service: "Data Pipeline", status: "operational", uptime: "99.95%" },
  { service: "Auth Service", status: "operational", uptime: "100%" },
  { service: "Webhooks", status: "degraded", uptime: "97.2%" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function KPICardComponent({
  card,
  index,
}: {
  card: (typeof kpiCards)[0];
  index: number;
}) {
  const Icon = card.icon;
  const isPositive = card.change > 0;
  const isNegativeGood = card.id === "churn";
  const isGood = isNegativeGood ? !isPositive : isPositive;

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`relative rounded-2xl bg-gradient-to-br ${card.gradient} border ${card.border} p-6 overflow-hidden group cursor-default`}
    >
      <div className="absolute inset-0 bg-[#16162A]/60 rounded-2xl" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${card.color}20` }}
          >
            <Icon className="w-5 h-5" style={{ color: card.color }} />
          </div>
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
              isGood
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-red-500/15 text-red-400"
            }`}
          >
            {isGood ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {Math.abs(card.change)}
            {card.id === "churn" ? "pp" : "%"}
          </div>
        </div>
        <p className="text-[#94A3B8] text-sm mb-1">{card.label}</p>
        <p className="text-3xl font-bold text-white tracking-tight">
          {card.prefix}
          {card.id === "arpu"
            ? (card.value ?? 0).toFixed(2)
            : card.id === "churn"
            ? (card.value ?? 0).toFixed(1)
            : (card.value ?? 0).toLocaleString()}
          {card.suffix}
        </p>
        <p className="text-xs text-[#64748B] mt-1">{card.changeLabel}</p>
      </div>
    </motion.div>
  );
}

function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {subtitle && <p className="text-sm text-[#64748B] mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-[#16162A] border border-[#2A2A45] p-6 ${className}`}
    >
      {children}
    </div>
  );
}

const CustomTooltipStyle = {
  backgroundColor: "#1E1E2E",
  border: "1px solid #2A2A45",
  borderRadius: "12px",
  color: "#F8FAFC",
  fontSize: "13px",
  padding: "10px 14px",
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardOverviewPage() {
  const [activeRange, setActiveRange] = useState<"7d" | "30d" | "90d">("30d");
  const [activeTab, setActiveTab] = useState<"revenue" | "users">("revenue");

  const ranges: Array<"7d" | "30d" | "90d"> = ["7d", "30d", "90d"];

  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white">
      {/* Page Header */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="border-b border-[#2A2A45] bg-[#0F0F1A]/80 backdrop-blur-sm sticky top-16 z-30"
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Dashboard Overview
              </h1>
              <p className="text-sm text-[#64748B] mt-0.5">
                All key metrics and analytics at a glance
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-[#1E1E2E] border border-[#2A2A45] rounded-xl p-1">
                {ranges.map((r) => (
                  <button
                    key={r}
                    onClick={() => setActiveRange(r)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeRange === r
                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                        : "text-[#64748B] hover:text-white"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1E1E2E] border border-[#2A2A45] text-[#94A3B8] hover:text-white text-xs font-medium transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Export
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/25 text-xs font-medium transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {kpiCards.map((card, i) => (
            <KPICardComponent key={card.id} card={card} index={i} />
          ))}
        </motion.div>

        {/* Revenue + User Growth Charts */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Growth Overview
                </h2>
                <p className="text-sm text-[#64748B] mt-0.5">
                  Revenue and user trends over time
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-[#0F0F1A] border border-[#2A2A45] rounded-xl p-1">
                  {(["revenue", "users"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                        activeTab === tab
                          ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                          : "text-[#64748B] hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              {activeTab === "revenue" ? (
                <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A45" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={CustomTooltipStyle} formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} />
                  <Legend wrapperStyle={{ color: "#94A3B8", fontSize: 12 }} />
                  <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366F1" strokeWidth={2} fill="url(#revGrad)" dot={false} activeDot={{ r: 5, fill: "#6366F1" }} />
                  <Area type="monotone" dataKey="mrr" name="MRR" stroke="#8B5CF6" strokeWidth={2} fill="url(#mrrGrad)" dot={false} activeDot={{ r: 5, fill: "#8B5CF6" }} />
                  <Line type="monotone" dataKey="target" name="Target" stroke="#F59E0B" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
                </AreaChart>
              ) : (
                <AreaChart data={userGrowthData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="newGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A45" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={CustomTooltipStyle} formatter={(v: number) => [v.toLocaleString(), ""]} />
                  <Legend wrapperStyle={{ color: "#94A3B8", fontSize: 12 }} />
                  <Area type="monotone" dataKey="activeUsers" name="Active Users" stroke="#06B6D4" strokeWidth={2} fill="url(#activeGrad)" dot={false} activeDot={{ r: 5, fill: "#06B6D4" }} />
                  <Area type="monotone" dataKey="newUsers" name="New Users" stroke="#10B981" strokeWidth={2} fill="url(#newGrad)" dot={false} activeDot={{ r: 5, fill: "#10B981" }} />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Middle Row: Traffic Sources + Weekly Activity */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Traffic Sources Pie */}
          <motion.div variants={scaleIn}>
            <Card className="h-full">
              <SectionHeader
                title="Traffic Sources"
                subtitle="Where your visitors come from"
              />
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie
                      data={trafficSourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {trafficSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={CustomTooltipStyle}
                      formatter={(v: number) => [`${v}%`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-3 w-full">
                  {trafficSourceData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-[#94A3B8]">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-1.5 rounded-full bg-[#2A2A45] overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${item.value}%`, backgroundColor: item.color }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-white w-8 text-right">
                          {item.value}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Weekly Activity Bar */}
          <motion.div variants={scaleIn}>
            <Card className="h-full">
              <SectionHeader
                title="Weekly Activity"
                subtitle="Sessions and conversions by day"
              />
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={weeklyActivityData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A45" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={CustomTooltipStyle} formatter={(v: number) => [v.toLocaleString(), ""]} />
                  <Legend wrapperStyle={{ color: "#94A3B8", fontSize: 12 }} />
                  <Bar dataKey="sessions" name="Sessions" fill="#6366F1" radius={[4, 4, 0, 0]} opacity={0.85} />
                  <Bar dataKey="conversions" name="Conversions" fill="#06B6D4" radius={[4, 4, 0, 0]} opacity={0.85} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </motion.div>

        {/* Conversion Funnel */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Card>
            <SectionHeader
              title="Conversion Funnel"
              subtitle="Visitor-to-paid conversion breakdown"
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {conversionData.map((stage, i) => {
                const colors = [
                  { bg: "bg-indigo-500/20", text: "text-indigo-400", bar: "bg-indigo-500" },
                  { bg: "bg-cyan-500/20", text: "text-cyan-400", bar: "bg-cyan-500" },
                  { bg: "bg-purple-500/20", text: "text-purple-400", bar: "bg-purple-500" },
                  { bg: "bg-emerald-500/20", text: "text-emerald-400", bar: "bg-emerald-500" },
                ];
                const c = colors[i] ?? colors[0];
                return (
                  <motion.div
                    key={stage.stage}
                    whileHover={{ scale: 1.03 }}
                    className={`rounded-xl p-4 ${c.bg} border border-white/5`}
                  >
                    <p className="text-xs text-[#64748B] mb-2">{stage.stage}</p>
                    <p className="text-2xl font-bold text-white mb-1">
                      {(stage.count ?? 0).toLocaleString()}
                    </p>
                    <p className={`text-sm font-semibold ${c.text}`}>
                      {stage.rate}%
                    </p>
                    <div className="mt-3 h-1.5 rounded-full bg-black/20 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stage.rate}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                        className={`h-full rounded-full ${c.bar}`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Bottom Row: Transactions + Top Pages */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 xl:grid-cols-3 gap-6"
        >
          {/* Recent Transactions */}
          <motion.div variants={fadeInUp} className="xl:col-span-2">
            <Card>
              <SectionHeader
                title="Recent Transactions"
                subtitle="Latest subscription payments"
                action={
                  <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                    View all →
                  </button>
                }
              />
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#2A2A45]">
                      {["Transaction", "Customer", "Plan", "Amount", "Status", "Date"].map((h) => (
                        <th key={h} className="text-left text-xs font-medium text-[#64748B] pb-3 pr-4 last:pr-0">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(recentTransactions ?? []).map((tx, i) => (
                      <motion.tr
                        key={tx.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-[#2A2A45]/50 last:border-0 hover:bg-white/2 transition-colors"
                      >
                        <td className="py-3 pr-4 font-mono text-xs text-[#64748B]">{tx.id}</td>
                        <td className="py-3 pr-4 text-white font-medium">{tx.customer}</td>
                        <td className="py-3 pr-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            tx.plan === "Enterprise"
                              ? "bg-purple-500/15 text-purple-400"
                              : tx.plan === "Pro"
                              ? "bg-indigo-500/15 text-indigo-400"
                              : "bg-slate-500/15 text-slate-400"
                          }`}>
                            {tx.plan}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-white font-semibold">
                          ${(tx.amount ?? 0).toLocaleString()}
                        </td>
                        <td className="py-3 pr-4">
                          <span className={`flex items-center gap-1 text-xs font-medium w-fit px-2 py-0.5 rounded-full ${
                            tx.status === "paid"
                              ? "bg-emerald-500/15 text-emerald-400"
                              : tx.status === "pending"
                              ? "bg-amber-500/15 text-amber-400"
                              : "bg-red-500/15 text-red-400"
                          }`}>
                            {tx.status === "paid" ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : tx.status === "pending" ? (
                              <Clock className="w-3 h-3" />
                            ) : (
                              <AlertCircle className="w-3 h-3" />
                            )}
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-3 text-[#64748B] text-xs">{tx.date}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>

          {/* Right Column: Top Pages + System Status */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-6">
            {/* Top Pages */}
            <Card>
              <SectionHeader title="Top Pages" subtitle="By pageviews" />
              <div className="space-y-3">
                {(topPages ?? []).map((page, i) => (
                  <div key={page.path} className="flex items-center gap-3">
                    <span className="text-xs text-[#475569] w-4 font-mono">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">{page.path}</p>
                      <p className="text-xs text-[#64748B]">
                        {(page.views ?? 0).toLocaleString()} views · {page.duration}
                      </p>
                    </div>
                    <span className="text-xs text-[#64748B] flex-shrink-0">{page.bounce}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* System Status */}
            <Card>
              <SectionHeader title="System Status" subtitle="Service health" />
              <div className="space-y-3">
                {(systemStatus ?? []).map((svc) => (
                  <div key={svc.service} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          svc.status === "operational"
                            ? "bg-emerald-400 shadow-sm shadow-emerald-400/50"
                            : "bg-amber-400 shadow-sm shadow-amber-400/50"
                        }`}
                      />
                      <span className="text-sm text-[#94A3B8]">{svc.service}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-white">{svc.uptime}</p>
                      <p className={`text-xs capitalize ${
                        svc.status === "operational" ? "text-emerald-400" : "text-amber-400"
                      }`}>
                        {svc.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* MRR Line Chart */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Card>
            <SectionHeader
              title="MRR Trend"
              subtitle="Monthly Recurring Revenue progression"
              action={
                <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                  <Calendar className="w-3.5 h-3.5" />
                  Last 8 months
                </div>
              }
            />
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="mrrLineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A45" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={CustomTooltipStyle} formatter={(v: number) => [`$${v.toLocaleString()}`, "MRR"]} />
                <Line
                  type="monotone"
                  dataKey="mrr"
                  stroke="url(#mrrLineGrad)"
                  strokeWidth={3}
                  dot={{ fill: "#6366F1", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#6366F1", stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}