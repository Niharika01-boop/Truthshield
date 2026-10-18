import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  AlertTriangle,
  Wifi,
  Smartphone,
  Lock,
  Activity,
  AlertOctagon,
  CheckCircle2,
  Ban,
  FileWarning,
} from "lucide-react";
import { GlassCard } from "../components/GlassCard";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";

type ThreatType = "phishing" | "malware" | "fake-app" | "suspicious-link";
type RiskLevel = "low" | "medium" | "high";

type Threat = {
  id: string;
  type: ThreatType;
  risk: RiskLevel;
  name: string;
  description: string;
  detectedAt: string;
  source: string;
};

const mockThreats: Threat[] = [
  {
    id: "1",
    type: "phishing",
    risk: "high",
    name: "Phishing Email Detected",
    description: "Suspicious email claiming to be from your bank requesting credentials",
    detectedAt: "2 minutes ago",
    source: "Email Client",
  },
  {
    id: "2",
    type: "fake-app",
    risk: "medium",
    name: "Untrusted Application",
    description: "App 'FastVPN' requesting unusual permissions",
    detectedAt: "15 minutes ago",
    source: "App Scanner",
  },
];

export function ThreatMonitorPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [threats, setThreats] = useState<Threat[]>([]);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setThreats([]);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setThreats(mockThreats);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const getRiskConfig = (risk: RiskLevel) => {
    switch (risk) {
      case "high":
        return { color: "text-red-600", bg: "bg-red-100", label: "High Risk" };
      case "medium":
        return { color: "text-yellow-600", bg: "bg-yellow-100", label: "Medium Risk" };
      case "low":
        return { color: "text-green-600", bg: "bg-green-100", label: "Low Risk" };
    }
  };

  const getThreatIcon = (type: ThreatType) => {
    switch (type) {
      case "phishing":
        return FileWarning;
      case "malware":
        return AlertOctagon;
      case "fake-app":
        return Smartphone;
      case "suspicious-link":
        return Wifi;
    }
  };

  const blockThreat = (threatId: string) => {
    setThreats(threats.filter((t) => t.id !== threatId));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Alert Banner */}
      {threats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-600 text-white p-4 rounded-xl flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 animate-pulse" />
            <div>
              <p className="font-semibold">⚠ Warning: Suspicious activity detected on your device.</p>
              <p className="text-sm text-red-100">
                {threats.length} threat{threats.length > 1 ? "s" : ""} detected. Take action immediately.
              </p>
            </div>
          </div>
          <Button
            onClick={() => setShowEmergencyModal(true)}
            className="bg-white text-red-600 hover:bg-red-50"
          >
            Emergency Mode
          </Button>
        </motion.div>
      )}

      {/* Scan Control */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <GlassCard className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Cyber Threat Monitor</h1>
              <p className="text-gray-600">
                Real-time protection against hacking and malicious activities
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
                <Shield className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-green-50 border border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Firewall</p>
                  <p className="font-semibold text-gray-900">Active</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-200">
              <div className="flex items-center gap-3">
                <Activity className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Real-time Scan</p>
                  <p className="font-semibold text-gray-900">Enabled</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-200">
              <div className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Encryption</p>
                  <p className="font-semibold text-gray-900">Protected</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scan Button */}
          <Button
            onClick={startScan}
            disabled={isScanning}
            className="w-full md:w-auto h-12 px-8 bg-indigo-600 hover:bg-indigo-700 rounded-xl"
          >
            {isScanning ? (
              <>
                <Activity className="h-5 w-5 mr-2 animate-spin" />
                Scanning Device...
              </>
            ) : (
              <>
                <Shield className="h-5 w-5 mr-2" />
                Start Full Scan
              </>
            )}
          </Button>

          {/* Scan Progress */}
          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6"
              >
                <div className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Scanning in progress...</span>
                    <span className="text-sm font-semibold text-indigo-600">{scanProgress}%</span>
                  </div>
                  <Progress value={scanProgress} className="h-2" />
                  <p className="text-xs text-gray-500 mt-2">Checking applications, network, and system files</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </motion.div>

      {/* Detected Threats */}
      <AnimatePresence>
        {threats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Detected Threats</h2>
              <div className="space-y-4">
                {threats.map((threat) => {
                  const Icon = getThreatIcon(threat.type);
                  const riskConfig = getRiskConfig(threat.risk);
                  return (
                    <motion.div
                      key={threat.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`p-6 rounded-xl border-2 ${
                        threat.risk === "high"
                          ? "bg-red-50 border-red-200"
                          : threat.risk === "medium"
                          ? "bg-yellow-50 border-yellow-200"
                          : "bg-green-50 border-green-200"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${riskConfig.bg}`}>
                          <Icon className={`h-6 w-6 ${riskConfig.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-gray-900">{threat.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{threat.description}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${riskConfig.bg} ${riskConfig.color}`}>
                              {riskConfig.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                            <span>Detected: {threat.detectedAt}</span>
                            <span>•</span>
                            <span>Source: {threat.source}</span>
                          </div>
                          <div className="flex gap-3 mt-4">
                            <Button
                              onClick={() => blockThreat(threat.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              <Ban className="h-4 w-4 mr-2" />
                              Block Application
                            </Button>
                            <Button variant="outline">
                              <Shield className="h-4 w-4 mr-2" />
                              Scan Device
                            </Button>
                            <Button variant="outline">
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              Report Threat
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emergency Alert Modal */}
      <Dialog open={showEmergencyModal} onOpenChange={setShowEmergencyModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-red-600 flex items-center justify-center gap-2">
              <AlertOctagon className="h-8 w-8 animate-pulse" />
              Emergency Protection Mode
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Your device may be compromised.
              </p>
              <p className="text-gray-600">
                You might be a victim of misinformation targeting or cyber attack.
              </p>
            </div>
            <div className="space-y-2">
              <Button className="w-full h-12 bg-red-600 hover:bg-red-700">
                <Ban className="h-5 w-5 mr-2" />
                Block Suspicious Application
              </Button>
              <Button variant="outline" className="w-full h-12">
                <Lock className="h-5 w-5 mr-2" />
                Enable Safe Mode
              </Button>
              <Button variant="outline" className="w-full h-12">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Notify Authorities
              </Button>
              <Button variant="outline" className="w-full h-12">
                <Smartphone className="h-5 w-5 mr-2" />
                Send Alert to Registered Phone
              </Button>
            </div>
            <div className="text-center text-xs text-gray-500">
              Auto-protection will activate in 30 seconds
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
