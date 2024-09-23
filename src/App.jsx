import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { GameProvider } from "./contexts/GameContext";
import { VehicleProvider } from "./contexts/VehicleContext";
import Layout from "./components/Layout";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import StartCheck from "./pages/StartCheck";
import Profile from "./pages/Profile";
import MyDevices from "./pages/MyDevices";
import MyReports from "./pages/MyReports";
import Customize from "./pages/Customize";
import EmployeeManagement from "./pages/EmployeeManagement";
import DeviceOverview from "./pages/DeviceOverview";
import ReportOverview from "./pages/ReportOverview";
import UsageDashboard from "./pages/UsageDashboard";
import CarIdentification from "./components/CarIdentification";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <GameProvider>
          <VehicleProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Navigate to="/user" replace />} />
                  <Route path="user" element={<UserDashboard />}>
                    <Route index element={<StartCheck />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="devices" element={<MyDevices />} />
                    <Route path="reports" element={<MyReports />} />
                  </Route>
                  <Route path="admin" element={<AdminDashboard />}>
                    <Route index element={<UsageDashboard />} />
                    <Route path="customize" element={<Customize />} />
                    <Route path="employees" element={<EmployeeManagement />} />
                    <Route path="devices" element={<DeviceOverview />} />
                    <Route path="reports" element={<ReportOverview />} />
                  </Route>
                  <Route path="start-check" element={<StartCheck />} />
                  <Route path="car-identification" element={<CarIdentification />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </VehicleProvider>
        </GameProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
