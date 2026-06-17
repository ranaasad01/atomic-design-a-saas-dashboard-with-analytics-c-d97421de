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
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Calendar, Filter, Download, RefreshCw, Eye, Target, Zap, Globe, ChevronDown } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const monthlyTrends = [
  { month: "Jan", revenue: 38200, mrr: 31000, users: 1820, activeUsers: 1540, churn: 2.8, sessions: 42000, conversions: 3.2 },
  { month: "Feb", revenue: 41500, mrr: 33500, users: 1970, activeUsers: 1680, churn: 2.5, sessions: 46200, conversions: 3.5 },
  { month: "Mar", revenue: 44800, mrr: 36200, users: 2140, activeUsers: 1820, churn: 2.3, sessions: 51000, conversions: 3.8 },
  { month: "Apr", revenue: 47200, mrr: 38900, users: 2310, activeUsers: 1960, churn: 2.1, sessions: 54800, conversions: 4.0 },
  { month: "May", revenue: 52600, mrr: 42100, users: 2520, activeUsers: 2140, churn: 1.9, sessions: 59200, conversions: 4.3 },
  { month: "Jun", revenue: 58900, mrr: 46800, users: 2780, activeUsers: 2360, churn: 1.7, sessions: 64500, conversions: 4.6 },
  { month: "Jul", revenue: 63400, mrr: 50200, users: 3020, activeUsers: 2580, churn: 1.6, sessions: 70100, conversions: 4.9 },
  { month: "Aug", revenue: 69800, mrr: 54600, users: 3290, activeUsers: 2810, churn: 1.5, sessions: 76400, conversions: 5.1 },
  { month: "Sep", revenue: 74200, mrr: 58900, users: 3540, activeUsers: 3020, churn: 1.4, sessions: 82000, conversions: 5.4 },
  { month: "Oct", revenue: 79600, mrr: 63400, users: 3820, activeUsers: 3260, churn: 1.3, sessions: 88600, conversions: 5.7 },
  { month: "Nov", revenue: 86100, mrr: 68200, users: 4110, activeUsers: 3510, churn: 1.2, sessions: 95200, conversions: 6.0 },
  { month: "Dec", revenue: 94500, mrr: 74800, users: 4420, activeUsers: 3780, churn: 1.1, sessions: 103000, conversions: 6.4 },
];

const channelData = [
  { channel: "Organic Search", sessions: 38400, conversions: 2840, revenue: 34200, growth: 18.4 },
  { channel: "Direct", sessions: 24600, conversions: 1920, revenue: 23100, growth: 12.1 },
  { channel: "Paid Ads", sessions: 18200, conversions: 1540, revenue: 18500, growth: 24.7 },
  { channel: "Referral", sessions: 12800, conversions: 980, revenue: 11800, growth: 9.3 },
  { channel: "Social Media", sessions: 9400, conversions: 620, revenue: 7500, growth: 31.2 },
  { channel: "Email", sessions: 7200, conversions: 840, revenue: 10100, growth: 15.6 },
];

const pieData = [
  { name: "Organic Search", value: 38400 },
  { name: "Direct", value: 24600 },
  { name: "Paid Ads", value: 18200 },
  { name: "Referral", value: 12800 },
  { name: "Social Media", value: 9400 },
  { name: "Email", value: 7200 },
];

const PIE_COLORS = ["#6366F1", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"];

const radarData = [
  { metric: "Acquisition", current: 82, previous: 68 },
  { metric: "Activation", current: 74, previous: 61 },
  { metric: "Retention", current: 88, previous: 72 },
  { metric: "Revenue", current: 91, previous: 75 },
  { metric: "Referral", current: 65, previous: 54 },
  { metric: "Engagement", current: 78, previous: 63 },
];

const cohortData = [
  { cohort: "Jan '24", m0: 100, m1: 72, m2: 61, m3: 54, m4: 49, m5: 45 },
  { cohort: "Feb '24", m0: 100, m1: 75, m2: 64, m3: 57, m4: 52, m5: 48 },
  { cohort: "Mar '24", m0: 100, m1: 78, m2: 67, m3: 60, m4: 55, m5: null },
  { cohort: "Apr '24", m0: 100, m1: 80, m2: 69, m3: 62, m4: null, m5: null },
  { cohort: "May '24", m0: 100, m1: 82, m2: 71, m3: null, m4: null, m5: null },
  { cohort: "Jun '24", m0: 100, m1: 84, m2: null, m3: null, m4: null, m5: null },
];

const topPages = [
  { page: "/dashboard", views: 142800, avgTime: "4m 32s", bounceRate: 18.2, trend: 12.4 },
  { page: "/analytics", views: 98400, avgTime: "6m 14s", bounceRate: 12.8, trend: 24.1 },
  { page: "/revenue", views: 76200, avgTime: "5m 48s", bounceRate: 15.4, trend: 8.7 },
  { page: "/users", views: 64800, avgTime: "3m 22s", bounceRate: 22.1, trend: -3.2 },
  { page: "/settings", views: 42100, avgTime: "2m 58s", bounceRate: 28.6, trend: 5.9 },
  { page: "/reports", views: 38600, avgTime: "7m 02s", bounceRate: 10.4, trend: 31.8 },
];

const kpiCards = [
  { label: "Total Revenue", value: "$94,500", change: 9.7, icon: DollarSign, color: "#6366F1", bg: "from-indigo-500/20 to-indigo-600/5" },
  { label: "Monthly Active Users", value: "3,780", change: 7.9, icon: Users, color: "#10B981", bg: "from-emerald-500/20 to-emerald-600/5" },
  { label: "Avg. Session Duration", value: "5m 12s", change: 4.3, icon: Activity, color: "#06B6D4", bg: "from-cyan-500/20 to-cyan-600/5" },
  { label: "Conversion Rate", value: "6.4%", change: 5.3, icon: Target, color: "#F59E0B", bg: "from-amber-500/20 to-amber-600/5" },
  { label: "Churn Rate", value: "1.1%", change: -8.3, icon: TrendingDown, color: "#EF4444", bg: "from-red-500/20 to-red-600/5" },
  { label: "Total Sessions", value: "103K", change: 8.2, icon: Globe, color: "#8B5CF6", bg: "from-purple-500/20 to-purple-600/5" },
];

const TIME_RANGES = ["7D", "30D", "90D", "6M", "1Y", "All"];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1E1E2E] border border-[#2A2A45] rounded-xl p-3 shadow-2xl shadow-black/40">
      <p className="text-xs font-semibold text-[#94A3B8] mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-[#94A3B8]">{entry.name}:</span>
          <span className="text-white font-semibold">
            {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── Cohort Cell ──────────────────────────────────────────────────────────────

const getCohortColor = (value: number | null) => {
  if (value === null) return "bg-[#1A1A2E]";
  if (value >= 80) return "bg-indigo-500/80";
  if (value >= 70) return "bg-indigo-500/60";
  if (value >= 60) return "bg-indigo-500/40";
  if (value >= 50) return "bg-indigo-500/25";
  return "bg-indigo-500/15";
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AnalyticsDeepDivePage() {
  const [timeRange, setTimeRange] = useState("1Y");
  const [activeChart, setActiveChart] = useState<"revenue" | "users" | "sessions">("revenue");

  const chartMetricConfig = {
    revenue: { key: "revenue", label: "Revenue", color: BRAND_COLORS.primary, prefix: "$" },
    users: { key: "activeUsers", label: "Active Users", color: BRAND_COLORS.success, prefix: "" },
    sessions: { key: "sessions", label: "Sessions", color: BRAND_COLORS.accent, prefix: "" },
  };

  const activeMetric = chartMetricConfig[activeChart];

  return (
    <div className="min-h-screen bg-[#0A0A14] text-white">
      {/* Page Header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="border-b border-[#2A2A45] bg-[#0F0F1A]/80 backdrop-blur-sm"
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                  Deep Dive
                </span>
                <span className="text-xs text-[#64748B]">Last updated: Dec 31, 2024</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Analytics &amp; Trends
              </h1>
              <p className="text-sm text-[#64748B] mt-1">
                Comprehensive breakdown of growth, engagement, and revenue performance.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Time Range Selector */}
              <div className="flex items-center bg-[#16162A] border border-[#2A2A45] rounded-lg p-1 gap-0.5">
                {TIME_RANGES.map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                      timeRange === range
                        ? "bg-indigo-500 text-white shadow-sm shadow-indigo-500/30"
                        : "text-[#64748B] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#94A3B8] bg-[#16162A] border border-[#2A2A45] rounded-lg hover:text-white hover:border-indigo-500/40 transition-all"
              >
                <Filter className="w-3.5 h-3.5" />
                Filter
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#94A3B8] bg-[#16162A] border border-[#2A2A45] rounded-lg hover:text-white hover:border-indigo-500/40 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Export
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
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change >= 0;
            const isChurn = card.label === "Churn Rate";
            const good = isChurn ? !isPositive : isPositive;
            return (
              <motion.div
                key={card.label}
                variants={scaleIn}
                whileHover={{ y: -3, scale: 1.02 }}
                className={`relative overflow-hidden rounded-xl border border-[#2A2A45] bg-gradient-to-br ${card.bg} p-4 cursor-default`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${card.color}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: card.color }} />
                  </div>
                  <span
                    className={`flex items-center gap-0.5 text-xs font-semibold ${
                      good ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {good ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(card.change)}%
                  </span>
                </div>
                <p className="text-lg font-bold text-white leading-none mb-1">{card.value}</p>
                <p className="text-xs text-[#64748B] leading-tight">{card.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Trend Chart */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl border border-[#2A2A45] bg-[#0F0F1A] p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Growth Trends</h2>
              <p className="text-sm text-[#64748B]">12-month performance overview</p>
            </div>
            <div className="flex items-center bg-[#16162A] border border-[#2A2A45] rounded-lg p-1 gap-0.5">
              {(["revenue", "users", "sessions"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setActiveChart(m)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all duration-200 ${
                    activeChart === m
                      ? "bg-indigo-500 text-white shadow-sm"
                      : "text-[#64748B] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyTrends} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={activeMetric.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={activeMetric.color} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={BRAND_COLORS.secondary} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={BRAND_COLORS.secondary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A45" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${activeMetric.prefix}${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={activeMetric.key}
                name={activeMetric.label}
                stroke={activeMetric.color}
                strokeWidth={2.5}
                fill="url(#areaGradient)"
                dot={false}
                activeDot={{ r: 5, fill: activeMetric.color, strokeWidth: 0 }}
              />
              {activeChart === "revenue" && (
                <Area
                  type="monotone"
                  dataKey="mrr"
                  name="MRR"
                  stroke={BRAND_COLORS.secondary}
                  strokeWidth={2}
                  fill="url(#mrrGradient)"
                  dot={false}
                  activeDot={{ r: 4, fill: BRAND_COLORS.secondary, strokeWidth: 0 }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Row: Bar Chart + Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Channel Bar Chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-3 rounded-2xl border border-[#2A2A45] bg-[#0F0F1A] p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-white">Traffic by Channel</h2>
                <p className="text-sm text-[#64748B]">Sessions and conversions breakdown</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={channelData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A45" vertical={false} />
                <XAxis dataKey="channel" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="sessions" name="Sessions" fill={BRAND_COLORS.primary} radius={[4, 4, 0, 0]} />
                <Bar dataKey="conversions" name="Conversions" fill={BRAND_COLORS.accent} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Traffic Share Pie */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-2 rounded-2xl border border-[#2A2A45] bg-[#0F0F1A] p-6"
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">Traffic Share</h2>
              <p className="text-sm text-[#64748B]">Session distribution</p>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-1.5">
              {pieData.slice(0, 4).map((entry, i) => (
                <div key={entry.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                    <span className="text-[#94A3B8]">{entry.name}</span>
                  </div>
                  <span className="text-white font-medium">{((entry.value / 110600) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Row: Radar + Churn Line */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl border border-[#2A2A45] bg-[#0F0F1A] p-6"
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">AARRR Framework</h2>
              <p className="text-sm text-[#64748B]">Current vs. previous period performance</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#2A2A45" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: "#64748B", fontSize: 11 }} />
                <Radar name="Current" dataKey="current" stroke={BRAND_COLORS.primary} fill={BRAND_COLORS.primary} fillOpacity={0.25} strokeWidth={2} />
                <Radar name="Previous" dataKey="previous" stroke={BRAND_COLORS.secondary} fill={BRAND_COLORS.secondary} fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 2" />
                <Legend wrapperStyle={{ fontSize: "11px", color: "#94A3B8" }} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Churn & Conversion Line Chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl border border-[#2A2A45] bg-[#0F0F1A] p-6"
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">Churn vs. Conversion</h2>
              <p className="text-sm text-[#64748B]">Monthly rate trends (%)</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyTrends} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A45" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: "11px", color: "#94A3B8" }} />
                <Line type="monotone" dataKey="churn" name="Churn Rate" stroke={BRAND_COLORS.danger} strokeWidth={2.5} dot={{ r: 3, fill: BRAND_COLORS.danger, strokeWidth: 0 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="conversions" name="Conversion Rate" stroke={BRAND_COLORS.success} strokeWidth={2.5} dot={{ r: 3, fill: BRAND_COLORS.success, strokeWidth: 0 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Cohort Retention Table */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl border border-[#2A2A45] bg-[#0F0F1A] p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Cohort Retention Analysis</h2>
              <p className="text-sm text-[#64748B]">Percentage of users retained by month after signup</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#64748B]">
              <span className="w-3 h-3 rounded bg-indigo-500/80 inline-block" />
              <span>High</span>
              <span className="w-3 h-3 rounded bg-indigo-500/25 inline-block ml-2" />
              <span>Low</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left text-xs font-semibold text-[#64748B] pb-3 pr-4 whitespace-nowrap">Cohort</th>
                  {["Month 0", "Month 1", "Month 2", "Month 3", "Month 4", "Month 5"].map((m) => (
                    <th key={m} className="text-center text-xs font-semibold text-[#64748B] pb-3 px-2 whitespace-nowrap">{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="space-y-1">
                {cohortData.map((row) => (
                  <tr key={row.cohort}>
                    <td className="text-xs font-medium text-[#94A3B8] py-1.5 pr-4 whitespace-nowrap">{row.cohort}</td>
                    {[row.m0, row.m1, row.m2, row.m3, row.m4, row.m5].map((val, i) => (
                      <td key={i} className="px-2 py-1.5 text-center">
                        {val !== null ? (
                          <span
                            className={`inline-flex items-center justify-center w-12 h-8 rounded-lg text-xs font-semibold text-white ${getCohortColor(val)}`}
                          >
                            {val}%
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-12 h-8 rounded-lg bg-[#1A1A2E] text-[#2A2A45] text-xs">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Channel Performance Table */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl border border-[#2A2A45] bg-[#0F0F1A] p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Channel Performance</h2>
              <p className="text-sm text-[#64748B]">Detailed breakdown by acquisition source</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#94A3B8] bg-[#16162A] border border-[#2A2A45] rounded-lg hover:text-white transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </motion.button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2A2A45]">
                  <th className="text-left text-xs font-semibold text-[#64748B] pb-3">Channel</th>
                  <th className="text-right text-xs font-semibold text-[#64748B] pb-3">Sessions</th>
                  <th className="text-right text-xs font-semibold text-[#64748B] pb-3">Conversions</th>
                  <th className="text-right text-xs font-semibold text-[#64748B] pb-3">Revenue</th>
                  <th className="text-right text-xs font-semibold text-[#64748B] pb-3">Growth</th>
                  <th className="text-left text-xs font-semibold text-[#64748B] pb-3 pl-4">Share</th>
                </tr>
              </thead>
              <tbody>
                {channelData.map((row, i) => {
                  const share = ((row.sessions / 110600) * 100).toFixed(1);
                  return (
                    <motion.tr
                      key={row.channel}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-[#2A2A45]/50 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                          <span className="text-sm font-medium text-white">{row.channel}</span>
                        </div>
                      </td>
                      <td className="py-3 text-right text-sm text-[#94A3B8]">{(row.sessions ?? 0).toLocaleString()}</td>
                      <td className="py-3 text-right text-sm text-[#94A3B8]">{(row.conversions ?? 0).toLocaleString()}</td>
                      <td className="py-3 text-right text-sm text-white font-medium">${(row.revenue ?? 0).toLocaleString()}</td>
                      <td className="py-3 text-right">
                        <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${row.growth >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                          {row.growth >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {Math.abs(row.growth)}%
                        </span>
                      </td>
                      <td className="py-3 pl-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-[#2A2A45] rounded-full overflow-hidden w-20">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${share}%`, backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                            />
                          </div>
                          <span className="text-xs text-[#64748B] w-8 text-right">{share}%</span>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Pages Table */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl border border-[#2A2A45] bg-[#0F0F1A] p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Top Pages by Traffic</h2>
              <p className="text-sm text-[#64748B]">Most visited pages with engagement metrics</p>
            </div>
            <button className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
              View all <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2A2A45]">
                  <th className="text-left text-xs font-semibold text-[#64748B] pb-3">Page</th>
                  <th className="text-right text-xs font-semibold text-[#64748B] pb-3">Page Views</th>
                  <th className="text-right text-xs font-semibold text-[#64748B] pb-3">Avg. Time</th>
                  <th className="text-right text-xs font-semibold text-[#64748B] pb-3">Bounce Rate</th>
                  <th className="text-right text-xs font-semibold text-[#64748B] pb-3">Trend</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((row, i) => (
                  <motion.tr
                    key={row.page}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="border-b border-[#2A2A45]/50 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <Eye className="w-3.5 h-3.5 text-[#64748B]" />
                        <span className="text-sm font-mono text-indigo-300">{row.page}</span>
                      </div>
                    </td>
                    <td className="py-3 text-right text-sm text-white font-medium">{(row.views ?? 0).toLocaleString()}</td>
                    <td className="py-3 text-right text-sm text-[#94A3B8]">{row.avgTime}</td>
                    <td className="py-3 text-right">
                      <span className={`text-sm font-medium ${row.bounceRate < 20 ? "text-emerald-400" : row.bounceRate < 25 ? "text-amber-400" : "text-red-400"}`}>
                        {(row.bounceRate ?? 0).toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${row.trend >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {row.trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(row.trend)}%
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Bottom Insight Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4"
        >
          {[
            {
              icon: Zap,
              color: "#F59E0B",
              title: "Peak Traffic Window",
              value: "Tue–Thu, 10am–2pm",
              desc: "68% of all conversions happen in this window. Consider scheduling campaigns accordingly.",
            },
            {
              icon: Target,
              color: "#10B981",
              title: "Best Converting Channel",
              value: "Email (11.7% CVR)",
              desc: "Email drives the highest conversion rate despite lower volume. Scale email campaigns.",
            },
            {
              icon: TrendingUp,
              color: "#6366F1",
              title: "Fastest Growing Source",
              value: "Social Media (+31.2%)",
              desc: "Social media traffic grew 31% MoM. Organic content strategy is gaining momentum.",
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={fadeInUp}
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-[#2A2A45] bg-[#0F0F1A] p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${card.color}20` }}>
                    <Icon className="w-4.5 h-4.5" style={{ color: card.color }} />
                  </div>
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">{card.title}</p>
                </div>
                <p className="text-base font-bold text-white mb-1.5">{card.value}</p>
                <p className="text-xs text-[#64748B] leading-relaxed">{card.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
}