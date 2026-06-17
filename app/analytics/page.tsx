"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";
import { TrendingUp, TrendingDown, Users, Activity, DollarSign, ArrowUpRight, ArrowDownRight, Calendar, BarChart2, Eye, RefreshCw } from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const ALL_DATA = [
  { month: "Jan", week: "W1", day: "D1", activeUsers: 8200, prevActiveUsers: 7100, revenue: 38000, prevRevenue: 32000, sessions: 24100, bounceRate: 42.1, avgSession: 3.2 },
  { month: "Feb", week: "W2", day: "D2", activeUsers: 9100, prevActiveUsers: 7800, revenue: 41000, prevRevenue: 35000, sessions: 26800, bounceRate: 40.5, avgSession: 3.5 },
  { month: "Mar", week: "W3", day: "D3", activeUsers: 10400, prevActiveUsers: 8500, revenue: 44500, prevRevenue: 37500, sessions: 29200, bounceRate: 39.8, avgSession: 3.7 },
  { month: "Apr", week: "W4", day: "D4", activeUsers: 11200, prevActiveUsers: 9200, revenue: 47000, prevRevenue: 40000, sessions: 31500, bounceRate: 38.2, avgSession: 3.9 },
  { month: "May", week: "W5", day: "D5", activeUsers: 12800, prevActiveUsers: 10100, revenue: 51000, prevRevenue: 43000, sessions: 34800, bounceRate: 37.1, avgSession: 4.1 },
  { month: "Jun", week: "W6", day: "D6", activeUsers: 13500, prevActiveUsers: 11000, revenue: 54500, prevRevenue: 46000, sessions: 37200, bounceRate: 36.4, avgSession: 4.3 },
  { month: "Jul", week: "W7", day: "D7", activeUsers: 14200, prevActiveUsers: 11800, revenue: 57000, prevRevenue: 48500, sessions: 39100, bounceRate: 35.9, avgSession: 4.4 },
  { month: "Aug", week: "W8", day: "D8", activeUsers: 15100, prevActiveUsers: 12500, revenue: 60000, prevRevenue: 51000, sessions: 41500, bounceRate: 35.2, avgSession: 4.6 },
  { month: "Sep", week: "W9", day: "D9", activeUsers: 16400, prevActiveUsers: 13200, revenue: 63500, prevRevenue: 53500, sessions: 44200, bounceRate: 34.7, avgSession: 4.8 },
  { month: "Oct", week: "W10", day: "D10", activeUsers: 17200, prevActiveUsers: 14100, revenue: 67000, prevRevenue: 56000, sessions: 46800, bounceRate: 34.1, avgSession: 5.0 },
  { month: "Nov", week: "W11", day: "D11", activeUsers: 18500, prevActiveUsers: 15000, revenue: 71000, prevRevenue: 59000, sessions: 49500, bounceRate: 33.5, avgSession: 5.2 },
  { month: "Dec", week: "W12", day: "D12", activeUsers: 20100, prevActiveUsers: 16200, revenue: 76000, prevRevenue: 62500, sessions: 53200, bounceRate: 32.8, avgSession: 5.5 },
];

const DATA_SLICES: Record<string, typeof ALL_DATA> = {
  "7d": ALL_DATA.slice(0, 3),
  "30d": ALL_DATA.slice(0, 5),
  "90d": ALL_DATA.slice(0, 8),
  "1y": ALL_DATA,
};

const RANGE_LABELS: Record<string, string> = {
  "7d": "Last 7 Days",
  "30d": "Last 30 Days",
  "90d": "Last 90 Days",
  "1y": "Last 12 Months",
};

const TOP_PAGES = [
  { path: "/dashboard", views: 48200, change: 12.4, bounce: 28.1 },
  { path: "/analytics", views: 31500, change: 8.7, bounce: 31.4 },
  { path: "/revenue", views: 24800, change: 15.2, bounce: 25.9 },
  { path: "/users", views: 19200, change: -3.1, bounce: 38.2 },
  { path: "/settings", views: 12400, change: 5.8, bounce: 42.7 },
  { path: "/onboarding", views: 9800, change: 22.3, bounce: 19.4 },
];

const TRAFFIC_SOURCES = [
  { source: "Organic Search", sessions: 18400, pct: 34.6, color: BRAND_COLORS.primary },
  { source: "Direct", sessions: 12800, pct: 24.1, color: BRAND_COLORS.secondary },
  { source: "Referral", sessions: 9200, pct: 17.3, color: BRAND_COLORS.accent },
  { source: "Social Media", sessions: 7600, pct: 14.3, color: BRAND_COLORS.success },
  { source: "Email", sessions: 5200, pct: 9.7, color: BRAND_COLORS.warning },
];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1E1E2E] border border-[#2A2A45] rounded-xl p-3 shadow-xl shadow-black/40 min-w-[160px]">
      <p className="text-xs font-semibold text-[#94A3B8] mb-2">{label ?? ""}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-xs text-[#94A3B8]">{entry.name}</span>
          </div>
          <span className="text-xs font-bold text-white">
            {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function RevenueTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1E1E2E] border border-[#2A2A45] rounded-xl p-3 shadow-xl shadow-black/40 min-w-[180px]">
      <p className="text-xs font-semibold text-[#94A3B8] mb-2">{label ?? ""}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-xs text-[#94A3B8]">{entry.name}</span>
          </div>
          <span className="text-xs font-bold text-white">
            ${typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  suffix?: string;
}

function StatCard({ label, value, change, icon, color, suffix }: StatCardProps) {
  const isPositive = change >= 0;
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="bg-[#16162A] border border-[#2A2A45] rounded-2xl p-5 flex flex-col gap-3 hover:border-indigo-500/30 transition-colors"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">{label}</span>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}18` }}
        >
          <span style={{ color }}>{icon}</span>
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-white tracking-tight">
          {value}
          {suffix && <span className="text-base font-medium text-[#64748B] ml-1">{suffix}</span>}
        </p>
      </div>
      <div className="flex items-center gap-1.5">
        {isPositive ? (
          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />
        )}
        <span className={`text-xs font-semibold ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
          {isPositive ? "+" : ""}{(change ?? 0).toFixed(1)}%
        </span>
        <span className="text-xs text-[#475569]">vs prev period</span>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [range, setRange] = useState<"7d" | "30d" | "90d" | "1y">("90d");

  const data = useMemo(() => DATA_SLICES[range] ?? ALL_DATA, [range]);

  const totalActiveUsers = useMemo(() => data.reduce((s, d) => s + (d.activeUsers ?? 0), 0), [data]);
  const totalRevenue = useMemo(() => data.reduce((s, d) => s + (d.revenue ?? 0), 0), [data]);
  const totalSessions = useMemo(() => data.reduce((s, d) => s + (d.sessions ?? 0), 0), [data]);
  const avgBounce = useMemo(() => {
    if (data.length === 0) return 0;
    return data.reduce((s, d) => s + (d.bounceRate ?? 0), 0) / data.length;
  }, [data]);

  const prevTotalActiveUsers = useMemo(() => data.reduce((s, d) => s + (d.prevActiveUsers ?? 0), 0), [data]);
  const prevTotalRevenue = useMemo(() => data.reduce((s, d) => s + (d.prevRevenue ?? 0), 0), [data]);

  const userChange = prevTotalActiveUsers > 0 ? ((totalActiveUsers - prevTotalActiveUsers) / prevTotalActiveUsers) * 100 : 0;
  const revenueChange = prevTotalRevenue > 0 ? ((totalRevenue - prevTotalRevenue) / prevTotalRevenue) * 100 : 0;

  const ranges: Array<"7d" | "30d" | "90d" | "1y"> = ["7d", "30d", "90d", "1y"];

  return (
    <main className="min-h-screen bg-[#0F0F1A] text-white">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-indigo-600/6 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ── Page Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <motion.div variants={fadeInUp}>
            <div className="flex items-center gap-2 mb-1">
              <BarChart2 className="w-5 h-5 text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Analytics</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Analytics Deep-Dive</h1>
            <p className="text-sm text-[#64748B] mt-1">
              Detailed breakdown of user behavior, traffic, and revenue performance.
            </p>
          </motion.div>

          {/* Date Range Filter */}
          <motion.div variants={fadeIn} className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#64748B]" />
            <span className="text-xs text-[#64748B] mr-1">{RANGE_LABELS[range]}</span>
            <div className="flex items-center bg-[#16162A] border border-[#2A2A45] rounded-xl p-1 gap-1">
              {ranges.map((r) => (
                <motion.button
                  key={r}
                  onClick={() => setRange(r)}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    range === r
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                      : "text-[#64748B] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {r}
                </motion.button>
              ))}
            </div>
            <motion.button
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.4 }}
              className="w-8 h-8 rounded-lg bg-[#16162A] border border-[#2A2A45] flex items-center justify-center text-[#64748B] hover:text-white hover:border-indigo-500/40 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ── Summary Stats Row ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatCard
            label="Active Users"
            value={totalActiveUsers.toLocaleString()}
            change={userChange}
            icon={<Users className="w-4 h-4" />}
            color={BRAND_COLORS.primary}
          />
          <StatCard
            label="Total Revenue"
            value={`$${(totalRevenue / 1000).toFixed(0)}K`}
            change={revenueChange}
            icon={<DollarSign className="w-4 h-4" />}
            color={BRAND_COLORS.success}
          />
          <StatCard
            label="Total Sessions"
            value={totalSessions.toLocaleString()}
            change={5.8}
            icon={<Activity className="w-4 h-4" />}
            color={BRAND_COLORS.accent}
          />
          <StatCard
            label="Avg Bounce Rate"
            value={avgBounce.toFixed(1)}
            change={-2.3}
            icon={<TrendingDown className="w-4 h-4" />}
            color={BRAND_COLORS.warning}
            suffix="%"
          />
        </motion.div>

        {/* ── Active Users Area Chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-[#16162A] border border-[#2A2A45] rounded-2xl p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-base font-bold text-white">Active Users Trend</h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Current vs previous period — {RANGE_LABELS[range]}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full bg-indigo-400 inline-block" />
                <span className="text-xs text-[#94A3B8]">Current</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full bg-purple-400/50 inline-block" />
                <span className="text-xs text-[#94A3B8]">Previous</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradCurrent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={BRAND_COLORS.primary} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={BRAND_COLORS.primary} stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gradPrev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={BRAND_COLORS.secondary} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={BRAND_COLORS.secondary} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A45" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="prevActiveUsers"
                name="Previous"
                stroke={BRAND_COLORS.secondary}
                strokeWidth={1.5}
                strokeDasharray="4 3"
                fill="url(#gradPrev)"
                dot={false}
                activeDot={{ r: 4, fill: BRAND_COLORS.secondary }}
              />
              <Area
                type="monotone"
                dataKey="activeUsers"
                name="Current"
                stroke={BRAND_COLORS.primary}
                strokeWidth={2.5}
                fill="url(#gradCurrent)"
                dot={false}
                activeDot={{ r: 5, fill: BRAND_COLORS.primary, strokeWidth: 2, stroke: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ── Revenue Multi-Line Chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-[#16162A] border border-[#2A2A45] rounded-2xl p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-base font-bold text-white">Revenue Comparison</h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Current period vs previous period revenue — {RANGE_LABELS[range]}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full bg-emerald-400 inline-block" />
                <span className="text-xs text-[#94A3B8]">Current Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full border-t-2 border-dashed border-emerald-400/40 inline-block" />
                <span className="text-xs text-[#94A3B8]">Previous Revenue</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A45" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`}
                width={48}
              />
              <Tooltip content={<RevenueTooltip />} />
              <Line
                type="monotone"
                dataKey="prevRevenue"
                name="Previous"
                stroke={BRAND_COLORS.success}
                strokeWidth={1.5}
                strokeDasharray="5 4"
                dot={false}
                activeDot={{ r: 4, fill: BRAND_COLORS.success }}
                strokeOpacity={0.45}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                name="Current"
                stroke={BRAND_COLORS.success}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: BRAND_COLORS.success, strokeWidth: 2, stroke: "#fff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ── Bottom Row: Top Pages + Traffic Sources ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Top Pages Table */}
          <motion.div
            variants={fadeInUp}
            className="bg-[#16162A] border border-[#2A2A45] rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-bold text-white">Top Pages</h2>
                <p className="text-xs text-[#64748B] mt-0.5">By pageviews this period</p>
              </div>
              <Eye className="w-4 h-4 text-[#64748B]" />
            </div>
            <div className="space-y-1">
              <div className="grid grid-cols-12 gap-2 px-2 pb-2 border-b border-[#2A2A45]">
                <span className="col-span-5 text-xs font-semibold text-[#475569] uppercase tracking-wider">Page</span>
                <span className="col-span-3 text-xs font-semibold text-[#475569] uppercase tracking-wider text-right">Views</span>
                <span className="col-span-2 text-xs font-semibold text-[#475569] uppercase tracking-wider text-right">Change</span>
                <span className="col-span-2 text-xs font-semibold text-[#475569] uppercase tracking-wider text-right">Bounce</span>
              </div>
              {TOP_PAGES.map((page, i) => (
                <motion.div
                  key={page.path}
                  variants={fadeInUp}
                  whileHover={{ backgroundColor: "rgba(99,102,241,0.05)" }}
                  className="grid grid-cols-12 gap-2 px-2 py-2.5 rounded-lg transition-colors"
                >
                  <div className="col-span-5 flex items-center gap-2">
                    <span className="text-xs font-bold text-[#475569] w-4">{i + 1}</span>
                    <span className="text-xs font-medium text-[#94A3B8] truncate">{page.path}</span>
                  </div>
                  <span className="col-span-3 text-xs font-semibold text-white text-right">
                    {(page.views ?? 0).toLocaleString()}
                  </span>
                  <div className="col-span-2 flex items-center justify-end gap-0.5">
                    {page.change >= 0 ? (
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-400" />
                    )}
                    <span className={`text-xs font-semibold ${page.change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {page.change >= 0 ? "+" : ""}{(page.change ?? 0).toFixed(1)}%
                    </span>
                  </div>
                  <span className="col-span-2 text-xs text-[#64748B] text-right">
                    {(page.bounce ?? 0).toFixed(1)}%
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Traffic Sources */}
          <motion.div
            variants={fadeInUp}
            className="bg-[#16162A] border border-[#2A2A45] rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-bold text-white">Traffic Sources</h2>
                <p className="text-xs text-[#64748B] mt-0.5">Session breakdown by channel</p>
              </div>
              <Activity className="w-4 h-4 text-[#64748B]" />
            </div>
            <div className="space-y-4">
              {TRAFFIC_SOURCES.map((src) => (
                <motion.div
                  key={src.source}
                  variants={fadeInUp}
                  className="space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: src.color }}
                      />
                      <span className="text-sm text-[#94A3B8]">{src.source}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#64748B]">{(src.sessions ?? 0).toLocaleString()} sessions</span>
                      <span className="text-xs font-bold text-white w-10 text-right">{(src.pct ?? 0).toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-[#2A2A45] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${src.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: src.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t border-[#2A2A45] flex items-center justify-between">
              <span className="text-xs text-[#64748B]">Total Sessions</span>
              <span className="text-sm font-bold text-white">
                {TRAFFIC_SOURCES.reduce((s, t) => s + (t.sessions ?? 0), 0).toLocaleString()}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Engagement Metrics Row ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            {
              label: "Avg. Session Duration",
              value: `${(data[data.length - 1]?.avgSession ?? 0).toFixed(1)}m`,
              sub: "per user visit",
              color: BRAND_COLORS.accent,
              change: "+0.4m vs prev",
              positive: true,
            },
            {
              label: "Pages per Session",
              value: "4.8",
              sub: "avg pages visited",
              color: BRAND_COLORS.primary,
              change: "+0.6 vs prev",
              positive: true,
            },
            {
              label: "Return Visitor Rate",
              value: "62.4%",
              sub: "of all sessions",
              color: BRAND_COLORS.success,
              change: "+3.1% vs prev",
              positive: true,
            },
          ].map((metric) => (
            <motion.div
              key={metric.label}
              variants={scaleIn}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-[#16162A] border border-[#2A2A45] rounded-2xl p-5 hover:border-indigo-500/30 transition-colors"
            >
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">{metric.label}</p>
              <p className="text-3xl font-bold text-white mb-1" style={{ color: metric.color }}>
                {metric.value}
              </p>
              <p className="text-xs text-[#475569] mb-3">{metric.sub}</p>
              <div className="flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400">{metric.change}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </main>
  );
}