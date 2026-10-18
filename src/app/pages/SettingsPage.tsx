import { useState } from "react";
import { motion } from "motion/react";
import {
  User,
  Bell,
  Shield,
  Lock,
  Globe,
  Smartphone,
  Mail,
  Save,
  Moon,
  Sun,
} from "lucide-react";
import { GlassCard } from "../components/GlassCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useTheme } from "next-themes";
import { toast } from "sonner";

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailAlerts: true,
    smsAlerts: false,
    autoBlock: true,
    realTimeScan: true,
    biometricAuth: false,
    language: "English",
    fullName: "User Account",
    email: "user@example.com",
    phone: "+91 9876543210",
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <GlassCard className="p-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your account and preferences</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <User className="h-6 w-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={settings.fullName}
                onChange={(e) => setSettings({ ...settings, fullName: e.target.value })}
                className="h-12 rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="h-12 rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="h-12 rounded-xl"
              />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-6 w-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">Notification Preferences</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-600">Receive alerts on your device</p>
                </div>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={() => handleToggle("pushNotifications")}
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Email Alerts</p>
                  <p className="text-sm text-gray-600">Receive security alerts via email</p>
                </div>
              </div>
              <Switch
                checked={settings.emailAlerts}
                onCheckedChange={() => handleToggle("emailAlerts")}
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">SMS Alerts</p>
                  <p className="text-sm text-gray-600">Receive critical alerts via SMS</p>
                </div>
              </div>
              <Switch
                checked={settings.smsAlerts}
                onCheckedChange={() => handleToggle("smsAlerts")}
              />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-6 w-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">Security Preferences</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Auto Application Blocking</p>
                  <p className="text-sm text-gray-600">Automatically block malicious apps</p>
                </div>
              </div>
              <Switch
                checked={settings.autoBlock}
                onCheckedChange={() => handleToggle("autoBlock")}
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Real-time Scanning</p>
                  <p className="text-sm text-gray-600">Continuous threat monitoring</p>
                </div>
              </div>
              <Switch
                checked={settings.realTimeScan}
                onCheckedChange={() => handleToggle("realTimeScan")}
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Biometric Authentication</p>
                  <p className="text-sm text-gray-600">Use fingerprint or face ID</p>
                </div>
              </div>
              <Switch
                checked={settings.biometricAuth}
                onCheckedChange={() => handleToggle("biometricAuth")}
              />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Appearance Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard className="p-8">
          <div className="flex items-center gap-3 mb-6">
            {theme === "dark" ? (
              <Moon className="h-6 w-6 text-indigo-600" />
            ) : (
              <Sun className="h-6 w-6 text-indigo-600" />
            )}
            <h2 className="text-2xl font-bold text-gray-900">Appearance & Language</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3">
                {theme === "dark" ? (
                  <Moon className="h-5 w-5 text-gray-600" />
                ) : (
                  <Sun className="h-5 w-5 text-gray-600" />
                )}
                <div>
                  <p className="font-medium text-gray-900">Dark Mode</p>
                  <p className="text-sm text-gray-600">Toggle dark theme</p>
                </div>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
            </div>
            <div>
              <Label htmlFor="language">Preferred Language</Label>
              <Select value={settings.language} onValueChange={(value) => setSettings({ ...settings, language: value })}>
                <SelectTrigger className="h-12 rounded-xl mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">हिंदी (Hindi)</SelectItem>
                  <SelectItem value="Tamil">தமிழ் (Tamil)</SelectItem>
                  <SelectItem value="Bengali">বাংলা (Bengali)</SelectItem>
                  <SelectItem value="Telugu">తెలుగు (Telugu)</SelectItem>
                  <SelectItem value="Marathi">मराठी (Marathi)</SelectItem>
                  <SelectItem value="Odia">ଓଡ଼ିଆ (Odia)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={handleSave}
          className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-lg"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Settings
        </Button>
      </motion.div>
    </div>
  );
}
