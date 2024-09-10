import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, SettingsIcon, PlayIcon, FileTextIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: HomeIcon, label: "Home", description: "Return to main menu", showOnHome: false },
    { to: "/customize", icon: SettingsIcon, label: "Customize", description: "Configure HV-Check settings" },
    { to: "/start-check", icon: PlayIcon, label: "Start HV-Check", description: "Begin a new HV-Check" },
    { to: "/reports", icon: FileTextIcon, label: "Reports", description: "View past HV-Check reports" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold text-gray-800">HV-Check</Link>
          <div className="flex space-x-2">
            {navItems.map((item) => (
              (item.showOnHome !== false || location.pathname !== "/") && (
                <Tooltip key={item.to} content={item.description}>
                  <Link to={item.to}>
                    <Button
                      variant={location.pathname === item.to ? "default" : "outline"}
                      className="flex items-center px-3 py-2 transition-colors duration-300 ease-in-out"
                    >
                      <item.icon className="w-5 h-5 mr-2" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </Button>
                  </Link>
                </Tooltip>
              )
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;