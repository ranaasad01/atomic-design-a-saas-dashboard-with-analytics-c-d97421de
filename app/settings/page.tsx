"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Bell, Eye, Camera, Mail, Shield, Check, ChevronRight, Save, AlertCircle, Moon, Sun, Monitor } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS, APP_NAME } from "@/lib/data";

// ─── Types ───────────────────────────────────────────────────────────────────

type Tab = "profile" | "notifications" | "appearance";

interface ProfileState {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  bio: string;
  company: string;
  timezone: string;
}

interface NotificationState {
  emailWeeklyDigest: boolean;
  emailRevenueAlerts: boolean;
  emailChurnAlerts: boolean;
  emailProductUpdates: boolean;
  emailSecurityAlerts: boolean;
  inAppNewUsers: boolean;
  inAppMilestones: boolean;
  inAppSystemAlerts: boolean;
  inAppTeamActivity: boolean;
  inAppReports: boolean;
}

type ThemeMode = "light" | "dark" | "system";
type AccentColor = "indigo" | "violet" | "cyan" | "emerald" | "rose" | "amber";

interface AppearanceState {
  theme: ThemeMode;
  accent: AccentColor;
  compactMode: boolean;
  animationsEnabled: boolean;
  sidebarCollapsed: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Eye },
];

const ROLES = [
  "Owner",
  "Admin",
  "Analyst",
  "Developer",
  "Viewer",
  "Billing Manager",
];

const TIMEZONES = [
  "UTC-08:00 Pacific Time",
  "UTC-07:00 Mountain Time",
  "UTC-06:00 Central Time",
  "UTC-05:00 Eastern Time",
  "UTC+00:00 London",
  "UTC+01:00 Paris / Berlin",
  "UTC+05:30 Mumbai",
  "UTC+08:00 Singapore",
  "UTC+09:00 Tokyo",
];

const ACCENT_COLORS: { id: AccentColor; label: string; hex: string; ring: string }[] = [
  { id: "indigo", label: "Indigo", hex: "#6366F1", ring: "ring-indigo-500" },
  { id: "violet", label: "Violet", hex: "#8B5CF6", ring: "ring-violet-500" },
  { id: "cyan", label: "Cyan", hex: "#06B6D4", ring: "ring-cyan-500" },
  { id: "emerald", label: "Emerald", hex: "#10B981", ring: "ring-emerald-500" },
  { id: "rose", label: "Rose", hex: "#F43F5E", ring: "ring-rose-500" },
  { id: "amber", label: "Amber", hex: "#F59E0B", ring: "ring-amber-500" },
];

const THEME_OPTIONS: { id: ThemeMode; label: string; icon: React.ElementType; desc: string }[] = [
  { id: "light", label: "Light", icon: Sun, desc: "Clean white interface" },
  { id: "dark", label: "Dark", icon: Moon, desc: "Easy on the eyes" },
  { id: "system", label: "System", icon: Monitor, desc: "Follows OS preference" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="text-sm text-[#94A3B8] mt-0.5">{description}</p>
    </div>
  );
}

function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[#CBD5E1]">{label}</label>
      {children}
      {hint && <p className="text-xs text-[#64748B]">{hint}</p>}
    </div>
  );
}

function InputField({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ?? ""}
      disabled={disabled}
      className="w-full px-3.5 py-2.5 rounded-lg bg-[#1E1E2E] border border-[#2A2A45] text-white placeholder-[#475569] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    />
  );
}

function SelectField({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3.5 py-2.5 rounded-lg bg-[#1E1E2E] border border-[#2A2A45] text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/60 transition-all appearance-none cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-[#1E1E2E]">
          {opt}
        </option>
      ))}
    </select>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-[#2A2A45]/60 last:border-0">
      <div className="flex-1 pr-4">
        <p className="text-sm font-medium text-[#E2E8F0]">{label}</p>
        {description && <p className="text-xs text-[#64748B] mt-0.5">{description}</p>}
      </div>
      <motion.button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        whileTap={{ scale: 0.95 }}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-[#16162A] flex-shrink-0 ${
          checked ? "bg-indigo-500" : "bg-[#2A2A45]"
        }`}
      >
        <motion.span
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
        />
      </motion.button>
    </div>
  );
}

function SaveButton({ onClick, saved }: { onClick: () => void; saved: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
        saved
          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
          : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
      }`}
    >
      {saved ? (
        <>
          <Check className="w-4 h-4" />
          Saved!
        </>
      ) : (
        <>
          <Save className="w-4 h-4" />
          Save Changes
        </>
      )}
    </motion.button>
  );
}

// ─── Tab Panels ───────────────────────────────────────────────────────────────

function ProfileTab({
  profile,
  setProfile,
}: {
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState>>;
}) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const initials =
    `${profile.firstName?.charAt(0) ?? ""}${profile.lastName?.charAt(0) ?? ""}`.toUpperCase() ||
    "U";

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Avatar Section */}
      <motion.div
        variants={fadeInUp}
        className="p-6 rounded-xl bg-[#16162A] border border-[#2A2A45]"
      >
        <SectionHeader
          title="Profile Photo"
          description="Upload a photo to personalize your account."
        />
        <div className="flex items-center gap-5">
          <div className="relative group">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/20 select-none">
              {initials}
            </div>
            <motion.div
              whileHover={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center cursor-pointer transition-opacity"
            >
              <Camera className="w-5 h-5 text-white" />
            </motion.div>
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-[#2A2A45] text-sm text-[#CBD5E1] hover:bg-white/10 hover:border-indigo-500/40 transition-all"
            >
              <Camera className="w-4 h-4" />
              Upload Photo
            </motion.button>
            <p className="text-xs text-[#64748B] mt-2">JPG, PNG or GIF · Max 2MB</p>
          </div>
        </div>
      </motion.div>

      {/* Personal Info */}
      <motion.div
        variants={fadeInUp}
        className="p-6 rounded-xl bg-[#16162A] border border-[#2A2A45]"
      >
        <SectionHeader
          title="Personal Information"
          description="Update your name, email, and role details."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="First Name">
            <InputField
              value={profile.firstName}
              onChange={(v) => setProfile((p) => ({ ...p, firstName: v }))}
              placeholder="Jane"
            />
          </FormField>
          <FormField label="Last Name">
            <InputField
              value={profile.lastName}
              onChange={(v) => setProfile((p) => ({ ...p, lastName: v }))}
              placeholder="Doe"
            />
          </FormField>
          <FormField label="Email Address" hint="Used for login and notifications.">
            <InputField
              value={profile.email}
              onChange={(v) => setProfile((p) => ({ ...p, email: v }))}
              placeholder="jane@company.com"
              type="email"
            />
          </FormField>
          <FormField label="Role">
            <SelectField
              value={profile.role}
              onChange={(v) => setProfile((p) => ({ ...p, role: v }))}
              options={ROLES}
            />
          </FormField>
          <FormField label="Company">
            <InputField
              value={profile.company}
              onChange={(v) => setProfile((p) => ({ ...p, company: v }))}
              placeholder="Acme Corp"
            />
          </FormField>
          <FormField label="Timezone">
            <SelectField
              value={profile.timezone}
              onChange={(v) => setProfile((p) => ({ ...p, timezone: v }))}
              options={TIMEZONES}
            />
          </FormField>
          <FormField label="Bio" hint="A short description visible to your team.">
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
              placeholder="Tell your team a bit about yourself…"
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#1E1E2E] border border-[#2A2A45] text-white placeholder-[#475569] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/60 transition-all resize-none col-span-2"
            />
          </FormField>
        </div>
      </motion.div>

      {/* Security */}
      <motion.div
        variants={fadeInUp}
        className="p-6 rounded-xl bg-[#16162A] border border-[#2A2A45]"
      >
        <SectionHeader
          title="Security"
          description="Manage your password and two-factor authentication."
        />
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.01, x: 2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-between px-4 py-3.5 rounded-lg bg-[#1E1E2E] border border-[#2A2A45] hover:border-indigo-500/40 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-[#E2E8F0]">Change Password</p>
                <p className="text-xs text-[#64748B]">Last changed 30 days ago</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-indigo-400 transition-colors" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.01, x: 2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-between px-4 py-3.5 rounded-lg bg-[#1E1E2E] border border-[#2A2A45] hover:border-indigo-500/40 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Mail className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-[#E2E8F0]">Two-Factor Authentication</p>
                <p className="text-xs text-emerald-400">Enabled via Authenticator App</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-indigo-400 transition-colors" />
          </motion.button>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        variants={fadeInUp}
        className="p-6 rounded-xl bg-[#1A0F0F] border border-red-500/20"
      >
        <SectionHeader
          title="Danger Zone"
          description="Irreversible actions — proceed with caution."
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#E2E8F0]">Delete Account</p>
              <p className="text-xs text-[#64748B]">
                Permanently remove your account and all associated data.
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-lg border border-red-500/40 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-all flex-shrink-0 ml-4"
          >
            Delete Account
          </motion.button>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="flex justify-end">
        <SaveButton onClick={handleSave} saved={saved} />
      </motion.div>
    </motion.div>
  );
}

function NotificationsTab({
  notifs,
  setNotifs,
}: {
  notifs: NotificationState;
  setNotifs: React.Dispatch<React.SetStateAction<NotificationState>>;
}) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggle = (key: keyof NotificationState) =>
    setNotifs((n) => ({ ...n, [key]: !n[key] }));

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Email Notifications */}
      <motion.div
        variants={fadeInUp}
        className="p-6 rounded-xl bg-[#16162A] border border-[#2A2A45]"
      >
        <SectionHeader
          title="Email Notifications"
          description="Choose which updates you'd like to receive via email."
        />
        <div>
          <Toggle
            checked={notifs.emailWeeklyDigest}
            onChange={() => toggle("emailWeeklyDigest")}
            label="Weekly Digest"
            description="A summary of your key metrics every Monday morning."
          />
          <Toggle
            checked={notifs.emailRevenueAlerts}
            onChange={() => toggle("emailRevenueAlerts")}
            label="Revenue Alerts"
            description="Notify me when revenue crosses a defined threshold."
          />
          <Toggle
            checked={notifs.emailChurnAlerts}
            onChange={() => toggle("emailChurnAlerts")}
            label="Churn Alerts"
            description="Get notified when churn rate spikes above 3%."
          />
          <Toggle
            checked={notifs.emailProductUpdates}
            onChange={() => toggle("emailProductUpdates")}
            label="Product Updates"
            description={`New features and improvements to ${APP_NAME}.`}
          />
          <Toggle
            checked={notifs.emailSecurityAlerts}
            onChange={() => toggle("emailSecurityAlerts")}
            label="Security Alerts"
            description="Critical alerts about your account security."
          />
        </div>
      </motion.div>

      {/* In-App Notifications */}
      <motion.div
        variants={fadeInUp}
        className="p-6 rounded-xl bg-[#16162A] border border-[#2A2A45]"
      >
        <SectionHeader
          title="In-App Notifications"
          description="Control what appears in your notification bell."
        />
        <div>
          <Toggle
            checked={notifs.inAppNewUsers}
            onChange={() => toggle("inAppNewUsers")}
            label="New User Signups"
            description="Show a notification when new users join your workspace."
          />
          <Toggle
            checked={notifs.inAppMilestones}
            onChange={() => toggle("inAppMilestones")}
            label="Milestone Achievements"
            description="Celebrate when you hit revenue or user milestones."
          />
          <Toggle
            checked={notifs.inAppSystemAlerts}
            onChange={() => toggle("inAppSystemAlerts")}
            label="System Alerts"
            description="Infrastructure and uptime notifications."
          />
          <Toggle
            checked={notifs.inAppTeamActivity}
            onChange={() => toggle("inAppTeamActivity")}
            label="Team Activity"
            description="See when teammates update dashboards or reports."
          />
          <Toggle
            checked={notifs.inAppReports}
            onChange={() => toggle("inAppReports")}
            label="Scheduled Reports"
            description="Notify me when a scheduled report is ready to view."
          />
        </div>
      </motion.div>

      {/* Notification Frequency */}
      <motion.div
        variants={fadeInUp}
        className="p-6 rounded-xl bg-[#16162A] border border-[#2A2A45]"
      >
        <SectionHeader
          title="Quiet Hours"
          description="Pause non-critical notifications during these hours."
        />
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#94A3B8]">From</span>
            <select
              defaultValue="22:00"
              className="px-3 py-2 rounded-lg bg-[#1E1E2E] border border-[#2A2A45] text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              {["20:00", "21:00", "22:00", "23:00"].map((t) => (
                <option key={t} value={t} className="bg-[#1E1E2E]">
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#94A3B8]">To</span>
            <select
              defaultValue="08:00"
              className="px-3 py-2 rounded-lg bg-[#1E1E2E] border border-[#2A2A45] text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              {["06:00", "07:00", "08:00", "09:00"].map((t) => (
                <option key={t} value={t} className="bg-[#1E1E2E]">
                  {t}
                </option>
              ))}
            </select>
          </div>
          <span className="text-xs text-[#64748B]">Based on your selected timezone</span>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="flex justify-end">
        <SaveButton onClick={handleSave} saved={saved} />
      </motion.div>
    </motion.div>
  );
}

function AppearanceTab({
  appearance,
  setAppearance,
}: {
  appearance: AppearanceState;
  setAppearance: React.Dispatch<React.SetStateAction<AppearanceState>>;
}) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggleAppearance = (key: keyof AppearanceState) =>
    setAppearance((a) => ({ ...a, [key]: !a[key] }));

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Theme Mode */}
      <motion.div
        variants={fadeInUp}
        className="p-6 rounded-xl bg-[#16162A] border border-[#2A2A45]"
      >
        <SectionHeader
          title="Theme Mode"
          description="Choose how Pulse Analytics looks to you."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {THEME_OPTIONS.map(({ id, label, icon: Icon, desc }) => {
            const isSelected = appearance.theme === id;
            return (
              <motion.button
                key={id}
                onClick={() => setAppearance((a) => ({ ...a, theme: id }))}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-[#2A2A45] bg-[#1E1E2E] hover:border-[#3A3A55]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isSelected ? "bg-indigo-500/20" : "bg-white/5"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${isSelected ? "text-indigo-400" : "text-[#64748B]"}`}
                  />
                </div>
                <div className="text-center">
                  <p
                    className={`text-sm font-semibold ${
                      isSelected ? "text-white" : "text-[#CBD5E1]"
                    }`}
                  >
                    {label}
                  </p>
                  <p className="text-xs text-[#64748B] mt-0.5">{desc}</p>
                </div>
                {isSelected && (
                  <motion.div
                    layoutId="theme-check"
                    className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Accent Color */}
      <motion.div
        variants={fadeInUp}
        className="p-6 rounded-xl bg-[#16162A] border border-[#2A2A45]"
      >
        <SectionHeader
          title="Accent Color"
          description="Personalize the primary color used across the interface."
        />
        <div className="flex items-center gap-3 flex-wrap">
          {ACCENT_COLORS.map(({ id, label, hex, ring }) => {
            const isSelected = appearance.accent === id;
            return (
              <motion.button
                key={id}
                onClick={() => setAppearance((a) => ({ ...a, accent: id }))}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={label}
                aria-label={`Select ${label} accent`}
                className={`relative w-10 h-10 rounded-xl transition-all duration-200 ${
                  isSelected ? `ring-2 ring-offset-2 ring-offset-[#16162A] ${ring}` : ""
                }`}
                style={{ backgroundColor: hex }}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white drop-shadow" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
        <p className="text-xs text-[#64748B] mt-3">
          Selected:{" "}
          <span className="text-[#CBD5E1] font-medium capitalize">{appearance.accent}</span>
        </p>
      </motion.div>

      {/* Display Preferences */}
      <motion.div
        variants={fadeInUp}
        className="p-6 rounded-xl bg-[#16162A] border border-[#2A2A45]"
      >
        <SectionHeader
          title="Display Preferences"
          description="Fine-tune the layout and motion settings."
        />
        <div>
          <Toggle
            checked={appearance.compactMode}
            onChange={() => toggleAppearance("compactMode")}
            label="Compact Mode"
            description="Reduce spacing and padding for a denser layout."
          />
          <Toggle
            checked={appearance.animationsEnabled}
            onChange={() => toggleAppearance("animationsEnabled")}
            label="Enable Animations"
            description="Smooth transitions and micro-interactions throughout the UI."
          />
          <Toggle
            checked={appearance.sidebarCollapsed}
            onChange={() => toggleAppearance("sidebarCollapsed")}
            label="Collapse Sidebar by Default"
            description="Start with the sidebar minimized on page load."
          />
        </div>
      </motion.div>

      {/* Preview Card */}
      <motion.div
        variants={fadeInUp}
        className="p-6 rounded-xl bg-[#16162A] border border-[#2A2A45]"
      >
        <SectionHeader
          title="Preview"
          description="A live preview of your current appearance settings."
        />
        <div className="rounded-xl bg-[#0F0F1A] border border-[#2A2A45] p-4 overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <div className="flex-1 mx-2 h-5 rounded bg-[#1E1E2E] border border-[#2A2A45]" />
          </div>
          <div className="flex gap-3">
            <div className="w-24 space-y-1.5">
              {["Dashboard", "Analytics", "Revenue", "Users"].map((item, i) => (
                <div
                  key={item}
                  className={`h-6 rounded text-xs flex items-center px-2 ${
                    i === 0
                      ? "text-white font-medium"
                      : "text-[#64748B]"
                  }`}
                  style={
                    i === 0
                      ? {
                          backgroundColor:
                            ACCENT_COLORS.find((c) => c.id === appearance.accent)?.hex + "22",
                        }
                      : {}
                  }
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-16 rounded-lg bg-[#1E1E2E] border border-[#2A2A45] flex items-center justify-center">
                <div
                  className="h-6 w-24 rounded"
                  style={{
                    backgroundColor:
                      ACCENT_COLORS.find((c) => c.id === appearance.accent)?.hex + "33",
                  }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-10 rounded-lg bg-[#1E1E2E] border border-[#2A2A45]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="flex justify-end">
        <SaveButton onClick={handleSave} saved={saved} />
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const [profile, setProfile] = useState<ProfileState>({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@acmecorp.com",
    role: "Admin",
    bio: "Head of Growth at Acme Corp. Passionate about data-driven decisions and SaaS metrics.",
    company: "Acme Corp",
    timezone: "UTC-05:00 Eastern Time",
  });

  const [notifs, setNotifs] = useState<NotificationState>({
    emailWeeklyDigest: true,
    emailRevenueAlerts: true,
    emailChurnAlerts: true,
    emailProductUpdates: false,
    emailSecurityAlerts: true,
    inAppNewUsers: true,
    inAppMilestones: true,
    inAppSystemAlerts: false,
    inAppTeamActivity: true,
    inAppReports: false,
  });

  const [appearance, setAppearance] = useState<AppearanceState>({
    theme: "dark",
    accent: "indigo",
    compactMode: false,
    animationsEnabled: true,
    sidebarCollapsed: false,
  });

  return (
    <main className="min-h-screen bg-[#0A0A14] text-white">
      {/* Page Header */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="border-b border-[#2A2A45] bg-[#0F0F1A]"
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Settings
            </h1>
            <p className="text-[#94A3B8] mt-1 text-sm">
              Manage your account preferences, notifications, and appearance.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs */}
          <motion.aside
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="lg:w-56 flex-shrink-0"
          >
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {TABS.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                return (
                  <motion.button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    whileHover={{ x: isActive ? 0 : 3 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap w-full text-left ${
                      isActive
                        ? "bg-indigo-500/15 text-white border border-indigo-500/25 shadow-sm"
                        : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 ${
                        isActive ? "text-indigo-400" : "text-[#64748B]"
                      }`}
                    />
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="tab-indicator"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400"
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* Version badge */}
            <div className="hidden lg:flex items-center gap-2 mt-6 px-4 py-2.5 rounded-xl bg-[#16162A] border border-[#2A2A45]">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-[#64748B]">
                {APP_NAME} v2.4.1
              </span>
            </div>
          </motion.aside>

          {/* Tab Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
                >
                  <ProfileTab profile={profile} setProfile={setProfile} />
                </motion.div>
              )}
              {activeTab === "notifications" && (
                <motion.div
                  key="notifications"
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
                >
                  <NotificationsTab notifs={notifs} setNotifs={setNotifs} />
                </motion.div>
              )}
              {activeTab === "appearance" && (
                <motion.div
                  key="appearance"
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
                >
                  <AppearanceTab appearance={appearance} setAppearance={setAppearance} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}

// missing import for slideInLeft — add it inline since it's in lib/motion
import { slideInLeft } from "@/lib/motion";