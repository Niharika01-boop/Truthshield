import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, X, AlertTriangle, CheckCircle2, Info, Smartphone } from "lucide-react";
import { GlassCard } from "../components/GlassCard";
import { NotificationCard } from "../components/NotificationCard";

type NotificationType = "warning" | "success" | "info" | "danger";

type Alert = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
};

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "danger",
    title: "Critical: Device Hacking Attempt",
    message: "Warning: This device may be hacked. Suspicious manipulation detected.",
    timestamp: new Date().toLocaleTimeString(),
  },
  {
    id: "2",
    type: "warning",
    title: "Fake News Targeting Detected",
    message: "Alert: This device may be a victim of fake news targeting.",
    timestamp: new Date(Date.now() - 120000).toLocaleTimeString(),
  },
  {
    id: "3",
    type: "warning",
    title: "Suspicious App Activity",
    message: "Unauthorized app attempting to access sensitive data.",
    timestamp: new Date(Date.now() - 300000).toLocaleTimeString(),
  },
];

export function AlertsPage() {
  const [floatingAlerts, setFloatingAlerts] = useState<Alert[]>([]);
  const [allAlerts, setAllAlerts] = useState<Alert[]>(mockAlerts);
  const [alertCounter, setAlertCounter] = useState(0);

  // Simulate real-time alerts every 3-5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const alertTypes: NotificationType[] = ["danger", "warning", "info"];
      const alertMessages = [
        {
          title: "Security Warning",
          message: "Warning: This device may be hacked. Suspicious activity detected.",
        },
        {
          title: "Manipulation Alert",
          message: "Suspicious manipulation detected on this device.",
        },
        {
          title: "Fake News Alert",
          message: "Alert: This device may be a victim of fake news targeting.",
        },
        {
          title: "Network Threat",
          message: "Unusual network activity detected. Protection mode activated.",
        },
      ];

      const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const randomMessage = alertMessages[Math.floor(Math.random() * alertMessages.length)];

      const newAlert: Alert = {
        id: `alert-${Date.now()}-${alertCounter}`,
        type: randomType,
        title: randomMessage.title,
        message: randomMessage.message,
        timestamp: new Date().toLocaleTimeString(),
      };

      setFloatingAlerts((prev) => [...prev, newAlert]);
      setAllAlerts((prev) => [newAlert, ...prev]);
      setAlertCounter((prev) => prev + 1);

      // Auto-remove floating alert after 5 seconds
      setTimeout(() => {
        setFloatingAlerts((prev) => prev.filter((a) => a.id !== newAlert.id));
      }, 5000);
    }, 4000);

    return () => clearInterval(interval);
  }, [alertCounter]);

  const dismissFloatingAlert = (id: string) => {
    setFloatingAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const dismissAlert = (id: string) => {
    setAllAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Floating Notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-3">
        <AnimatePresence>
          {floatingAlerts.map((alert) => (
            <NotificationCard
              key={alert.id}
              type={alert.type}
              title={alert.title}
              message={alert.message}
              timestamp={alert.timestamp}
              onDismiss={() => dismissFloatingAlert(alert.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <GlassCard className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Alerts</h1>
              <p className="text-gray-600">
                Real-time notifications and security warnings
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-red-100">
              <div className="h-2 w-2 bg-red-600 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700">
                {allAlerts.length} Active Alerts
              </span>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Phone Push Notification Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Mobile Push Notification Preview
          </h2>
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-4 shadow-2xl">
              {/* Phone Screen */}
              <div className="bg-white rounded-2xl overflow-hidden">
                {/* Notification */}
                <div className="bg-red-50 border-l-4 border-red-600 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        ⚠ Security Alert from TruthShield
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        Suspicious app activity detected. Protection mode activated.
                      </p>
                      <div className="flex gap-2 mt-3">
                        <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-medium">
                          Block Now
                        </button>
                        <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium">
                          Ignore
                        </button>
                        <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              Real-time alerts sent to your registered mobile device
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* All Alerts List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Alerts</h2>
            <span className="text-sm text-gray-500">
              Auto-refreshing every 2-5 seconds
            </span>
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {allAlerts.map((alert) => {
                const getAlertStyle = () => {
                  switch (alert.type) {
                    case "danger":
                      return {
                        bg: "bg-red-50",
                        border: "border-red-200",
                        icon: AlertTriangle,
                        iconColor: "text-red-600",
                      };
                    case "warning":
                      return {
                        bg: "bg-yellow-50",
                        border: "border-yellow-200",
                        icon: AlertTriangle,
                        iconColor: "text-yellow-600",
                      };
                    case "success":
                      return {
                        bg: "bg-green-50",
                        border: "border-green-200",
                        icon: CheckCircle2,
                        iconColor: "text-green-600",
                      };
                    case "info":
                      return {
                        bg: "bg-blue-50",
                        border: "border-blue-200",
                        icon: Info,
                        iconColor: "text-blue-600",
                      };
                  }
                };

                const style = getAlertStyle();
                const Icon = style.icon;

                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    layout
                    className={`p-4 rounded-xl border-2 ${style.bg} ${style.border} hover:shadow-lg transition-shadow`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 ${style.iconColor}`}>
                        <Icon className="h-5 w-5 animate-pulse" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                        <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                      </div>
                      <button
                        onClick={() => dismissAlert(alert.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
