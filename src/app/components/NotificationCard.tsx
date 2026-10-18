import { motion, AnimatePresence } from "motion/react";
import { X, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { cn } from "./ui/utils";

type NotificationType = "warning" | "success" | "info" | "danger";

interface NotificationCardProps {
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  onDismiss: () => void;
}

const typeConfig = {
  warning: {
    bg: "bg-yellow-50 border-yellow-200",
    icon: AlertTriangle,
    iconColor: "text-yellow-600",
  },
  success: {
    bg: "bg-green-50 border-green-200",
    icon: CheckCircle2,
    iconColor: "text-green-600",
  },
  info: {
    bg: "bg-blue-50 border-blue-200",
    icon: Info,
    iconColor: "text-blue-600",
  },
  danger: {
    bg: "bg-red-50 border-red-200",
    icon: AlertTriangle,
    iconColor: "text-red-600",
  },
};

export function NotificationCard({
  type,
  title,
  message,
  timestamp,
  onDismiss,
}: NotificationCardProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.9 }}
      className={cn(
        "w-80 p-4 rounded-xl border shadow-lg",
        config.bg
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn("mt-0.5", config.iconColor)}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-700 mt-1">{message}</p>
          <p className="text-xs text-gray-500 mt-2">{timestamp}</p>
        </div>
        <button
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
