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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users, AlertCircle, ArrowUpRight, ArrowDownRight, Calendar, Download, Filter, ChevronDown, Activity, RefreshCw } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mrrArrData = [
  { month: "Jan", mrr: 38200, arr: 458400, newMrr: 5200, churnedMrr: 1800, expansionMrr: 2100 },
  { month: "Feb", mrr: 41500, arr: 498000, newMrr: 6100, churnedMrr: 1600, expansionMrr: 2800 },
  { month: "Mar", mrr: 44800, arr: 537600, newMrr: 5800, churnedMrr: 2100, expansionMrr: 3100 },
  { month: "Apr", mrr: 47200, arr: 566400, newMrr: 6400, churnedMrr: 1900, expansionMrr: 2900 },
  { month: "May", mrr: 51600, arr: 619200, newMrr: 7200, churnedMrr: 1700, expansionMrr: 3100 },
  { month: "Jun", mrr: 55100, arr: 661200, newMrr: 7800, churnedMrr: 2200, expansionMrr: 3500 },
  { month: "Jul", mrr: 58900, arr: 706800, newMrr: 8100, churnedMrr: 1800, expansionMrr: 3700 },
  { month: "Aug", mrr: 62400, arr: 748800, newMrr: 8600, churnedMrr: 2100, expansionMrr: 4000 },
  { month: "Sep", mrr: 67200, arr: 806400, newMrr: 9200, churnedMrr: 1900, expansionMrr: 4300 },
  { month: "Oct", mrr: 71800, arr: 861600, newMrr: 9800, churnedMrr: 2200, expansionMrr: 4600 },
  { month: "Nov", mrr: 76500, arr: 918000, newMrr: 10400, churnedMrr: 2100, expansionMrr: 4900 },
  { month: "Dec", mrr: 82100, arr: 985200, newMrr: 11200, churnedMrr: 1900, expansionMrr: 5200 },
];

const churnData = [
  { month: "Jan", churnRate: 2.8, revenueChurn: 1.9, logoChurn: 3.1 },
  { month: "Feb", churnRate: 2.5, revenueChurn: 1.7, logoChurn: 2.8 },
  { month: "Mar", churnRate: 2.9, revenueChurn: 2.1, logoChurn: 3.3 },
  { month: "Apr", churnRate: 2.6, revenueChurn: 1.8, logoChurn: 2.9 },
  { month: "May", churnRate: 2.3, revenueChurn: 1.6, logoChurn: 2.6 },
  { month: "Jun", churnRate: 2.7, revenueChurn: 2.0, logoChurn: 3.0 },
  { month: "Jul", churnRate: 2.2, revenueChurn: 1.5, logoChurn: 2.4 },
  { month: "Aug", churnRate: 2.4, revenueChurn: 1.7, logoChurn: 2.7 },
  { month: "Sep", churnRate: 2.1, revenueChurn: 1.4, logoChurn: 2.3 },
  { month: "Oct", churnRate: 2.3, revenueChurn: 1.6, logoChurn: 2.5 },
  { month: "Nov", churnRate: 2.0, revenueChurn: 1.3, logoChurn: 2.2 },
  { month: "Dec", churnRate: 1.8, revenueChurn: 1.2, logoChurn: 2.0 },
];

const mrrBreakdownData = [
  { name: "New MRR", value: 11200, color: BRAND_COLORS.primary },
  { name: "Expansion MRR", value: 5200, color: BRAND_COLORS.success },
  { name: "Reactivation MRR", value: 1400, color: BRAND_COLORS.accent },
  { name: "Churned MRR", value: -1900, color: BRAND_COLORS.danger },
  { name: "Contraction MRR", value: -800, color: BRAND_COLORS.warning },
];

const pieData = [
  { name: "New MRR", value: 11200, color: BRAND_COLORS.primary },
  { name: "Expansion MRR", value: 5200, color: BRAND_COLORS.success },
  { name: "Reactivation MRR", value: 1400, color: BRAND_COLORS.accent },
];

const churnReasonData = [
  { reason: "Price too high", count: 34, percentage: 28 },
  { reason: "Missing features", count: 26, percentage: 21 },
  { reason: "Switched to competitor", count: 22, percentage: 18 },
  { reason: "No longer needed", count: 18, percentage: 15 },
  { reason: "Poor onboarding", count: 12, percentage: 10 },
  { reason: "Other", count: 10, percentage: 8 },
];

const topChurnedAccounts = [
  { id: "CHR-001", company: "Nexus Corp", plan: "Enterprise", mrr: 4200, reason: "Switched to competitor", date: "Dec 18, 2024" },
  { id: "CHR-002", company: "Brightwave Inc", plan: "Growth", mrr: 1800, reason: "Price too high", date: "Dec 15, 2024" },
  { id: "CHR-003", company: "Orion Systems", plan: "Growth", mrr: 1400, reason: "Missing features", date: "Dec 12, 2024" },
  { id: "CHR-004", company: "Stellar Labs", plan: "Starter", mrr: 490, reason: "No longer needed", date: "Dec 10, 2024" },
  { id: "CHR-005", company: "Apex Digital", plan: "Starter", mrr: 490, reason: "Poor onboarding", date: "Dec 8, 2024" },
];

const expansionAccounts = [
  { id: "EXP-001", company: "Quantum Ventures", from: "Growth", to: "Enterprise", mrrDelta: 2400, date: "Dec 20, 2024" },
  { id: "EXP-002", company: "Horizon Tech", from: "Starter", to: "Growth", mrrDelta: 1310, date: "Dec 19, 2024" },
  { id: "EXP-003", company: "Cascade AI", from: "Growth", to: "Enterprise", mrrDelta: 2400, date: "Dec 17, 2024" },
  { id: "EXP-004", company: "Prism Analytics", from: "Starter", to: "Growth", mrrDelta: 1310, date: "Dec 14, 2024" },
  { id: "EXP-005", company: "Vortex Cloud", from: "Growth", to: "Enterprise", mrrDelta: 2400, date: "Dec 11, 2024" },
];

// ─── KPI Cards Data ───────────────────────────────────────────────────────────

const kpiCards = [
  {
    label: "Monthly Recurring Revenue",
    value: "$82,100",
    change: 7.3,
    sub: "vs last month",
    icon: DollarSign,
    color: BRAND_COLORS.primary,
    bg: "from-indigo-500/10 to-indigo-500/5",
    border: "border-indigo-500/20",
  },
  {
    label: "Annual Recurring Revenue",
    value: "$985,200",
    change: 7.3,
    sub: "vs last month",
    icon: TrendingUp,
    color: BRAND_COLORS.success,
    bg: "from-emerald-500/10 to-emerald-500/5",
    border: "border-emerald-500/20",
  },
  {
    label: "Net Revenue Churn",
    value: "1.2%",
    change: -0.1,
    sub: "vs last month",
    icon: AlertCircle,
    color: BRAND_COLORS.warning,
    bg: "from-amber-500/10 to-amber-500/5",
    border: "border-amber-500/20",
    invertPositive: true,
  },
  {
    label: "Net MRR Growth",
    value: "$5,600",
    change: 14.3,
    sub: "net new this month",
    icon: Activity,
    color: BRAND_COLORS.accent,
    bg: "from-cyan-500/10 to-cyan-500/5",
    border: "border-cyan-500/20",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(val: number): string {
  if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}M`;
  if (val >= 1000) return `$${(val / 1000).toFixed(1)}K`;
  return `$${val}`;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1E1E2E] border border-[#2A2A45] rounded-xl p-3 shadow-xl shadow-black/40 min-w-[160px]">
      <p className="text-xs font-semibold text-[#94A3B8] mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center justify-between gap-4 mb-1">
          <span className="flex items-center gap-1.5 text-xs text-[#CBD5E1]">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            {entry.name}
          </span>
          <span className="text-xs font-bold text-white">{formatCurrency(entry.value)}</span>
        </div>
      ))}
    </div>
  );
}

function ChurnTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1E1E2E] border border-[#2A2A45] rounded-xl p-3 shadow-xl shadow-black/40 min-w-[160px]">
      <p className="text-xs font-semibold text-[#94A3B8] mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center justify-between gap-4 mb-1">
          <span className="flex items-center gap-1.5 text-xs text-[#CBD5E1]">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            {entry.name}
          </span>
          <span className="text-xs font-bold text-white">{(entry.value ?? 0).toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function RevenueMrrArrChurnPage() {
  const [period, setPeriod] = useState("12m");
  const [activeTab, setActiveTab] = useState<"churn" | "expansion">("churn");

  const periods = ["3m", "6m", "12m", "YTD"];

  const slicedData = period === "3m"
    ? mrrArrData.slice(-3)
    : period === "6m"
    ? mrrArrData.slice(-6)
    : mrrArrData;

  const slicedChurn = period === "3m"
    ? churnData.slice(-3)
    : period === "6m"
    ? churnData.slice(-6)
    : churnData;

  return (
    <main className="min-h-screen bg-[#0A0A14] text-[#F8FAFC]">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-indigo-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-purple-600/4 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ── Page Header ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Revenue Breakdown
            </h1>
            <p className="text-sm text-[#64748B] mt-1">
              MRR, ARR & churn analysis — December 2024
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Period selector */}
            <div className="flex items-center gap-1 bg-[#16162A] border border-[#2A2A45] rounded-xl p-1">
              {periods.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    period === p
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                      : "text-[#64748B] hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 bg-[#16162A] border border-[#2A2A45] rounded-xl text-sm text-[#94A3B8] hover:text-white hover:border-indigo-500/40 transition-all"
            >
              <Download className="w-4 h-4" />
              Export
            </motion.button>
          </div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.invertPositive ? card.change <= 0 : card.change >= 0;
            return (
              <motion.div
                key={card.label}
                variants={scaleIn}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`relative bg-gradient-to-br ${card.bg} border ${card.border} rounded-2xl p-5 overflow-hidden`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${card.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: card.color }} />
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
                      isPositive
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(card.change)}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{card.value}</p>
                <p className="text-xs text-[#64748B] font-medium">{card.label}</p>
                <p className="text-xs text-[#475569] mt-0.5">{card.sub}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── MRR / ARR Chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-[#16162A] border border-[#2A2A45] rounded-2xl p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-base font-semibold text-white">MRR & ARR Growth</h2>
              <p className="text-xs text-[#64748B] mt-0.5">Monthly and annual recurring revenue over time</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#64748B]">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded bg-indigo-400 inline-block" />
                MRR
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded bg-emerald-400 inline-block" />
                ARR
              </span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={slicedData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={BRAND_COLORS.primary} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={BRAND_COLORS.primary} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="arrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={BRAND_COLORS.success} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={BRAND_COLORS.success} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A45" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatCurrency(v)} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="mrr" name="MRR" stroke={BRAND_COLORS.primary} strokeWidth={2} fill="url(#mrrGrad)" dot={false} activeDot={{ r: 4, fill: BRAND_COLORS.primary }} />
                <Area type="monotone" dataKey="arr" name="ARR" stroke={BRAND_COLORS.success} strokeWidth={2} fill="url(#arrGrad)" dot={false} activeDot={{ r: 4, fill: BRAND_COLORS.success }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ── MRR Movement + Pie ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* MRR Movement Bar Chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-2 bg-[#16162A] border border-[#2A2A45] rounded-2xl p-6"
          >
            <div className="mb-6">
              <h2 className="text-base font-semibold text-white">MRR Movement</h2>
              <p className="text-xs text-[#64748B] mt-0.5">New, expansion, and churned MRR each month</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={slicedData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A45" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="newMrr" name="New MRR" fill={BRAND_COLORS.primary} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="expansionMrr" name="Expansion MRR" fill={BRAND_COLORS.success} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="churnedMrr" name="Churned MRR" fill={BRAND_COLORS.danger} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* MRR Breakdown Pie */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-[#16162A] border border-[#2A2A45] rounded-2xl p-6"
          >
            <div className="mb-4">
              <h2 className="text-base font-semibold text-white">MRR Sources</h2>
              <p className="text-xs text-[#64748B] mt-0.5">December 2024 breakdown</p>
            </div>
            <div className="h-44 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), ""]}
                    contentStyle={{ background: "#1E1E2E", border: "1px solid #2A2A45", borderRadius: "12px", fontSize: "12px" }}
                    labelStyle={{ color: "#94A3B8" }}
                    itemStyle={{ color: "#F8FAFC" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2.5 mt-2">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs text-[#94A3B8]">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </span>
                  <span className="text-xs font-semibold text-white">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Churn Rate Chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-[#16162A] border border-[#2A2A45] rounded-2xl p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-base font-semibold text-white">Churn Rate Trends</h2>
              <p className="text-xs text-[#64748B] mt-0.5">Customer churn, revenue churn, and logo churn over time</p>
            </div>
            <div className="flex items-center gap-1 bg-[#0F0F1A] border border-[#2A2A45] rounded-xl p-1">
              <span className="flex items-center gap-1.5 px-2 text-xs text-[#64748B]">
                <span className="w-2.5 h-0.5 rounded bg-amber-400 inline-block" />Customer
              </span>
              <span className="flex items-center gap-1.5 px-2 text-xs text-[#64748B]">
                <span className="w-2.5 h-0.5 rounded bg-red-400 inline-block" />Revenue
              </span>
              <span className="flex items-center gap-1.5 px-2 text-xs text-[#64748B]">
                <span className="w-2.5 h-0.5 rounded bg-purple-400 inline-block" />Logo
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={slicedChurn} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A45" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[0, 4]} />
                <Tooltip content={<ChurnTooltip />} />
                <Line type="monotone" dataKey="churnRate" name="Customer Churn" stroke={BRAND_COLORS.warning} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="revenueChurn" name="Revenue Churn" stroke={BRAND_COLORS.danger} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="logoChurn" name="Logo Churn" stroke={BRAND_COLORS.secondary} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ── Churn Reasons + MRR Breakdown Table ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Churn Reasons */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-[#16162A] border border-[#2A2A45] rounded-2xl p-6"
          >
            <h2 className="text-base font-semibold text-white mb-1">Churn Reasons</h2>
            <p className="text-xs text-[#64748B] mb-5">Why customers cancelled this quarter</p>
            <div className="space-y-4">
              {churnReasonData.map((item) => (
                <div key={item.reason}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-[#CBD5E1]">{item.reason}</span>
                    <span className="text-xs font-semibold text-white">{item.count} accounts ({item.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-[#2A2A45] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${BRAND_COLORS.danger}, ${BRAND_COLORS.warning})`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* MRR Breakdown */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-[#16162A] border border-[#2A2A45] rounded-2xl p-6"
          >
            <h2 className="text-base font-semibold text-white mb-1">Net MRR Breakdown</h2>
            <p className="text-xs text-[#64748B] mb-5">December 2024 net new MRR components</p>
            <div className="space-y-3">
              {mrrBreakdownData.map((item) => {
                const isNeg = item.value < 0;
                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#0F0F1A] border border-[#2A2A45]"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded-sm flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-[#CBD5E1]">{item.name}</span>
                    </div>
                    <span
                      className={`text-sm font-bold ${isNeg ? "text-red-400" : "text-emerald-400"}`}
                    >
                      {isNeg ? "-" : "+"}
                      {formatCurrency(Math.abs(item.value))}
                    </span>
                  </div>
                );
              })}
              <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 mt-2">
                <span className="text-sm font-semibold text-white">Net New MRR</span>
                <span className="text-sm font-bold text-indigo-300">+$17,100</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Churned & Expansion Accounts Table ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-[#16162A] border border-[#2A2A45] rounded-2xl overflow-hidden"
        >
          {/* Tab header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-0">
            <div className="flex gap-1 bg-[#0F0F1A] border border-[#2A2A45] rounded-xl p-1">
              <button
                onClick={() => setActiveTab("churn")}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  activeTab === "churn"
                    ? "bg-red-500/20 text-red-300 border border-red-500/20"
                    : "text-[#64748B] hover:text-white"
                }`}
              >
                Churned Accounts
              </button>
              <button
                onClick={() => setActiveTab("expansion")}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  activeTab === "expansion"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/20"
                    : "text-[#64748B] hover:text-white"
                }`}
              >
                Expansion Revenue
              </button>
            </div>
            <span className="text-xs text-[#475569]">December 2024</span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            {activeTab === "churn" ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2A2A45]">
                    <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-6 py-3">Company</th>
                    <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-4 py-3">Plan</th>
                    <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-4 py-3">Lost MRR</th>
                    <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-4 py-3">Reason</th>
                    <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {topChurnedAccounts.map((row, i) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                      className="border-b border-[#2A2A45]/50 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xs font-bold text-red-400">
                            {row.company?.charAt(0) ?? "?"}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{row.company}</p>
                            <p className="text-xs text-[#475569]">{row.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                          row.plan === "Enterprise"
                            ? "bg-indigo-500/15 text-indigo-300"
                            : row.plan === "Growth"
                            ? "bg-cyan-500/15 text-cyan-300"
                            : "bg-slate-500/15 text-slate-300"
                        }`}>
                          {row.plan}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-semibold text-red-400">
                          -{formatCurrency(row.mrr ?? 0)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-[#94A3B8]">{row.reason}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs text-[#64748B]">{row.date}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2A2A45]">
                    <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-6 py-3">Company</th>
                    <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-4 py-3">Upgrade</th>
                    <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-4 py-3">MRR Delta</th>
                    <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {expansionAccounts.map((row, i) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                      className="border-b border-[#2A2A45]/50 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400">
                            {row.company?.charAt(0) ?? "?"}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{row.company}</p>
                            <p className="text-xs text-[#475569]">{row.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="px-2 py-1 rounded-lg bg-slate-500/15 text-slate-300 font-semibold">{row.from}</span>
                          <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                          <span className="px-2 py-1 rounded-lg bg-indigo-500/15 text-indigo-300 font-semibold">{row.to}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-semibold text-emerald-400">
                          +{formatCurrency(row.mrrDelta ?? 0)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs text-[#64748B]">{row.date}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="px-6 py-4 border-t border-[#2A2A45] flex items-center justify-between">
            <span className="text-xs text-[#475569]">
              Showing {activeTab === "churn" ? topChurnedAccounts.length : expansionAccounts.length} records
            </span>
            <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
              View all →
            </button>
          </div>
        </motion.div>

        {/* ── Health Summary Banner ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-gradient-to-r from-indigo-500/10 via-purple-500/8 to-cyan-500/10 border border-indigo-500/20 rounded-2xl p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
              <Activity className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-white mb-1">Revenue Health: Strong 💪</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                MRR grew 7.3% month-over-month to $82,100. Net revenue churn hit a record low of 1.2%, and expansion MRR of $5,200 outpaced churned MRR of $1,900 by 2.7×. ARR is on track to cross $1M next quarter.
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span className="text-2xl font-bold text-emerald-400">+$5,600</span>
              <span className="text-xs text-[#64748B]">Net new MRR this month</span>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}