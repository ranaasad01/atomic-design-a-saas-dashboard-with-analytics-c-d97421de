"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Bell, Lock, Shield, Palette, Globe, CreditCard, Save, Camera, Eye, EyeOff, Check, AlertCircle, Smartphone, Monitor, Moon, Sun, Activity, ChevronRight, Trash2, Plus, X } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  company: string;
  bio: string;
  website: string;
  timezone: string;
  language: string;
}

interface NotificationPrefs {
  emailDigest: boolean;
  revenueAlerts: boolean;
  userMilestones: boolean;
  churnWarnings: boolean;
  weeklyReport: boolean;
  productUpdates: boolean;
  securityAlerts: boolean;
  teamActivity: boolean;
}

interface AppearancePrefs {
  theme: "dark" | "light" | "system";
  accentColor: string;
  compactMode: boolean;
  animationsEnabled: boolean;
  sidebarCollapsed: boolean;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const TIMEZONES = [
  "UTC-08:00 Pacific Time",
  "UTC-07:00 Mountain Time",
  "UTC-06:00 Central Time",
  "UTC-05:00 Eastern Time",
  "UTC+00:00 London",
  "UTC+01:00 Paris / Berlin",
  "UTC+02:00 Cairo / Helsinki",
  "UTC+05:30 Mumbai",
  "UTC+08:00 Singapore / HK",
  "UTC+09:00 Tokyo",
  "UTC+10:00 Sydney",
];

const LANGUAGES = [
  "English (US)",
  "English (UK)",
  "Español",
  "Français",
  "Deutsch",
  "日本語",
  "中文 (简体)",
  "Português",
];

const ACCENT_COLORS = [
  { label: "Indigo", value: "#6366F1" },
  { label: "Purple", value: "#8B5CF6" },
  { label: "Cyan", value: "#06B6D4" },
  { label: "Emerald", value: "#10B981" },
  { label: "Rose", value: "#F43F5E" },
  { label: "Amber", value: "#F59E0B" },
];

const CONNECTED_APPS = [
  { id: "slack", name: "Slack", icon: "💬", connected: true, since: "Mar 2024" },
  { id: "github", name: "GitHub", icon: "🐙", connected: true, since: "Jan 2024" },
  { id: "notion", name: "Notion", icon: "📝", connected: false, since: "" },
  { id: "zapier", name: "Zapier", icon: "⚡", connected: false, since: "" },
];

const ACTIVE_SESSIONS = [
  { id: "s1", device: "MacBook Pro 16"", browser: "Chrome 124", location: "San Francisco, CA", current: true, lastSeen: "Now" },
  { id: "s2", device: "iPhone 15 Pro", browser: "Safari Mobile", location: "San Francisco, CA", current: false, lastSeen: "2h ago" },
  { id: "s3", device: "Windows PC", browser: "Edge 124", location: "New York, NY", current: false, lastSeen: "3 days ago" },
];

// ─── Sidebar tabs ─────────────────────────────────────────────────────────────

const TABS = [
  { id: "profile", label: "Profile of user ", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Lock },
  { id: "integrations", label: "Integrations", icon: Activity },
  { id: "billing", label: "Billing", icon: CreditCard },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ─── Toggle component ─────────────────────────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
        checked ? "bg-indigo-500" : "bg-[#2A2A45]"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-[#16162A] border border-[#2A2A45] rounded-2xl p-6 mb-6"
    >
      <div className="mb-5">
        <h2 className="text-base font-semibold text-white">{title}</h2>
        {description && <p className="text-sm text-[#64748B] mt-0.5">{description}</p>}
      </div>
      {children}
    </motion.div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[#CBD5E1]">{label}</label>
      {children}
      {hint && <p className="text-xs text-[#475569]">{hint}</p>}
    </div>
  );
}

const inputClass =
  "w-full bg-[#0F0F1A] border border-[#2A2A45] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#475569] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all";

// ─── Main page ────────────────────────────────────────────────────────────────

export default function SettingsProfileAndPreferencesPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [saved, setSaved] = useState(false);

  // Profile form state
  const [profile, setProfile] = useState<ProfileForm>({
    firstName: "Alex",
    lastName: "Rivera",
    email: "alex.rivera@acmecorp.io",
    jobTitle: "Head of Growth",
    company: "Acme Corp",
    bio: "Building data-driven products that scale. Passionate about metrics, experimentation, and turning insights into action.",
    website: "https://alexrivera.io",
    timezone: "UTC-08:00 Pacific Time",
    language: "English (US)",
  });

  // Notification prefs
  const [notifs, setNotifs] = useState<NotificationPrefs>({
    emailDigest: true,
    revenueAlerts: true,
    userMilestones: true,
    churnWarnings: true,
    weeklyReport: true,
    productUpdates: false,
    securityAlerts: true,
    teamActivity: false,
  });

  // Appearance prefs
  const [appearance, setAppearance] = useState<AppearancePrefs>({
    theme: "dark",
    accentColor: "#6366F1",
    compactMode: false,
    animationsEnabled: true,
    sidebarCollapsed: false,
  });

  // Security
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);

  // Connected apps
  const [apps, setApps] = useState(CONNECTED_APPS);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggleApp = (id: string) => {
    setApps((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, connected: !a.connected, since: !a.connected ? "Just now" : "" } : a
      )
    );
  };

  const updateProfile = (field: keyof ProfileForm, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const updateNotif = (field: keyof NotificationPrefs, value: boolean) => {
    setNotifs((prev) => ({ ...prev, [field]: value }));
  };

  const updateAppearance = <K extends keyof AppearancePrefs>(field: K, value: AppearancePrefs[K]) => {
    setAppearance((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0A0A14] text-white">
      {/* Page header */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="border-b border-[#2A2A45] bg-[#0F0F1A]/80 backdrop-blur-md"
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
          <p className="text-sm text-[#64748B] mt-1">
            Manage your profile, preferences, and account security.
          </p>
        </div>
      </motion.div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Sidebar ── */}
          <motion.aside
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="lg:w-56 flex-shrink-0"
          >
            <nav className="bg-[#16162A] border border-[#2A2A45] rounded-2xl p-2 sticky top-24">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 mb-0.5 ${
                      isActive
                        ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                        : "text-[#64748B] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {tab.label}
                    {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />}
                  </motion.button>
                );
              })}
            </nav>
          </motion.aside>

          {/* ── Main content ── */}
          <main className="flex-1 min-w-0">
            <motion.div
              key={activeTab}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* ═══════════════════════════════════════════════════════════════
                  PROFILE TAB
              ═══════════════════════════════════════════════════════════════ */}
              {activeTab === "profile" && (
                <>
                  {/* Avatar section */}
                  <Section title="Profile Photo" description="Your photo appears on your profile and in notifications.">
                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-indigo-500/30">
                          AR
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-lg bg-[#2A2A45] border border-[#3A3A55] flex items-center justify-center hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all"
                        >
                          <Camera className="w-3.5 h-3.5 text-[#94A3B8]" />
                        </motion.button>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Alex Rivera</p>
                        <p className="text-xs text-[#64748B] mt-0.5">Head of Growth · Acme Corp</p>
                        <div className="flex gap-2 mt-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 hover:bg-indigo-500/25 transition-all"
                          >
                            Upload new photo
                          </motion.button>
                          <button className="px-3 py-1.5 text-xs font-medium rounded-lg text-[#64748B] hover:text-white hover:bg-white/5 transition-all">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </Section>

                  {/* Personal info */}
                  <Section title="Personal Information" description="Update your name, email, and public profile details.">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="First Name">
                        <input
                          type="text"
                          className={inputClass}
                          value={profile.firstName}
                          onChange={(e) => updateProfile("firstName", e.target.value)}
                          placeholder="First name"
                        />
                      </Field>
                      <Field label="Last Name">
                        <input
                          type="text"
                          className={inputClass}
                          value={profile.lastName}
                          onChange={(e) => updateProfile("lastName", e.target.value)}
                          placeholder="Last name"
                        />
                      </Field>
                      <Field label="Email Address" hint="Used for login and notifications.">
                        <input
                          type="email"
                          className={inputClass}
                          value={profile.email}
                          onChange={(e) => updateProfile("email", e.target.value)}
                          placeholder="you@company.com"
                        />
                      </Field>
                      <Field label="Job Title">
                        <input
                          type="text"
                          className={inputClass}
                          value={profile.jobTitle}
                          onChange={(e) => updateProfile("jobTitle", e.target.value)}
                          placeholder="e.g. Head of Growth"
                        />
                      </Field>
                      <Field label="Company">
                        <input
                          type="text"
                          className={inputClass}
                          value={profile.company}
                          onChange={(e) => updateProfile("company", e.target.value)}
                          placeholder="Your company name"
                        />
                      </Field>
                      <Field label="Website">
                        <input
                          type="url"
                          className={inputClass}
                          value={profile.website}
                          onChange={(e) => updateProfile("website", e.target.value)}
                          placeholder="https://yoursite.com"
                        />
                      </Field>
                    </div>
                    <div className="mt-4">
                      <Field label="Bio" hint="Brief description shown on your public profile. Max 200 characters.">
                        <textarea
                          className={`${inputClass} resize-none`}
                          rows={3}
                          value={profile.bio}
                          onChange={(e) => updateProfile("bio", e.target.value)}
                          placeholder="Tell your team a bit about yourself…"
                          maxLength={200}
                        />
                      </Field>
                    </div>
                  </Section>

                  {/* Locale */}
                  <Section title="Locale & Language" description="Set your timezone and preferred language for the dashboard.">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Timezone">
                        <select
                          className={inputClass}
                          value={profile.timezone}
                          onChange={(e) => updateProfile("timezone", e.target.value)}
                        >
                          {TIMEZONES.map((tz) => (
                            <option key={tz} value={tz}>
                              {tz}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Language">
                        <select
                          className={inputClass}
                          value={profile.language}
                          onChange={(e) => updateProfile("language", e.target.value)}
                        >
                          {LANGUAGES.map((lang) => (
                            <option key={lang} value={lang}>
                              {lang}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                  </Section>

                  {/* Danger zone */}
                  <Section title="Danger Zone" description="Irreversible actions — proceed with caution.">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                      <div>
                        <p className="text-sm font-medium text-red-400">Delete Account</p>
                        <p className="text-xs text-[#64748B] mt-0.5">
                          Permanently delete your account and all associated data. This cannot be undone.
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-all flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                      </motion.button>
                    </div>
                  </Section>
                </>
              )}

              {/* ═══════════════════════════════════════════════════════════════
                  NOTIFICATIONS TAB
              ═══════════════════════════════════════════════════════════════ */}
              {activeTab === "notifications" && (
                <>
                  <Section title="Email Notifications" description="Choose which events trigger an email to your inbox.">
                    <div className="space-y-4">
                      {(
                        [
                          { key: "emailDigest", label: "Daily Email Digest", desc: "A summary of key metrics delivered every morning at 8 AM." },
                          { key: "revenueAlerts", label: "Revenue Alerts", desc: "Notify me when revenue crosses a milestone or drops unexpectedly." },
                          { key: "userMilestones", label: "User Milestones", desc: "Celebrate when you hit 100, 500, 1K, 5K users and beyond." },
                          { key: "churnWarnings", label: "Churn Warnings", desc: "Alert me when churn rate exceeds my configured threshold." },
                          { key: "weeklyReport", label: "Weekly Performance Report", desc: "Full PDF report every Monday with week-over-week comparisons." },
                          { key: "productUpdates", label: "Product Updates", desc: "News about new Pulse Analytics features and improvements." },
                          { key: "securityAlerts", label: "Security Alerts", desc: "Immediate notification of suspicious login attempts or changes." },
                          { key: "teamActivity", label: "Team Activity", desc: "Updates when teammates join, leave, or change permissions." },
                        ] as { key: keyof NotificationPrefs; label: string; desc: string }[]
                      ).map(({ key, label, desc }) => (
                        <div key={key} className="flex items-center justify-between gap-4 py-3 border-b border-[#2A2A45] last:border-0">
                          <div>
                            <p className="text-sm font-medium text-white">{label}</p>
                            <p className="text-xs text-[#64748B] mt-0.5">{desc}</p>
                          </div>
                          <Toggle
                            checked={notifs[key]}
                            onChange={(v) => updateNotif(key, v)}
                          />
                        </div>
                      ))}
                    </div>
                  </Section>

                  <Section title="Notification Channels" description="Where you want to receive alerts beyond email.">
                    <div className="space-y-3">
                      {[
                        { icon: Smartphone, label: "Push Notifications", desc: "Browser and mobile push alerts for critical events.", enabled: true },
                        { icon: Monitor, label: "In-App Notifications", desc: "Show notification bell alerts inside the dashboard.", enabled: true },
                      ].map(({ icon: Icon, label, desc, enabled }) => {
                        const [on, setOn] = useState(enabled);
                        return (
                          <div key={label} className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#0F0F1A] border border-[#2A2A45]">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                <Icon className="w-4 h-4 text-indigo-400" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white">{label}</p>
                                <p className="text-xs text-[#64748B]">{desc}</p>
                              </div>
                            </div>
                            <Toggle checked={on} onChange={setOn} />
                          </div>
                        );
                      })}
                    </div>
                  </Section>
                </>
              )}

              {/* ═══════════════════════════════════════════════════════════════
                  APPEARANCE TAB
              ═══════════════════════════════════════════════════════════════ */}
              {activeTab === "appearance" && (
                <>
                  <Section title="Theme" description="Choose how Pulse Analytics looks on your device.">
                    <div className="grid grid-cols-3 gap-3">
                      {(
                        [
                          { value: "dark", label: "Dark", icon: Moon, preview: "bg-[#0A0A14]" },
                          { value: "light", label: "Light", icon: Sun, preview: "bg-gray-100" },
                          { value: "system", label: "System", icon: Monitor, preview: "bg-gradient-to-br from-[#0A0A14] to-gray-100" },
                        ] as { value: AppearancePrefs["theme"]; label: string; icon: typeof Moon; preview: string }[]
                      ).map(({ value, label, icon: Icon, preview }) => {
                        const isSelected = appearance.theme === value;
                        return (
                          <motion.button
                            key={value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => updateAppearance("theme", value)}
                            className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                              isSelected
                                ? "border-indigo-500/50 bg-indigo-500/10"
                                : "border-[#2A2A45] bg-[#0F0F1A] hover:border-[#3A3A55]"
                            }`}
                          >
                            <div className={`w-full h-12 rounded-lg ${preview} border border-white/10`} />
                            <div className="flex items-center gap-1.5">
                              <Icon className="w-3.5 h-3.5 text-[#94A3B8]" />
                              <span className="text-xs font-medium text-[#CBD5E1]">{label}</span>
                            </div>
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </Section>

                  <Section title="Accent Color" description="Personalize the primary color used across the interface.">
                    <div className="flex flex-wrap gap-3">
                      {ACCENT_COLORS.map(({ label, value }) => {
                        const isSelected = appearance.accentColor === value;
                        return (
                          <motion.button
                            key={value}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateAppearance("accentColor", value)}
                            title={label}
                            className={`relative w-9 h-9 rounded-xl border-2 transition-all ${
                              isSelected ? "border-white scale-110" : "border-transparent"
                            }`}
                            style={{ backgroundColor: value }}
                          >
                            {isSelected && (
                              <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-[#475569] mt-3">
                      Selected: {ACCENT_COLORS.find((c) => c.value === appearance.accentColor)?.label ?? "Custom"}
                    </p>
                  </Section>

                  <Section title="Display Preferences" description="Fine-tune layout density and motion settings.">
                    <div className="space-y-4">
                      {(
                        [
                          { key: "compactMode" as const, label: "Compact Mode", desc: "Reduce padding and spacing for a denser information layout." },
                          { key: "animationsEnabled" as const, label: "Enable Animations", desc: "Smooth transitions and micro-interactions throughout the UI." },
                          { key: "sidebarCollapsed" as const, label: "Collapse Sidebar by Default", desc: "Start with the sidebar collapsed to maximize content area." },
                        ]
                      ).map(({ key, label, desc }) => (
                        <div key={key} className="flex items-center justify-between gap-4 py-3 border-b border-[#2A2A45] last:border-0">
                          <div>
                            <p className="text-sm font-medium text-white">{label}</p>
                            <p className="text-xs text-[#64748B] mt-0.5">{desc}</p>
                          </div>
                          <Toggle
                            checked={appearance[key] as boolean}
                            onChange={(v) => updateAppearance(key, v)}
                          />
                        </div>
                      ))}
                    </div>
                  </Section>
                </>
              )}

              {/* ═══════════════════════════════════════════════════════════════
                  SECURITY TAB
              ═══════════════════════════════════════════════════════════════ */}
              {activeTab === "security" && (
                <>
                  <Section title="Change Password" description="Use a strong, unique password you don't use elsewhere.">
                    <div className="space-y-4 max-w-md">
                      <Field label="Current Password">
                        <div className="relative">
                          <input
                            type={showCurrentPw ? "text" : "password"}
                            className={`${inputClass} pr-10`}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPw((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] hover:text-white transition-colors"
                          >
                            {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </Field>
                      <Field label="New Password" hint="Minimum 12 characters. Include uppercase, numbers, and symbols.">
                        <div className="relative">
                          <input
                            type={showNewPw ? "text" : "password"}
                            className={`${inputClass} pr-10`}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Create a strong password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPw((v) => !v)}