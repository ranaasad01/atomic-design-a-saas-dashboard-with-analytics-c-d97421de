"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users, ArrowUpRight, ArrowDownRight, CreditCard, RefreshCw, Download, Filter } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const kpiCards = [
  {
    id: "mrr",
    label: "Monthly Recurring Revenue",
    value: 54820,
    prefix: "$",
    change: 12.4,
    changeLabel: "vs last month",
    icon: DollarSign,
    color: BRAND_COLORS.primary,
    bg: "from-indigo-500/20 to-indigo-600/5",
    border: "border-indigo-500/20",
  },
  {
    id: "arr",
    label: "Annual Recurring Revenue",
    value: 657840,
    prefix: "$",
    change: 18.7,
    changeLabel: "vs last year",
    icon: TrendingUp,
    color: BRAND_COLORS.success,
    bg: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-500/20",
  },
  {
    id: "churn",
    label: "Churn Rate",
    value: 1.8,
    suffix: "%",
    change: -0.4,
    changeLabel: "vs last month",
    icon: RefreshCw,
    color: BRAND_COLORS.warning,
    bg: "from-amber-500/20 to-amber-600/5",
    border: "border-amber-500/20",
  },
  {
    id: "arpu",
    label: "Avg Revenue Per User",
    value: 142,
    prefix: "$",
    change: 5.2,
    changeLabel: "vs last month",
    icon: Users,
    color: BRAND_COLORS.accent,
    bg: "from-cyan-500/20 to-cyan-600/5",
    border: "border-cyan-500/20",
  },
];

const stackedBarData = [
  { month: "Jan", Starter: 8200, Pro: 14500, Enterprise: 21000 },
  { month: "Feb", Starter: 8600, Pro: 15200, Enterprise: 22500 },
  { month: "Mar", Starter: 9100, Pro: 16800, Enterprise: 24000 },
  { month: "Apr", Starter: 9400, Pro: 17200, Enterprise: 25500 },
  { month: "May", Starter: 9800, Pro: 18500, Enterprise: 27000 },
  { month: "Jun", Starter: 10200, Pro: 19800, Enterprise: 28500 },
  { month: "Jul", Starter: 10600, Pro: 20500, Enterprise: 30000 },
  { month: "Aug", Starter: 11000, Pro: 21200, Enterprise: 31500 },
  { month: "Sep", Starter: 11400, Pro: 22000, Enterprise: 33000 },
  { month: "Oct", Starter: 11800, Pro: 22800, Enterprise: 34500 },
  { month: "Nov", Starter: 12200, Pro: 23500, Enterprise: 36000 },
  { month: "Dec", Starter: 12600, Pro: 24200, Enterprise: 38000 },
];

const pieData = [
  { name: "Direct Sales", value: 38, color: BRAND_COLORS.primary },
  { name: "Partner Referrals", value: 27, color: BRAND_COLORS.secondary },
  { name: "Organic / SEO", value: 19, color: BRAND_COLORS.accent },
  { name: "Paid Ads", value: 11, color: BRAND_COLORS.success },
  { name: "Affiliate", value: 5, color: BRAND_COLORS.warning },
];

const transactions = [
  { id: "TXN-8821", customer: "Acme Corp", plan: "Enterprise", amount: 2400, date: "2024-12-28", status: "paid" },
  { id: "TXN-8820", customer: "Bright Labs", plan: "Pro", amount: 299, date: "2024-12-27", status: "paid" },
  { id: "TXN-8819", customer: "Nova Systems", plan: "Enterprise", amount: 2400, date: "2024-12-27", status: "paid" },
  { id: "TXN-8818", customer: "Pixel Studio", plan: "Starter", amount: 49, date: "2024-12-26", status: "paid" },
  { id: "TXN-8817", customer: "Orbit Finance", plan: "Pro", amount: 299, date: "2024-12-26", status: "failed" },
  { id: "TXN-8816", customer: "Zenith Cloud", plan: "Enterprise", amount: 2400, date: "2024-12-25", status: "paid" },
  { id: "TXN-8815", customer: "Maple Analytics", plan: "Pro", amount: 299, date: "2024-12-25", status: "paid" },
  { id: "TXN-8814", customer: "Forge Digital", plan: "Starter", amount: 49, date: "2024-12-24", status: "refunded" },
  { id: "TXN-8813", customer: "Summit Health", plan: "Enterprise", amount: 2400, date: "2024-12-24", status: "paid" },
  { id: "TXN-8812", customer: "Crest Media", plan: "Pro", amount: 299, date: "2024-12-23", status: "paid" },
  { id: "TXN-8811", customer: "Dune Robotics", plan: "Starter", amount: 49, date: "2024-12-23", status: "paid" },
  { id: "TXN-8810", customer: "Apex Ventures", plan: "Enterprise", amount: 2400, date: "2024-12-22", status: "paid" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(val: number): string {
  if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}M`;
  if (val >= 1000) return `$${(val / 1000).toFixed(1)}K`;
  return `$${val.toFixed(0)}`;
}

function formatValue(val: number, prefix?: string, suffix?: string): string {
  const num = prefix === "$" ? (val >= 1000 ? `${(val / 1000).toFixed(1)}K` : val.toFixed(0)) : val.toFixed(1);
  return `${prefix ?? ""}${num}${suffix ?? ""}`;
}

const planColors: Record<string, string> = {
  Starter: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",
  Pro: "bg-indigo-500/15 text-indigo-300 border-indigo-500/20",
  Enterprise: "bg-purple-500/15 text-purple-300 border-purple-500/20",
};

const statusColors: Record<string, string> = {
  paid: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  failed: "bg-red-500/15 text-red-300 border-red-500/20",
  refunded: "bg-amber-500/15 text-amber-300 border-amber-500/20",
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomBarTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  const total = payload.reduce((sum, p) => sum + (p.value ?? 0), 0);
  return (
    <div className="bg-[#1E1E2E] border border-[#2A2A45] rounded-xl p-3 shadow-xl min-w-[160px]">
      <p className="text-xs font-semibold text-[#94A3B8] mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-xs text-[#94A3B8]">{p.name}</span>
          </div>
          <span className="text-xs font-semibold text-white">{formatCurrency(p.value ?? 0)}</span>
        </div>
      ))}
      <div className="border-t border-[#2A2A45] mt-2 pt-2 flex justify-between">
        <span className="text-xs text-[#64748B]">Total</span>
        <span className="text-xs font-bold text-indigo-300">{formatCurrency(total)}</span>
      </div>
    </div>
  );
}

function CustomPieTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { color: string } }> }) {
  if (!active || !payload || payload.length === 0) return null;
  const p = payload[0];
  if (!p) return null;
  return (
    <div className="bg-[#1E1E2E] border border-[#2A2A45] rounded-xl p-3 shadow-xl">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.payload?.color }} />
        <span className="text-sm font-semibold text-white">{p.name}</span>
      </div>
      <p className="text-lg font-bold text-indigo-300 mt-1">{p.value ?? 0}%</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RevenuePage() {
  const [txFilter, setTxFilter] = useState<string>("all");
  const [txSearch, setTxSearch] = useState<string>("");

  const filteredTx = (transactions ?? []).filter((tx) => {
    const matchesPlan = txFilter === "all" || tx.plan === txFilter;
    const query = txSearch.toLowerCase();
    const matchesSearch =
      query === "" ||
      (tx.customer?.toLowerCase() ?? "").includes(query) ||
      (tx.id?.toLowerCase() ?? "").includes(query);
    return matchesPlan && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#0A0A14] text-[#F8FAFC]">
      {/* ── Page Header ── */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="border-b border-[#2A2A45] bg-[#0F0F1A]/80 backdrop-blur-sm"
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Revenue
              </h1>
              <p className="mt-1 text-sm text-[#94A3B8]">
                Track MRR, ARR, churn, and revenue breakdown across all plan tiers.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-[#2A2A45] text-sm text-[#94A3B8] hover:text-white hover:bg-white/10 transition-all"
              >
                <Download className="w-4 h-4" />
                Export
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-sm text-white font-medium shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all"
              >
                <CreditCard className="w-4 h-4" />
                Billing Settings
              </motion.button>
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
            const isPositive = card.change >= 0;
            const isChurn = card.id === "churn";
            const good = isChurn ? !isPositive : isPositive;
            return (
              <motion.div
                key={card.id}
                variants={scaleIn}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.bg} border ${card.border} p-5 cursor-default`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${card.color}22` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: card.color }} />
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                      good
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-red-500/15 text-red-300"
                    }`}
                  >
                    {good ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(card.change).toFixed(1)}
                    {card.id === "churn" ? "pp" : "%"}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white tracking-tight">
                  {formatValue(card.value, card.prefix, card.suffix)}
                </p>
                <p className="text-sm text-[#94A3B8] mt-1">{card.label}</p>
                <p className="text-xs text-[#64748B] mt-0.5">{card.changeLabel}</p>
                {/* Decorative glow */}
                <div
                  className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-20"
                  style={{ background: card.color }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Stacked Bar Chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl bg-[#0F0F1A] border border-[#2A2A45] p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Revenue by Plan Tier</h2>
              <p className="text-sm text-[#64748B] mt-0.5">Monthly breakdown across Starter, Pro, and Enterprise — last 12 months</p>
            </div>
            <div className="flex items-center gap-3">
              {[
                { label: "Starter", color: BRAND_COLORS.accent },
                { label: "Pro", color: BRAND_COLORS.primary },
                { label: "Enterprise", color: BRAND_COLORS.secondary },
              ].map((tier) => (
                <div key={tier.label} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: tier.color }} />
                  <span className="text-xs text-[#94A3B8]">{tier.label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={stackedBarData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barSize={18}>
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
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
                width={52}
              />
              <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "rgba(99,102,241,0.06)" }} />
              <Bar dataKey="Starter" stackId="a" fill={BRAND_COLORS.accent} radius={[0, 0, 0, 0]} />
              <Bar dataKey="Pro" stackId="a" fill={BRAND_COLORS.primary} radius={[0, 0, 0, 0]} />
              <Bar dataKey="Enterprise" stackId="a" fill={BRAND_COLORS.secondary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ── Pie Chart + Summary ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6"
        >
          {/* Pie */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-3 rounded-2xl bg-[#0F0F1A] border border-[#2A2A45] p-6"
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">Revenue Source Split</h2>
              <p className="text-sm text-[#64748B] mt-0.5">Where your revenue originates this quarter</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <ResponsiveContainer width={220} height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-3 w-full">
                {pieData.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: entry.color }} />
                    <span className="text-sm text-[#94A3B8] flex-1">{entry.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 rounded-full bg-[#2A2A45] overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${entry.value}%`, background: entry.color }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-white w-8 text-right">{entry.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Plan Summary */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-2 rounded-2xl bg-[#0F0F1A] border border-[#2A2A45] p-6 flex flex-col gap-4"
          >
            <div className="mb-2">
              <h2 className="text-lg font-semibold text-white">Plan Distribution</h2>
              <p className="text-sm text-[#64748B] mt-0.5">Active subscribers by tier</p>
            </div>
            {[
              { plan: "Enterprise", count: 48, revenue: 115200, color: BRAND_COLORS.secondary, pct: 62 },
              { plan: "Pro", count: 213, revenue: 63687, color: BRAND_COLORS.primary, pct: 34 },
              { plan: "Starter", count: 385, revenue: 18865, color: BRAND_COLORS.accent, pct: 10 },
            ].map((tier) => (
              <motion.div
                key={tier.plan}
                whileHover={{ x: 3, transition: { duration: 0.15 } }}
                className="rounded-xl bg-white/3 border border-[#2A2A45] p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: tier.color }} />
                    <span className="text-sm font-semibold text-white">{tier.plan}</span>
                  </div>
                  <span className="text-xs text-[#64748B]">{tier.count} customers</span>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-xl font-bold text-white">{formatCurrency(tier.revenue)}</p>
                  <span className="text-xs font-medium" style={{ color: tier.color }}>{tier.pct}% of MRR</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-[#2A2A45] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${tier.pct}%`, background: tier.color }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Transactions Table ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl bg-[#0F0F1A] border border-[#2A2A45] overflow-hidden"
        >
          {/* Table Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-6 border-b border-[#2A2A45]">
            <div>
              <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
              <p className="text-sm text-[#64748B] mt-0.5">Latest billing events across all customers</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  value={txSearch}
                  onChange={(e) => setTxSearch(e.target.value)}
                  placeholder="Search customer…"
                  className="pl-8 pr-3 py-2 rounded-lg bg-white/5 border border-[#2A2A45] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all w-44"
                />
                <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#64748B]" />
              </div>
              {/* Plan filter */}
              <select
                value={txFilter}
                onChange={(e) => setTxFilter(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white/5 border border-[#2A2A45] text-sm text-[#94A3B8] focus:outline-none focus:border-indigo-500/50 transition-all cursor-pointer"
              >
                <option value="all">All Plans</option>
                <option value="Starter">Starter</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2A2A45]">
                  {["Transaction ID", "Customer", "Plan", "Amount", "Date", "Status"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(filteredTx ?? []).map((tx, i) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="border-b border-[#2A2A45]/50 hover:bg-white/2 transition-colors group"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-[#94A3B8] group-hover:text-indigo-300 transition-colors">
                      {tx.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-300">
                          {(tx.customer ?? "?").charAt(0)}
                        </div>
                        <span className="font-medium text-white">{tx.customer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${planColors[tx.plan] ?? "bg-white/5 text-white border-white/10"}`}
                      >
                        {tx.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      ${(tx.amount ?? 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-[#94A3B8]">{tx.date}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${statusColors[tx.status] ?? "bg-white/5 text-white border-white/10"}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {tx.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
                {filteredTx.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#64748B] text-sm">
                      No transactions match your filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-[#2A2A45] flex items-center justify-between">
            <p className="text-xs text-[#64748B]">
              Showing {filteredTx.length} of {transactions.length} transactions
            </p>
            <div className="flex items-center gap-1">
              {["1", "2", "3"].map((p, i) => (
                <button
                  key={p}
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${
                    i === 0
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                      : "text-[#64748B] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}