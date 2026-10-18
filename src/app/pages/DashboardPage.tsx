import { motion } from "motion/react";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Activity,
  FileText,
  Clock,
} from "lucide-react";
import { GlassCard } from "../components/GlassCard";
import { StatusBadge } from "../components/StatusBadge";
import { Link } from "react-router";
import { Button } from "../components/ui/button";

const stats = [
  {
    label: "News Analyzed",
    value: "1,247",
    change: "+12.5%",
    icon: FileText,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    label: "Threats Blocked",
    value: "34",
    change: "-8.2%",
    icon: Shield,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    label: "Active Monitoring",
    value: "24/7",
    change: "100%",
    icon: Activity,
    color: "text-indigo-600",
    bg: "bg-indigo-100",
  },
  {
    label: "Security Score",
    value: "98%",
    change: "+2.1%",
    icon: TrendingUp,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
];

const recentActivity = [
  {
    type: "success",
    title: "News Article Verified",
    description: "Political news in Hindi verified as authentic",
    time: "2 minutes ago",
  },
  {
    type: "warning",
    title: "Suspicious Link Detected",
    description: "Phishing attempt blocked from unknown source",
    time: "15 minutes ago",
  },
  {
    type: "success",
    title: "System Scan Complete",
    description: "Full device scan completed - No threats found",
    time: "1 hour ago",
  },
  {
    type: "info",
    title: "New Update Available",
    description: "TruthShield v2.1 with enhanced AI detection",
    time: "3 hours ago",
  },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <GlassCard className="p-6 bg-gradient-to-br from-indigo-600 to-blue-600 border-0">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
              <p className="text-indigo-100">
                Your device is secure and protected by TruthShield AI
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard hover className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
              <Link to="/dashboard/history">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="mt-1">
                    {activity.type === "success" && (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    )}
                    {activity.type === "warning" && (
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    )}
                    {activity.type === "info" && (
                      <Shield className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <GlassCard className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/dashboard/analyze">
                <Button className="w-full justify-start bg-indigo-600 hover:bg-indigo-700 h-12">
                  <FileText className="h-5 w-5 mr-2" />
                  Analyze News
                </Button>
              </Link>
              <Link to="/dashboard/threats">
                <Button variant="outline" className="w-full justify-start h-12">
                  <Shield className="h-5 w-5 mr-2" />
                  Scan Device
                </Button>
              </Link>
              <Link to="/dashboard/alerts">
                <Button variant="outline" className="w-full justify-start h-12">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  View Alerts
                </Button>
              </Link>
            </div>
          </GlassCard>

          <GlassCard className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 border-0">
            <div className="text-white">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">All Systems Secure</h3>
              <p className="text-sm text-green-100 mb-4">
                No threats detected. Your device is fully protected.
              </p>
              <div className="text-xs text-green-100">
                Last scan: Just now
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
