"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Users, UserCheck, UserX, ChevronUp, ChevronDown, ArrowUpDown, Filter, Download, Eye, MoreHorizontal, TrendingUp } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_USERS = [
  { id: 1, name: "Sophia Hartwell", email: "sophia.hartwell@acme.io", plan: "Enterprise", status: "Active", joined: "2023-01-14", lastActive: "2024-06-10", avatar: "SH", avatarColor: "#6366F1" },
  { id: 2, name: "Marcus Chen", email: "m.chen@brightloop.com", plan: "Pro", status: "Active", joined: "2023-03-22", lastActive: "2024-06-09", avatar: "MC", avatarColor: "#8B5CF6" },
  { id: 3, name: "Priya Nair", email: "priya@nairventures.co", plan: "Starter", status: "Active", joined: "2023-05-07", lastActive: "2024-06-08", avatar: "PN", avatarColor: "#06B6D4" },
  { id: 4, name: "James Okafor", email: "james.okafor@stacklabs.dev", plan: "Pro", status: "Churned", joined: "2023-02-18", lastActive: "2024-04-01", avatar: "JO", avatarColor: "#F59E0B" },
  { id: 5, name: "Elena Vasquez", email: "elena.v@cloudnine.io", plan: "Enterprise", status: "Active", joined: "2022-11-30", lastActive: "2024-06-10", avatar: "EV", avatarColor: "#10B981" },
  { id: 6, name: "Liam Thornton", email: "liam@thorntondigital.com", plan: "Starter", status: "Trial", joined: "2024-05-28", lastActive: "2024-06-07", avatar: "LT", avatarColor: "#EF4444" },
  { id: 7, name: "Aisha Kamara", email: "aisha.kamara@nexusai.co", plan: "Pro", status: "Active", joined: "2023-08-15", lastActive: "2024-06-09", avatar: "AK", avatarColor: "#6366F1" },
  { id: 8, name: "Noah Bergström", email: "noah.b@bergstrom.se", plan: "Enterprise", status: "Active", joined: "2023-04-03", lastActive: "2024-06-10", avatar: "NB", avatarColor: "#8B5CF6" },
  { id: 9, name: "Fatima Al-Rashid", email: "fatima@alrashid.ae", plan: "Pro", status: "Active", joined: "2023-09-20", lastActive: "2024-06-06", avatar: "FA", avatarColor: "#06B6D4" },
  { id: 10, name: "Carlos Mendez", email: "carlos.m@mendeztech.mx", plan: "Starter", status: "Churned", joined: "2023-06-11", lastActive: "2024-03-15", avatar: "CM", avatarColor: "#F59E0B" },
  { id: 11, name: "Yuki Tanaka", email: "yuki.tanaka@pixelcraft.jp", plan: "Pro", status: "Active", joined: "2023-07-29", lastActive: "2024-06-08", avatar: "YT", avatarColor: "#10B981" },
  { id: 12, name: "Isabelle Moreau", email: "i.moreau@moreau-studio.fr", plan: "Enterprise", status: "Active", joined: "2022-12-05", lastActive: "2024-06-10", avatar: "IM", avatarColor: "#EF4444" },
  { id: 13, name: "Kwame Asante", email: "kwame@asanteworks.gh", plan: "Starter", status: "Trial", joined: "2024-06-01", lastActive: "2024-06-09", avatar: "KA", avatarColor: "#6366F1" },
  { id: 14, name: "Olivia Sinclair", email: "olivia.s@sinclair.co.uk", plan: "Pro", status: "Active", joined: "2023-10-14", lastActive: "2024-06-07", avatar: "OS", avatarColor: "#8B5CF6" },
  { id: 15, name: "Ravi Patel", email: "ravi.patel@patelsaas.in", plan: "Enterprise", status: "Active", joined: "2023-01-28", lastActive: "2024-06-10", avatar: "RP", avatarColor: "#06B6D4" },
  { id: 16, name: "Mia Johansson", email: "mia.j@johansson.se", plan: "Starter", status: "Active", joined: "2024-02-17", lastActive: "2024-06-05", avatar: "MJ", avatarColor: "#F59E0B" },
  { id: 17, name: "Ethan Blackwood", email: "ethan@blackwoodlabs.com", plan: "Pro", status: "Churned", joined: "2023-03-09", lastActive: "2024-02-28", avatar: "EB", avatarColor: "#10B981" },
  { id: 18, name: "Zara Osei", email: "zara.osei@oseigroup.com", plan: "Enterprise", status: "Active", joined: "2023-05-22", lastActive: "2024-06-09", avatar: "ZO", avatarColor: "#EF4444" },
  { id: 19, name: "Lucas Ferreira", email: "lucas.f@ferreira.com.br", plan: "Pro", status: "Active", joined: "2023-11-03", lastActive: "2024-06-08", avatar: "LF", avatarColor: "#6366F1" },
  { id: 20, name: "Amara Diallo", email: "amara.d@diallotech.sn", plan: "Starter", status: "Trial", joined: "2024-05-10", lastActive: "2024-06-06", avatar: "AD", avatarColor: "#8B5CF6" },
];

const SIGNUP_TREND = [
  { month: "Jan", signups: 42 },
  { month: "Feb", signups: 58 },
  { month: "Mar", signups: 71 },
  { month: "Apr", signups: 65 },
  { month: "May", signups: 89 },
  { month: "Jun", signups: 104 },
  { month: "Jul", signups: 97 },
  { month: "Aug", signups: 118 },
  { month: "Sep", signups: 132 },
  { month: "Oct", signups: 145 },
  { month: "Nov", signups: 161 },
  { month: "Dec", signups: 178 },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type User = typeof MOCK_USERS[number];
type SortKey = "name" | "plan" | "status" | "joined" | "lastActive";
type SortDir = "asc" | "desc";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
  Churned: "bg-red-500/15 text-red-400 border border-red-500/25",
  Trial: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
};

const PLAN_STYLES: Record<string, string> = {
  Enterprise: "bg-indigo-500/15 text-indigo-300 border border-indigo-500/25",
  Pro: "bg-purple-500/15 text-purple-300 border border-purple-500/25",
  Starter: "bg-slate-500/15 text-slate-300 border border-slate-500/25",
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function relativeTime(dateStr: string): string {
  const now = new Date("2024-06-10");
  const then = new Date(dateStr);
  const diffDays = Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  sub: string;
}

function StatCard({ label, value, icon, color, sub }: StatCardProps) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="relative rounded-2xl border border-[#2A2A45] bg-[#16162A] p-5 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ background: `radial-gradient(circle at 80% 20%, ${color}, transparent 70%)` }}
      />
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}20`, border: `1px solid ${color}30` }}
        >
          <span style={{ color }}>{icon}</span>
        </div>
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value.toLocaleString()}</p>
      <p className="text-sm font-medium text-[#94A3B8]">{label}</p>
      <p className="text-xs text-[#64748B] mt-1">{sub}</p>
    </motion.div>
  );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1E1E2E] border border-[#2A2A45] rounded-xl px-3 py-2 shadow-xl">
      <p className="text-xs text-[#94A3B8] mb-1">{label}</p>
      <p className="text-sm font-bold text-white">{(payload[0]?.value ?? 0)} signups</p>
    </div>
  );
}

// ─── Sort Icon ────────────────────────────────────────────────────────────────

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ArrowUpDown className="w-3.5 h-3.5 text-[#475569]" />;
  return sortDir === "asc"
    ? <ChevronUp className="w-3.5 h-3.5 text-indigo-400" />
    : <ChevronDown className="w-3.5 h-3.5 text-indigo-400" />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("joined");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const totalUsers = MOCK_USERS.length;
  const activeUsers = MOCK_USERS.filter((u) => u.status === "Active").length;
  const churnedUsers = MOCK_USERS.filter((u) => u.status === "Churned").length;
  const trialUsers = MOCK_USERS.filter((u) => u.status === "Trial").length;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filtered = useMemo(() => {
    let rows = [...MOCK_USERS];
    const q = search.toLowerCase();
    if (q) {
      rows = rows.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "All") rows = rows.filter((u) => u.status === statusFilter);
    if (planFilter !== "All") rows = rows.filter((u) => u.plan === planFilter);
    rows.sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      const cmp = String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [search, statusFilter, planFilter, sortKey, sortDir]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((u) => u.id)));
    }
  };

  const allSelected = filtered.length > 0 && selectedIds.size === filtered.length;

  return (
    <main className="min-h-screen bg-[#0F0F1A] text-white">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-indigo-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Header ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                User Management
              </h1>
              <p className="text-[#94A3B8] mt-1 text-sm">
                Monitor, filter, and manage all {totalUsers} registered users across your platform.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </motion.button>
          </div>
        </motion.div>

        {/* ── Stat Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <StatCard
            label="Total Users"
            value={totalUsers}
            icon={<Users className="w-5 h-5" />}
            color={BRAND_COLORS.primary}
            sub="All registered accounts"
          />
          <StatCard
            label="Active Users"
            value={activeUsers}
            icon={<UserCheck className="w-5 h-5" />}
            color={BRAND_COLORS.success}
            sub={`${Math.round((activeUsers / totalUsers) * 100)}% of total`}
          />
          <StatCard
            label="Churned Users"
            value={churnedUsers}
            icon={<UserX className="w-5 h-5" />}
            color={BRAND_COLORS.danger}
            sub={`${Math.round((churnedUsers / totalUsers) * 100)}% churn rate`}
          />
          <StatCard
            label="Trial Users"
            value={trialUsers}
            icon={<TrendingUp className="w-5 h-5" />}
            color={BRAND_COLORS.warning}
            sub="Conversion opportunity"
          />
        </motion.div>

        {/* ── Signup Trend Chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl border border-[#2A2A45] bg-[#16162A] p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
            <div>
              <h2 className="text-base font-semibold text-white">Signup Trend</h2>
              <p className="text-xs text-[#64748B] mt-0.5">Monthly new user registrations — 2024</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              +23% vs last year
            </div>
          </div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SIGNUP_TREND} barSize={18}>
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.06)" }} />
                <Bar
                  dataKey="signups"
                  fill={BRAND_COLORS.primary}
                  radius={[4, 4, 0, 0]}
                  opacity={0.85}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ── Filters & Search ── */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-3 mb-5"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search by name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#16162A] border border-[#2A2A45] text-sm text-white placeholder-[#475569] focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#64748B]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2.5 rounded-xl bg-[#16162A] border border-[#2A2A45] text-sm text-white focus:outline-none focus:border-indigo-500/60 appearance-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Trial">Trial</option>
              <option value="Churned">Churned</option>
            </select>
          </div>

          {/* Plan filter */}
          <div className="relative">
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-[#16162A] border border-[#2A2A45] text-sm text-white focus:outline-none focus:border-indigo-500/60 appearance-none cursor-pointer"
            >
              <option value="All">All Plans</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Pro">Pro</option>
              <option value="Starter">Starter</option>
            </select>
          </div>
        </motion.div>

        {/* ── Results count ── */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-[#64748B]">
            Showing <span className="text-white font-medium">{filtered.length}</span> of{" "}
            <span className="text-white font-medium">{totalUsers}</span> users
            {selectedIds.size > 0 && (
              <span className="ml-2 text-indigo-400">· {selectedIds.size} selected</span>
            )}
          </p>
        </div>

        {/* ── Table ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="rounded-2xl border border-[#2A2A45] bg-[#16162A] overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2A2A45] bg-[#1E1E2E]/60">
                  <th className="px-4 py-3.5 text-left w-10">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="w-4 h-4 rounded border-[#2A2A45] bg-[#16162A] accent-indigo-500 cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-3.5 text-left">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider hover:text-white transition-colors"
                    >
                      User <SortIcon col="name" sortKey={sortKey} sortDir={sortDir} />
                    </button>
                  </th>
                  <th className="px-4 py-3.5 text-left hidden md:table-cell">
                    <button
                      onClick={() => handleSort("plan")}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider hover:text-white transition-colors"
                    >
                      Plan <SortIcon col="plan" sortKey={sortKey} sortDir={sortDir} />
                    </button>
                  </th>
                  <th className="px-4 py-3.5 text-left">
                    <button
                      onClick={() => handleSort("status")}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider hover:text-white transition-colors"
                    >
                      Status <SortIcon col="status" sortKey={sortKey} sortDir={sortDir} />
                    </button>
                  </th>
                  <th className="px-4 py-3.5 text-left hidden lg:table-cell">
                    <button
                      onClick={() => handleSort("joined")}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider hover:text-white transition-colors"
                    >
                      Joined <SortIcon col="joined" sortKey={sortKey} sortDir={sortDir} />
                    </button>
                  </th>
                  <th className="px-4 py-3.5 text-left hidden lg:table-cell">
                    <button
                      onClick={() => handleSort("lastActive")}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider hover:text-white transition-colors"
                    >
                      Last Active <SortIcon col="lastActive" sortKey={sortKey} sortDir={sortDir} />
                    </button>
                  </th>
                  <th className="px-4 py-3.5 text-right text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <motion.tbody
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center text-[#64748B]">
                      <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No users match your filters.</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((user, idx) => (
                    <motion.tr
                      key={user.id}
                      variants={fadeInUp}
                      custom={idx}
                      whileHover={{ backgroundColor: "rgba(99,102,241,0.04)" }}
                      className={`border-b border-[#2A2A45]/60 last:border-0 transition-colors ${
                        selectedIds.has(user.id) ? "bg-indigo-500/5" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-3.5">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(user.id)}
                          onChange={() => toggleSelect(user.id)}
                          className="w-4 h-4 rounded border-[#2A2A45] bg-[#16162A] accent-indigo-500 cursor-pointer"
                        />
                      </td>

                      {/* User */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style={{ background: `${user.avatarColor}30`, border: `1.5px solid ${user.avatarColor}50`, color: user.avatarColor }}
                          >
                            {user.avatar}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-white truncate">{user.name}</p>
                            <p className="text-xs text-[#64748B] truncate">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Plan */}
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${PLAN_STYLES[user.plan] ?? ""}`}>
                          {user.plan}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${STATUS_STYLES[user.status] ?? ""}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {user.status}
                        </span>
                      </td>

                      {/* Joined */}
                      <td className="px-4 py-3.5 hidden lg:table-cell text-[#94A3B8] text-xs">
                        {formatDate(user.joined)}
                      </td>

                      {/* Last Active */}
                      <td className="px-4 py-3.5 hidden lg:table-cell">
                        <span className="text-xs text-[#94A3B8]">{relativeTime(user.lastActive)}</span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
                            aria-label={`View ${user.name}`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:text-white hover:bg-white/5 transition-all"
                            aria-label={`More options for ${user.name}`}
                          >
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </motion.tbody>
            </table>
          </div>

          {/* Table footer */}
          <div className="px-4 py-3 border-t border-[#2A2A45] bg-[#1E1E2E]/40 flex items-center justify-between">
            <p className="text-xs text-[#64748B]">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#64748B]">
              <span>Rows per page: 20</span>
              <span className="text-[#2A2A45]">|</span>
              <span>Page 1 of 1</span>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}