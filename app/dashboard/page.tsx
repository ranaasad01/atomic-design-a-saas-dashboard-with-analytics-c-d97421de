"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, AlertCircle, ArrowRight, Clock, Star } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS, APP_NAME } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mrrData = [
  { month: "Jan", mrr: 28400, revenue: 31200, users: 1840 },
  { month: "Feb", mrr: 31200, revenue: 34800, users: 1960 },
  { month: "Mar", mrr: 33800, revenue: 37500, users: 2100 },
  { month: "Apr", mrr: 36100, revenue: 40200, users: 2280 },
  { month: "May", mrr: 38900, revenue: 43100, users: 2410 },
  { month: "Jun", mrr: 41200, revenue: 45800, users: 2590 },
  { month: "Jul", mrr: 43800, revenue: 48600, users: 2740 },
  { month: "Aug", mrr: 46500, revenue: 51400, users: 2910 },
  { month: "Sep", mrr: 48200, revenue: 53900, users: 3080 },
  { month: "Oct", mrr: 50100, revenue: 55700, users: 3240 },
  { month: "Nov", mrr: 52400, revenue: 58200, users: 3410 },
  { month: "Dec", mrr: 54800, revenue: 61000, users: 3590 },
];

const signupData = [
  { month: "Jan", signups: 214, churned: 38 },
  { month: "Feb", signups: 248, churned: 42 },
  { month: "Mar", signups: 291, churned: 35 },
  { month: "Apr", signups: 312, churned: 48 },
  { month: "May", signups: 278, churned: 31 },
  { month: "Jun", signups: 334, churned: 44 },
  { month: "Jul", signups: 356, churned: 39 },
  { month: "Aug", signups: 389, churned: 52 },
  { month: "Sep", signups: 412, churned: 41 },
  { month: "Oct", signups: 398, churned: 36 },
  { month: "Nov", signups: 441, churned: 48 },
  { month: "Dec", signups: 468, churned: 43 },
];

const trafficData = [
  { name: "Organic Search", value: 38, color: BRAND_COLORS.primary },
  { name: "Direct", value: 24, color: BRAND_COLORS.secondary },
  { name: "Referral", value: 18, color: BRAND_COLORS.accent },
  { name: "Social Media", value: 12, color: BRAND_COLORS.success },
  { name: "Email", value: 8, color: BRAND_COLORS.warning },
];

const recentActivity = [
  { id: 1, user: "Sarah Chen", action: "Upgraded to Pro plan", time: "2 min ago", type: "upgrade", avatar: "SC" },
  { id: 2, user: "Marcus Webb", action: "New signup via referral", time: "8 min ago", type: "signup", avatar: "MW" },
  { id: 3, user: "Priya Nair", action: "Cancelled subscription", time: "15 min ago", type: "cancel", avatar: "PN" },
  { id: 4, user: "James Okafor", action: "Reached 10K API calls", time: "31 min ago", type: "milestone", avatar: "JO" },
  { id: 5, user: "Elena Vasquez", action: "Invited 3 team members", time: "47 min ago", type: "invite", avatar: "EV" },
  { id: 6, user: "Tom Lindqvist", action: "Upgraded to Enterprise", time: "1h ago", type: "upgrade", avatar: "TL" },
];

const topPages = [
  { path: "/dashboard", views: 14820, bounce: "24%", duration: "4m 12s" },
  { path: "/analytics", views: 9340, bounce: "31%", duration: "3m 48s" },
  { path: "/revenue", views: 7210, bounce: "28%", duration: "5m 02s" },
  { path: "/users", views: 5890, bounce: "36%", duration: "2m 55s" },
  { path: "/settings", views: 3120, bounce: "42%", duration: "1m 38s" },
];

const kpiCards = [
  {
    label: "Total Revenue",
    value: "$61,000",
    rawValue: 61000,
    change: 17.4,
    changeLabel: "vs last month",
    icon: DollarSign,
    color: BRAND_COLORS.primary,
    gradient: "from-indigo-500/20 to-indigo-600/5",
    border: "border-indigo-500/20",
  },
  {
    label: "Active Users",
    value: "3,590",
    rawValue: 3590,
    change: 5.3,
    changeLabel: "vs last month",
    icon: Users,
    color: BRAND_COLORS.accent,
    gradient: "from-cyan-500/20 to-cyan-600/5",
    border: "border-cyan-500/20",
  },
  {
    label: "Monthly MRR",
    value: "$54,800",
    rawValue: 54800,
    change: 4.6,
    changeLabel: "vs last month",
    icon: Activity,
    color: BRAND_COLORS.success,
    gradient: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-500/20",
  },
  {
    label: "Churn Rate",
    value: "1.8%",
    rawValue: 1.8,
    change: -0.4,
    changeLabel: "vs last month",
    icon: AlertCircle,
    color: BRAND_COLORS.warning,
    gradient: "from-amber-500/20 to-amber-600/5",
    border: "border-amber-500/20",
    invertTrend: true,
  },
];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1E1E2E] border border-[#2A2A45] rounded-xl px-4 py-3 shadow-2xl shadow-black/40">
      <p className="text-xs text-[#94A3B8] mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[#94A3B8] capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">
            {typeof entry.value === "number" && entry.name.toLowerCase().includes("mrr")
              ? `$${(entry.value ?? 0).toLocaleString()}`
              : typeof entry.value === "number" && entry.name.toLowerCase().includes("revenue")
              ? `$${(entry.value ?? 0).toLocaleString()}`
              : (entry.value ?? 0).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── Activity Type Badge ──────────────────────────────────────────────────────

const activityColors: Record<string, string> = {
  upgrade: "bg-indigo-500/15 text-indigo-300 border-indigo-500/20",
  signup: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  cancel: "bg-red-500/15 text-red-300 border-red-500/20",
  milestone: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  invite: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"mrr" | "revenue" | "users">("mrr");

  const tabConfig = {
    mrr: { key: "mrr", label: "MRR", color: BRAND_COLORS.primary, stroke: "#6366F1", fill: "url(#mrrGrad)" },
    revenue: { key: "revenue", label: "Revenue", color: BRAND_COLORS.accent, stroke: "#06B6D4", fill: "url(#revGrad)" },
    users: { key: "users", label: "Users", color: BRAND_COLORS.success, stroke: "#10B981", fill: "url(#usersGrad)" },
  };

  const activeConfig = tabConfig[activeTab];

  return (
    <main className="min-h-screen bg-[#0A0A14] text-[#F8FAFC]">
      {/* Page header */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="border-b border-[#2A2A45] bg-[#0F0F1A]/80 backdrop-blur-sm"
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Dashboard Overview
              </h1>
              <p className="text-sm text-[#64748B] mt-1">
                Welcome back — here&apos;s what&apos;s happening with {APP_NAME} today.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#64748B] bg-[#1E1E2E] border border-[#2A2A45] rounded-lg px-3 py-2">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Last updated: Dec 31, 2024 · 11:59 PM UTC</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ── KPI Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change > 0;
            const isGood = card.invertTrend ? !isPositive : isPositive;
            return (
              <motion.div
                key={card.label}
                variants={scaleIn}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} border ${card.border} p-5 cursor-default`}
              >
                {/* Glow orb */}
                <div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20"
                  style={{ backgroundColor: card.color }}
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${card.color}22`, border: `1px solid ${card.color}33` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: card.color }} />
                    </div>
                    <span
                      className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full border ${
                        isGood
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {Math.abs(card.change)}
                      {card.label === "Churn Rate" ? "pp" : "%"}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{card.value}</p>
                  <p className="text-sm text-[#94A3B8] font-medium">{card.label}</p>
                  <p className="text-xs text-[#64748B] mt-1">{card.changeLabel}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── MRR / Revenue / Users Line Chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl bg-[#0F0F1A] border border-[#2A2A45] p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Growth Trends</h2>
              <p className="text-sm text-[#64748B] mt-0.5">12-month performance overview</p>
            </div>
            <div className="flex items-center gap-1 bg-[#1E1E2E] border border-[#2A2A45] rounded-xl p-1">
              {(["mrr", "revenue", "users"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                      : "text-[#64748B] hover:text-white"
                  }`}
                >
                  {tabConfig[tab].label}
                </button>
              ))}
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mrrData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A45" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#64748B", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748B", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) =>
                    activeTab === "users"
                      ? `${(v / 1000).toFixed(1)}k`
                      : `$${(v / 1000).toFixed(0)}k`
                  }
                  width={52}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey={activeConfig.key}
                  stroke={activeConfig.stroke}
                  strokeWidth={2.5}
                  fill={activeConfig.fill}
                  dot={false}
                  activeDot={{ r: 5, fill: activeConfig.stroke, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ── Bar Chart + Donut Chart row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Bar Chart — Monthly Signups */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-3 rounded-2xl bg-[#0F0F1A] border border-[#2A2A45] p-6"
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">Monthly Signups vs Churn</h2>
              <p className="text-sm text-[#64748B] mt-0.5">New users acquired and lost each month</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={signupData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A45" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#64748B", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={36}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: "12px", color: "#94A3B8", paddingTop: "12px" }}
                    iconType="circle"
                    iconSize={8}
                  />
                  <Bar dataKey="signups" fill="#6366F1" radius={[4, 4, 0, 0]} maxBarSize={28} />
                  <Bar dataKey="churned" fill="#EF4444" radius={[4, 4, 0, 0]} maxBarSize={28} fillOpacity={0.7} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Donut Chart — Traffic Sources */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-2 rounded-2xl bg-[#0F0F1A] border border-[#2A2A45] p-6"
          >
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-white">Traffic Sources</h2>
              <p className="text-sm text-[#64748B] mt-0.5">Acquisition breakdown</p>
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficData}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={76}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {trafficData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Share"]}
                    contentStyle={{
                      backgroundColor: "#1E1E2E",
                      border: "1px solid #2A2A45",
                      borderRadius: "12px",
                      color: "#F8FAFC",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {trafficData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-[#94A3B8]">{item.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Recent Activity + Top Pages ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Recent Activity */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl bg-[#0F0F1A] border border-[#2A2A45] p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
                <p className="text-sm text-[#64748B] mt-0.5">Latest user events</p>
              </div>
              <button className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {recentActivity.map((item) => (
                <motion.li
                  key={item.id}
                  variants={fadeInUp}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/3 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-indigo-300">{item.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{item.user}</p>
                    <p className="text-xs text-[#64748B] truncate">{item.action}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                        activityColors[item.type] ?? "bg-white/5 text-[#94A3B8] border-white/10"
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="text-xs text-[#475569]">{item.time}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Top Pages */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl bg-[#0F0F1A] border border-[#2A2A45] p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-white">Top Pages</h2>
                <p className="text-sm text-[#64748B] mt-0.5">Most visited routes this month</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#64748B]">
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <span>Dec 2024</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2A2A45]">
                    <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider pb-3">Page</th>
                    <th className="text-right text-xs font-semibold text-[#64748B] uppercase tracking-wider pb-3">Views</th>
                    <th className="text-right text-xs font-semibold text-[#64748B] uppercase tracking-wider pb-3">Bounce</th>
                    <th className="text-right text-xs font-semibold text-[#64748B] uppercase tracking-wider pb-3">Avg. Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2A45]/60">
                  {topPages.map((page, i) => (
                    <tr key={page.path} className="hover:bg-white/2 transition-colors group">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400 flex-shrink-0">
                            {i + 1}
                          </span>
                          <span className="font-mono text-xs text-[#94A3B8] group-hover:text-white transition-colors">
                            {page.path}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-right font-semibold text-white text-xs">
                        {(page.views ?? 0).toLocaleString()}
                      </td>
                      <td className="py-3 text-right text-xs">
                        <span className="text-amber-400 font-medium">{page.bounce}</span>
                      </td>
                      <td className="py-3 text-right text-xs text-[#64748B]">{page.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mini bar chart for page views */}
            <div className="mt-5 pt-5 border-t border-[#2A2A45]">
              <p className="text-xs text-[#64748B] mb-3 font-medium">Relative traffic distribution</p>
              <div className="space-y-2">
                {topPages.map((page) => {
                  const maxViews = topPages[0]?.views ?? 1;
                  const pct = Math.round(((page.views ?? 0) / maxViews) * 100);
                  return (
                    <div key={page.path} className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#475569] w-24 truncate flex-shrink-0">{page.path}</span>
                      <div className="flex-1 h-1.5 bg-[#2A2A45] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        />
                      </div>
                      <span className="text-xs text-[#64748B] w-8 text-right flex-shrink-0">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Quick Stats Footer Row ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { label: "Avg. Session Duration", value: "4m 28s", sub: "+12s vs last month", color: "text-indigo-400" },
            { label: "Pages per Session", value: "3.7", sub: "+0.3 vs last month", color: "text-cyan-400" },
            { label: "Conversion Rate", value: "5.2%", sub: "+0.8pp vs last month", color: "text-emerald-400" },
            { label: "NPS Score", value: "72", sub: "+4 vs last quarter", color: "text-amber-400" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="rounded-xl bg-[#0F0F1A] border border-[#2A2A45] p-4 text-center cursor-default"
            >
              <p className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
              <p className="text-xs font-medium text-white mb-1">{stat.label}</p>
              <p className="text-xs text-[#475569]">{stat.sub}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </main>
  );
}