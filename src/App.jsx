import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { GameProvider } from "./contexts/GameContext";
import { VehicleProvider } from "./contexts/VehicleContext";
import Layout from "./components/Layout";
import Diagnostics from "./pages/Diagnostics";
import Customize from "./pages/Customize";
import Reports from "./pages/Reports";
import Account from "./pages/Account";
import VCIManagement from "./pages/VCIManagement";
import StartCheck from "./pages/StartCheck";
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
                  <Route index element={<Diagnostics />} />
                  <Route path="customize" element={<Customize />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="account" element={<Account />} />
                  <Route path="vci-management" element={<VCIManagement />} />
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