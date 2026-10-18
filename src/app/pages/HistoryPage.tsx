import { useState } from "react";
import { motion } from "motion/react";
import { Calendar, Filter, Download, CheckCircle2, XCircle, AlertTriangle, FileText } from "lucide-react";
import { GlassCard } from "../components/GlassCard";
import { Button } from "../components/ui/button";
import { StatusBadge } from "../components/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

type HistoryItem = {
  id: string;
  type: "news" | "threat";
  title: string;
  result: "verified" | "fake" | "blocked" | "safe";
  date: string;
  time: string;
  language?: string;
};

const mockHistory: HistoryItem[] = [
  {
    id: "1",
    type: "news",
    title: "Election news article in Hindi",
    result: "verified",
    date: "2026-02-21",
    time: "10:30 AM",
    language: "Hindi",
  },
  {
    id: "2",
    type: "news",
    title: "Health misinformation in Tamil",
    result: "fake",
    date: "2026-02-21",
    time: "09:15 AM",
    language: "Tamil",
  },
  {
    id: "3",
    type: "threat",
    title: "Phishing email detected",
    result: "blocked",
    date: "2026-02-20",
    time: "08:45 PM",
  },
  {
    id: "4",
    type: "threat",
    title: "System security scan",
    result: "safe",
    date: "2026-02-20",
    time: "06:00 PM",
  },
  {
    id: "5",
    type: "news",
    title: "Political statement in Bengali",
    result: "verified",
    date: "2026-02-20",
    time: "03:20 PM",
    language: "Bengali",
  },
  {
    id: "6",
    type: "threat",
    title: "Malicious app blocked",
    result: "blocked",
    date: "2026-02-19",
    time: "11:30 AM",
  },
];

export function HistoryPage() {
  const [filter, setFilter] = useState<"all" | "news" | "threat">("all");

  const filteredHistory = mockHistory.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  const getResultBadge = (result: string) => {
    switch (result) {
      case "verified":
        return <StatusBadge status="success" label="Verified" />;
      case "safe":
        return <StatusBadge status="success" label="Safe" />;
      case "fake":
        return <StatusBadge status="danger" label="Fake News" />;
      case "blocked":
        return <StatusBadge status="warning" label="Blocked" />;
      default:
        return <StatusBadge status="info" label={result} />;
    }
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case "verified":
      case "safe":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "fake":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "blocked":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      default:
        return <FileText className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <GlassCard className="p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Activity History</h1>
              <p className="text-gray-600">
                View all your fake news detections and cyber threat logs
              </p>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Download className="h-4 w-4 mr-2" />
              Export History
            </Button>
          </div>
        </GlassCard>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard hover className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">
                {mockHistory.filter((h) => h.type === "news").length}
              </p>
              <p className="text-sm text-gray-600 mt-1">News Analyzed</p>
            </div>
          </GlassCard>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard hover className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">
                {mockHistory.filter((h) => h.result === "fake").length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Fake News Detected</p>
            </div>
          </GlassCard>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard hover className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">
                {mockHistory.filter((h) => h.result === "blocked").length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Threats Blocked</p>
            </div>
          </GlassCard>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard hover className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">
                {mockHistory.filter((h) => h.result === "verified" || h.result === "safe").length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Verified Safe</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Filters and Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <GlassCard className="p-8">
          {/* Filters */}
          <div className="flex items-center gap-3 mb-6">
            <Filter className="h-5 w-5 text-gray-500" />
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className={filter === "all" ? "bg-indigo-600" : ""}
              >
                All
              </Button>
              <Button
                variant={filter === "news" ? "default" : "outline"}
                onClick={() => setFilter("news")}
                className={filter === "news" ? "bg-indigo-600" : ""}
              >
                News Analysis
              </Button>
              <Button
                variant={filter === "threat" ? "default" : "outline"}
                onClick={() => setFilter("threat")}
                className={filter === "threat" ? "bg-indigo-600" : ""}
              >
                Cyber Threats
              </Button>
            </div>
          </div>

          {/* History Table */}
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getResultIcon(item.result)}
                        <span className="capitalize font-medium">{item.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{getResultBadge(item.result)}</TableCell>
                    <TableCell>
                      {item.language ? (
                        <span className="text-sm text-gray-700">{item.language}</span>
                      ) : (
                        <span className="text-sm text-gray-400">N/A</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">{item.date}</TableCell>
                    <TableCell className="text-sm text-gray-700">{item.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
