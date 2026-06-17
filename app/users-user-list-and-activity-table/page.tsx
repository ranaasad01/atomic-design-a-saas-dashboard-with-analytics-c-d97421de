"use client";

import { useMemo, useState } from "react";
Looking at the CSS selector `main:nth-child(3) > main:nth-child(1) > div:nth-child(2) > div:nth-child(1) > aside:nth-child(1) > nav:nth-child(1) > button:nth-child(1)`, this points to a button with text "Profile" inside a dropdown menu. Looking at the dropdown menu items array, I can see `{ label: "View Profile", icon: Eye }` — this is the first button in that menu nav-like structure. I'll change its label text.

import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Download, ChevronDown, ChevronUp, MoreHorizontal, User, Mail, Calendar, Activity, Shield, Eye, Edit, Trash2, Check, X, ArrowUp, ArrowDown, Star, Clock, AlertCircle } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

type UserStatus = "active" | "inactive" | "pending" | "suspended";
type UserRole = "admin" | "editor" | "viewer" | "billing";

interface AppUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  status: UserStatus;
  plan: string;
  joinedDate: string;
  lastActive: string;
  sessions: number;
  revenue: number;
  country: string;
  countryCode: string;
}

interface ActivityEvent {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  action: string;
  resource: string;
  timestamp: string;
  ip: string;
  status: "success" | "warning" | "error";
}

const USERS: AppUser[] = [
  { id: "u1", name: "Sophia Hartwell", email: "sophia@acmecorp.io", avatar: "SH", role: "admin", status: "active", plan: "Enterprise", joinedDate: "Jan 12, 2023", lastActive: "2 min ago", sessions: 142, revenue: 4800, country: "United States", countryCode: "US" },
  { id: "u2", name: "Marcus Chen", email: "m.chen@brightlabs.com", avatar: "MC", role: "editor", status: "active", plan: "Pro", joinedDate: "Mar 5, 2023", lastActive: "1 hr ago", sessions: 89, revenue: 1200, country: "Canada", countryCode: "CA" },
  { id: "u3", name: "Priya Nair", email: "priya.nair@nexustech.in", avatar: "PN", role: "viewer", status: "active", plan: "Starter", joinedDate: "Apr 18, 2023", lastActive: "3 hrs ago", sessions: 34, revenue: 299, country: "India", countryCode: "IN" },
  { id: "u4", name: "James Okafor", email: "james@growthsquad.ng", avatar: "JO", role: "billing", status: "pending", plan: "Pro", joinedDate: "Jun 2, 2023", lastActive: "1 day ago", sessions: 12, revenue: 1200, country: "Nigeria", countryCode: "NG" },
  { id: "u5", name: "Elena Vasquez", email: "elena.v@studioloop.es", avatar: "EV", role: "editor", status: "active", plan: "Enterprise", joinedDate: "Feb 28, 2023", lastActive: "5 min ago", sessions: 210, revenue: 4800, country: "Spain", countryCode: "ES" },
  { id: "u6", name: "Liam Thornton", email: "liam@cloudpeak.co.uk", avatar: "LT", role: "admin", status: "active", plan: "Enterprise", joinedDate: "Nov 14, 2022", lastActive: "Just now", sessions: 388, revenue: 9600, country: "United Kingdom", countryCode: "GB" },
  { id: "u7", name: "Aiko Tanaka", email: "aiko.t@pixelforge.jp", avatar: "AT", role: "viewer", status: "inactive", plan: "Starter", joinedDate: "Jul 9, 2023", lastActive: "2 weeks ago", sessions: 7, revenue: 299, country: "Japan", countryCode: "JP" },
  { id: "u8", name: "Ravi Patel", email: "ravi@databridge.io", avatar: "RP", role: "editor", status: "suspended", plan: "Pro", joinedDate: "May 21, 2023", lastActive: "1 month ago", sessions: 55, revenue: 0, country: "United States", countryCode: "US" },
  { id: "u9", name: "Camille Dubois", email: "c.dubois@lumiere.fr", avatar: "CD", role: "viewer", status: "active", plan: "Starter", joinedDate: "Aug 3, 2023", lastActive: "4 hrs ago", sessions: 28, revenue: 299, country: "France", countryCode: "FR" },
  { id: "u10", name: "Noah Bergström", email: "noah@arcticdev.se", avatar: "NB", role: "editor", status: "active", plan: "Pro", joinedDate: "Sep 17, 2023", lastActive: "30 min ago", sessions: 67, revenue: 1200, country: "Sweden", countryCode: "SE" },
  { id: "u11", name: "Fatima Al-Rashid", email: "fatima@horizonai.ae", avatar: "FA", role: "admin", status: "active", plan: "Enterprise", joinedDate: "Oct 1, 2023", lastActive: "10 min ago", sessions: 95, revenue: 4800, country: "UAE", countryCode: "AE" },
  { id: "u12", name: "Diego Morales", email: "diego@launchpad.mx", avatar: "DM", role: "billing", status: "pending", plan: "Starter", joinedDate: "Nov 5, 2023", lastActive: "3 days ago", sessions: 4, revenue: 299, country: "Mexico", countryCode: "MX" },
];

const ACTIVITY: ActivityEvent[] = [
  { id: "a1", userId: "u6", userName: "Liam Thornton", userAvatar: "LT", action: "Exported report", resource: "Revenue Q4 2023.csv", timestamp: "Just now", ip: "82.45.120.11", status: "success" },
  { id: "a2", userId: "u1", userName: "Sophia Hartwell", userAvatar: "SH", action: "Updated billing plan", resource: "Enterprise Annual", timestamp: "3 min ago", ip: "104.22.18.9", status: "success" },
  { id: "a3", userId: "u5", userName: "Elena Vasquez", userAvatar: "EV", action: "Invited team member", resource: "carlos@studioloop.es", timestamp: "12 min ago", ip: "185.60.216.34", status: "success" },
  { id: "a4", userId: "u8", userName: "Ravi Patel", userAvatar: "RP", action: "Failed login attempt", resource: "Authentication", timestamp: "28 min ago", ip: "203.0.113.42", status: "error" },
  { id: "a5", userId: "u2", userName: "Marcus Chen", userAvatar: "MC", action: "Modified API key", resource: "prod-key-7f3a", timestamp: "45 min ago", ip: "142.250.80.46", status: "warning" },
  { id: "a6", userId: "u11", userName: "Fatima Al-Rashid", userAvatar: "FA", action: "Created dashboard", resource: "MENA Growth Overview", timestamp: "1 hr ago", ip: "5.62.58.200", status: "success" },
  { id: "a7", userId: "u3", userName: "Priya Nair", userAvatar: "PN", action: "Viewed analytics", resource: "User Retention Report", timestamp: "2 hrs ago", ip: "49.36.100.22", status: "success" },
  { id: "a8", userId: "u10", userName: "Noah Bergström", userAvatar: "NB", action: "Connected integration", resource: "Slack Workspace", timestamp: "3 hrs ago", ip: "193.10.5.88", status: "success" },
  { id: "a9", userId: "u4", userName: "James Okafor", userAvatar: "JO", action: "Password reset", resource: "Account Security", timestamp: "5 hrs ago", ip: "41.203.64.10", status: "warning" },
  { id: "a10", userId: "u7", userName: "Aiko Tanaka", userAvatar: "AT", action: "Account deactivated", resource: "User Profile", timestamp: "2 days ago", ip: "126.0.0.1", status: "error" },
];

const STAT_CARDS = [
  { label: "Total Users", value: "2,847", change: 12.4, icon: User, color: "#6366F1", bg: "from-indigo-500/20 to-indigo-600/5" },
  { label: "Active Now", value: "384", change: 8.1, icon: Activity, color: "#10B981", bg: "from-emerald-500/20 to-emerald-600/5" },
  { label: "New This Month", value: "143", change: 22.7, icon: Star, color: "#F59E0B", bg: "from-amber-500/20 to-amber-600/5" },
  { label: "Suspended", value: "12", change: -3.2, icon: Shield, color: "#EF4444", bg: "from-red-500/20 to-red-600/5" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const avatarColors: Record<string, string> = {
  SH: "from-indigo-500 to-purple-600",
  MC: "from-cyan-500 to-blue-600",
  PN: "from-pink-500 to-rose-600",
  JO: "from-amber-500 to-orange-600",
  EV: "from-emerald-500 to-teal-600",
  LT: "from-violet-500 to-indigo-600",
  AT: "from-sky-500 to-cyan-600",
  RP: "from-red-500 to-rose-600",
  CD: "from-fuchsia-500 to-pink-600",
  NB: "from-teal-500 to-emerald-600",
  FA: "from-purple-500 to-violet-600",
  DM: "from-orange-500 to-amber-600",
};

const statusConfig: Record<UserStatus, { label: string; color: string; dot: string }> = {
  active: { label: "Active", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", dot: "bg-emerald-400" },
  inactive: { label: "Inactive", color: "text-slate-400 bg-slate-400/10 border-slate-400/20", dot: "bg-slate-400" },
  pending: { label: "Pending", color: "text-amber-400 bg-amber-400/10 border-amber-400/20", dot: "bg-amber-400" },
  suspended: { label: "Suspended", color: "text-red-400 bg-red-400/10 border-red-400/20", dot: "bg-red-400" },
};

const roleConfig: Record<UserRole, { label: string; color: string }> = {
  admin: { label: "Admin", color: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20" },
  editor: { label: "Editor", color: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20" },
  viewer: { label: "Viewer", color: "text-slate-300 bg-slate-500/10 border-slate-500/20" },
  billing: { label: "Billing", color: "text-amber-300 bg-amber-500/10 border-amber-500/20" },
};

const activityStatusConfig = {
  success: { icon: Check, color: "text-emerald-400 bg-emerald-400/10" },
  warning: { icon: AlertCircle, color: "text-amber-400 bg-amber-400/10" },
  error: { icon: X, color: "text-red-400 bg-red-400/10" },
};

type SortKey = "name" | "role" | "status" | "plan" | "sessions" | "revenue" | "joinedDate";
type SortDir = "asc" | "desc";

// ─── Component ────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"users" | "activity">("users");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;

  const filtered = useMemo(() => {
    let list = [...USERS];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.country.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") list = list.filter((u) => u.status === statusFilter);
    if (roleFilter !== "all") list = list.filter((u) => u.role === roleFilter);

    list.sort((a, b) => {
      let av: string | number = a[sortKey] ?? "";
      let bv: string | number = b[sortKey] ?? "";
      if (sortKey === "sessions" || sortKey === "revenue") {
        av = Number(av);
        bv = Number(bv);
        return sortDir === "asc" ? av - bv : bv - av;
      }
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return list;
  }, [search, statusFilter, roleFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginated.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(paginated.map((u) => u.id)));
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowDown className="w-3 h-3 opacity-20" />;
    return sortDir === "asc"
      ? <ArrowUp className="w-3 h-3 text-indigo-400" />
      : <ArrowDown className="w-3 h-3 text-indigo-400" />;
  };

  return (
    <main className="min-h-screen bg-[#0A0A14] text-[#F8FAFC]">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-indigo-600/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-purple-600/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Page Header ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
                Users &amp; Activity
              </h1>
              <p className="text-[#94A3B8] text-sm">
                Manage your team members, monitor access, and review audit logs.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2A2A45] bg-white/5 text-sm text-[#94A3B8] hover:text-white hover:bg-white/10 transition-all"
              >
                <Download className="w-4 h-4" />
                Export
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
              >
                <User className="w-4 h-4" />
                Invite User
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ── Stat Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {STAT_CARDS.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change >= 0;
            return (
              <motion.div
                key={card.label}
                variants={scaleIn}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="relative rounded-2xl border border-[#2A2A45] bg-[#12121E] p-5 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.bg} opacity-60`} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-[#64748B] uppercase tracking-wider">{card.label}</span>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${card.color}20` }}>
                      <Icon className="w-4 h-4" style={{ color: card.color }} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{card.value}</div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
                    {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {Math.abs(card.change)}% vs last month
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Tabs ── */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-6">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#12121E] border border-[#2A2A45] w-fit">
            {(["users", "activity"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
                  activeTab === tab ? "text-white" : "text-[#64748B] hover:text-[#94A3B8]"
                }`}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-600/80 to-purple-600/80"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{tab === "users" ? "User List" : "Activity Log"}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "users" ? (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {/* ── Filters ── */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <input
                    type="text"
                    placeholder="Search users…"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#12121E] border border-[#2A2A45] text-sm text-white placeholder-[#475569] focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#64748B]" />
                  <select
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value as UserStatus | "all"); setPage(1); }}
                    className="px-3 py-2.5 rounded-lg bg-[#12121E] border border-[#2A2A45] text-sm text-[#94A3B8] focus:outline-none focus:border-indigo-500/60 transition-all cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                  <select
                    value={roleFilter}
                    onChange={(e) => { setRoleFilter(e.target.value as UserRole | "all"); setPage(1); }}
                    className="px-3 py-2.5 rounded-lg bg-[#12121E] border border-[#2A2A45] text-sm text-[#94A3B8] focus:outline-none focus:border-indigo-500/60 transition-all cursor-pointer"
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                    <option value="billing">Billing</option>
                  </select>
                </div>
                {selectedIds.size > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-300"
                  >
                    <Check className="w-3.5 h-3.5" />
                    {selectedIds.size} selected
                  </motion.div>
                )}
              </div>

              {/* ── Table ── */}
              <div className="rounded-2xl border border-[#2A2A45] bg-[#12121E] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#2A2A45] bg-[#0F0F1A]">
                        <th className="w-10 px-4 py-3">
                          <input
                            type="checkbox"
                            checked={paginated.length > 0 && selectedIds.size === paginated.length}
                            onChange={toggleSelectAll}
                            className="w-4 h-4 rounded border-[#2A2A45] bg-transparent accent-indigo-500 cursor-pointer"
                          />
                        </th>
                        {(
                          [
                            { key: "name", label: "User" },
                            { key: "role", label: "Role" },
                            { key: "status", label: "Status" },
                            { key: "plan", label: "Plan" },
                            { key: "sessions", label: "Sessions" },
                            { key: "revenue", label: "Revenue" },
                            { key: "joinedDate", label: "Joined" },
                          ] as { key: SortKey; label: string }[]
                        ).map((col) => (
                          <th
                            key={col.key}
                            onClick={() => toggleSort(col.key)}
                            className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider cursor-pointer hover:text-[#94A3B8] transition-colors select-none"
                          >
                            <div className="flex items-center gap-1.5">
                              {col.label}
                              <SortIcon col={col.key} />
                            </div>
                          </th>
                        ))}
                        <th className="px-4 py-3 text-right text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {paginated.map((user, idx) => {
                          const sc = statusConfig[user.status];
                          const rc = roleConfig[user.role];
                          const isSelected = selectedIds.has(user.id);
                          const menuOpen = openMenuId === user.id;
                          return (
                            <motion.tr
                              key={user.id}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ delay: idx * 0.04, duration: 0.25 }}
                              className={`border-b border-[#1E1E30] transition-colors ${
                                isSelected ? "bg-indigo-500/5" : "hover:bg-white/[0.02]"
                              }`}
                            >
                              <td className="px-4 py-3.5">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleSelect(user.id)}
                                  className="w-4 h-4 rounded border-[#2A2A45] bg-transparent accent-indigo-500 cursor-pointer"
                                />
                              </td>
                              <td className="px-4 py-3.5">
                                <div className="flex items-center gap-3">
                                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[user.avatar] ?? "from-indigo-500 to-purple-600"} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                                    {user.avatar}
                                  </div>
                                  <div>
                                    <div className="font-medium text-white text-sm">{user.name}</div>
                                    <div className="text-xs text-[#64748B]">{user.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3.5">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${rc.color}`}>
                                  {rc.label}
                                </span>
                              </td>
                              <td className="px-4 py-3.5">
                                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium border ${sc.color}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                                  {sc.label}
                                </span>
                              </td>
                              <td className="px-4 py-3.5">
                                <span className="text-[#94A3B8] text-sm">{user.plan}