import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
} from "lucide-react";
import { GlassCard } from "../components/GlassCard";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Progress } from "../components/ui/progress";
import { StatusBadge } from "../components/StatusBadge";

const languages = [
  "Auto Detect",
  "Hindi",
  "Odia",
  "Tamil",
  "Telugu",
  "Bengali",
  "Marathi",
  "English",
];

type AnalysisResult = {
  status: "real" | "fake" | "suspicious";
  confidence: number;
  explanation: string;
  keywords: string[];
  detectedLanguage: string;
};

export function AnalyzeNewsPage() {
  const [newsText, setNewsText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("Auto Detect");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    if (!newsText.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    // Simulate AI analysis
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        status: Math.random() > 0.5 ? "real" : Math.random() > 0.3 ? "suspicious" : "fake",
        confidence: Math.floor(Math.random() * 30) + 70,
        explanation:
          "Our AI has analyzed the content structure, source credibility, fact-checking against verified databases, and linguistic patterns. The analysis indicates patterns commonly associated with verified news sources.",
        keywords: ["politics", "election", "government", "policy", "reform"],
        detectedLanguage: selectedLanguage === "Auto Detect" ? "Hindi" : selectedLanguage,
      };
      setResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "real":
        return {
          badge: "success" as const,
          label: "Verified Real News",
          icon: CheckCircle2,
          color: "text-green-600",
          bg: "bg-green-50",
          border: "border-green-200",
        };
      case "suspicious":
        return {
          badge: "warning" as const,
          label: "Suspicious Content",
          icon: AlertTriangle,
          color: "text-yellow-600",
          bg: "bg-yellow-50",
          border: "border-yellow-200",
        };
      case "fake":
        return {
          badge: "danger" as const,
          label: "Fake News Detected",
          icon: XCircle,
          color: "text-red-600",
          bg: "bg-red-50",
          border: "border-red-200",
        };
      default:
        return {
          badge: "info" as const,
          label: "Unknown",
          icon: Info,
          color: "text-blue-600",
          bg: "bg-blue-50",
          border: "border-blue-200",
        };
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <GlassCard className="p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI News Analyzer</h1>
            <p className="text-gray-600">
              Paste news content in any regional language to verify authenticity
            </p>
          </div>

          {/* Language Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Language
            </label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full md:w-64 h-12 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Text Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              News Content
            </label>
            <Textarea
              value={newsText}
              onChange={(e) => setNewsText(e.target.value)}
              placeholder="Paste or type news in Hindi, Odia, Tamil, Telugu, Bengali, Marathi..."
              className="min-h-[200px] rounded-xl resize-none"
            />
          </div>

          {/* Analyze Button */}
          <Button
            onClick={handleAnalyze}
            disabled={!newsText.trim() || isAnalyzing}
            className="w-full md:w-auto h-12 px-8 bg-indigo-600 hover:bg-indigo-700 rounded-xl"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Search className="h-5 w-5 mr-2" />
                Analyze with AI
              </>
            )}
          </Button>
        </GlassCard>
      </motion.div>

      {/* AI Scanning Animation */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <GlassCard className="p-8">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-indigo-600 border-t-transparent"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  AI Analysis in Progress
                </h3>
                <p className="text-gray-600 mb-4">
                  Analyzing content patterns, fact-checking, and verifying sources...
                </p>
                <div className="max-w-md mx-auto">
                  <Progress value={66} className="h-2" />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Result */}
      <AnimatePresence>
        {result && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GlassCard className="p-8">
              {(() => {
                const config = getStatusConfig(result.status);
                const Icon = config.icon;
                return (
                  <>
                    {/* Status Header */}
                    <div className={`p-6 rounded-xl ${config.bg} border-2 ${config.border} mb-6`}>
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full bg-white ${config.color}`}>
                          <Icon className="h-8 w-8" />
                        </div>
                        <div className="flex-1">
                          <StatusBadge status={config.badge} label={config.label} className="mb-2" />
                          <h3 className="text-2xl font-bold text-gray-900">
                            Analysis Complete
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Confidence Score */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">Confidence Score</span>
                        <span className="text-2xl font-bold text-indigo-600">
                          {result.confidence}%
                        </span>
                      </div>
                      <Progress value={result.confidence} className="h-3" />
                    </div>

                    {/* Detected Language */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                      <span className="text-sm text-gray-600">Detected Language:</span>
                      <span className="ml-2 font-semibold text-gray-900">
                        {result.detectedLanguage}
                      </span>
                    </div>

                    {/* Explanation */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">AI Explanation</h4>
                      <p className="text-gray-700 leading-relaxed">{result.explanation}</p>
                    </div>

                    {/* Highlighted Keywords */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Suspicious Keywords Detected
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.keywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
