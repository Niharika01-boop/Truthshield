import { cn } from "./ui/utils";
import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";

type StatusType = "success" | "warning" | "danger" | "info";

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  className?: string;
}

const statusConfig = {
  success: {
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-200",
    icon: CheckCircle2,
  },
  warning: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    border: "border-yellow-200",
    icon: AlertTriangle,
  },
  danger: {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-200",
    icon: XCircle,
  },
  info: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
    icon: Info,
  },
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border",
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      <Icon className="h-4 w-4" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
