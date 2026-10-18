import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import {
  Shield,
  Home,
  Search,
  AlertTriangle,
  Bell,
  History,
  FileText,
  Settings,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
  CheckCircle2,
  AlertOctagon,
} from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { cn } from "../ui/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Analyze News", href: "/dashboard/analyze", icon: Search },
  { name: "Threat Monitor", href: "/dashboard/threats", icon: AlertTriangle },
  { name: "Alerts", href: "/dashboard/alerts", icon: Bell },
  { name: "History", href: "/dashboard/history", icon: History },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [securityStatus, setSecurityStatus] = useState<"secure" | "monitoring" | "threat">("secure");

  const handleLogout = () => {
    navigate("/login");
  };

  const getStatusConfig = () => {
    switch (securityStatus) {
      case "secure":
        return { color: "bg-green-500", text: "Secure", icon: CheckCircle2 };
      case "monitoring":
        return { color: "bg-yellow-500", text: "Monitoring", icon: AlertTriangle };
      case "threat":
        return { color: "bg-red-500", text: "Under Threat", icon: AlertOctagon };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-indigo-600" />
            <span className="text-lg font-bold text-gray-900">TruthShield</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full", statusConfig.color)}>
              <div className="h-1.5 w-1.5 bg-white rounded-full animate-pulse" />
              <span className="text-xs font-medium text-white">{statusConfig.text}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-72 transition-transform duration-300 ease-in-out",
          "bg-white/70 backdrop-blur-xl border-r border-gray-200",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">TruthShield</h1>
              <p className="text-xs text-gray-500">AI Protection</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200 space-y-3">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-5 w-5" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5" />
                  <span>Dark Mode</span>
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Bar - Desktop */}
        <div className="hidden lg:flex items-center justify-between px-8 py-4 bg-white/70 backdrop-blur-xl border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">
              {navigation.find((item) => item.href === location.pathname)?.name || "Dashboard"}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full",
              statusConfig.color
            )}>
              <StatusIcon className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">{statusConfig.text}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">User Account</p>
                <p className="text-xs text-gray-500">user@example.com</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
                <span className="text-white font-semibold">U</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4 lg:p-8 pt-20 lg:pt-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
