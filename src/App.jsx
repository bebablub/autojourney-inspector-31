import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GameProvider } from "./contexts/GameContext";
import Layout from "./components/Layout";
import Diagnostics from "./pages/Diagnostics";
import Customize from "./pages/Customize";
import Reports from "./pages/Reports";
import Account from "./pages/Account";
import VCIManagement from "./pages/VCIManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GameProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Diagnostics />} />
              <Route path="customize" element={<Customize />} />
              <Route path="reports" element={<Reports />} />
              <Route path="account" element={<Account />} />
              <Route path="vci-management" element={<VCIManagement />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;