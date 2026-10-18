import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AnalyzeNewsPage } from "./pages/AnalyzeNewsPage";
import { ThreatMonitorPage } from "./pages/ThreatMonitorPage";
import { AlertsPage } from "./pages/AlertsPage";
import { HistoryPage } from "./pages/HistoryPage";
import { ReportsPage } from "./pages/ReportsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { RootLayout } from "./components/layout/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "login", Component: LoginPage },
      { path: "signup", Component: SignUpPage },
      {
        path: "dashboard",
        Component: DashboardLayout,
        children: [
          { index: true, Component: DashboardPage },
          { path: "analyze", Component: AnalyzeNewsPage },
          { path: "threats", Component: ThreatMonitorPage },
          { path: "alerts", Component: AlertsPage },
          { path: "history", Component: HistoryPage },
          { path: "reports", Component: ReportsPage },
          { path: "settings", Component: SettingsPage },
        ],
      },
    ],
  },
]);
