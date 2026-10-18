import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Shield,
  Globe,
  Zap,
  Bell,
  Lock,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { GlassCard } from "../components/GlassCard";

const features = [
  {
    icon: Globe,
    title: "Multi-language Fake News Detection",
    description: "Detect misinformation in Hindi, Odia, Tamil, Telugu, Bengali, Marathi, and more regional languages.",
  },
  {
    icon: Zap,
    title: "Real-time Cyber Threat Monitoring",
    description: "AI-powered protection against hacking attempts, malware, and device manipulation.",
  },
  {
    icon: Bell,
    title: "Instant Phone Alerts",
    description: "Get immediate notifications on your phone when suspicious activity is detected.",
  },
  {
    icon: Lock,
    title: "Auto Application Blocking System",
    description: "Automatically block malicious apps and protect your device from threats.",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TruthShield</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 mb-6">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-semibold">AI-Powered Protection Platform</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Detect Fake News.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                Prevent Cyber Threats.
              </span>
              <br />
              Stay Protected.
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              AI-powered misinformation detection and real-time cyber attack alerts for regional language users.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard/analyze">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-6 rounded-xl">
                  <Search className="h-5 w-5 mr-2" />
                  Analyze News
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl">
                  <Shield className="h-5 w-5 mr-2" />
                  Activate Protection
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 relative"
          >
            <GlassCard className="p-8 max-w-4xl mx-auto">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <Shield className="h-24 w-24 mx-auto mb-4 animate-pulse" />
                  <p className="text-2xl font-bold">AI Cybersecurity Scanning Active</p>
                  <div className="flex items-center justify-center gap-8 mt-8">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-6 w-6" />
                      <span>Device Secure</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-6 w-6" />
                      <span>Real-time Protection</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Advanced Protection Features
            </h2>
            <p className="text-xl text-gray-600">
              Enterprise-grade security powered by artificial intelligence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard hover className="p-8 h-full">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex-shrink-0">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-12 text-center bg-gradient-to-br from-indigo-600 to-blue-600 border-0">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Protected?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of users staying safe from fake news and cyber threats
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl">
                Get Started Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/70 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-indigo-600" />
              <span className="font-bold text-gray-900">TruthShield</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-indigo-600">About</a>
              <a href="#" className="hover:text-indigo-600">Contact</a>
              <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-600">Terms</a>
            </div>
            <p className="text-sm text-gray-500">
              © 2026 TruthShield. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Search(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
