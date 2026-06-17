export const APP_NAME = "Pulse Analytics";
export const APP_TAGLINE = "Clarity in every metric. Growth in every decision.";
export const APP_VERSION = "2.4.1";

export interface NavLink {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: NavLink[];
}

export const navLinks: NavLink[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Analytics", href: "/analytics" },
  { label: "Users", href: "/users" },
  { label: "Revenue", href: "/revenue" },
  { label: "Settings", href: "/settings" },
];

export const footerLinks = {
  product: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Analytics", href: "/analytics" },
    { label: "Revenue", href: "/revenue" },
    { label: "Users", href: "/users" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  support: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Status", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export interface KPICard {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  prefix?: string;
  suffix?: string;
}

export interface ChartDataPoint {
  month: string;
  revenue: number;
  mrr: number;
  users: number;
  activeUsers: number;
  churn: number;
}

export const BRAND_COLORS = {
  primary: "#6366F1",
  secondary: "#8B5CF6",
  accent: "#06B6D4",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  dark: "#1E1E2E",
  surface: "#16162A",
  border: "#2A2A45",
  muted: "#64748B",
  text: "#F8FAFC",
  textMuted: "#94A3B8",
} as const;