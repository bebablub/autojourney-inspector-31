import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, SettingsIcon, PlayIcon, FileTextIcon } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: HomeIcon, label: "Home" },
    { to: "/customize", icon: SettingsIcon, label: "Customize" },
    { to: "/start-check", icon: PlayIcon, label: "Start HV-Check" },
    { to: "/reports", icon: FileTextIcon, label: "Reports" },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold text-gray-800">HV-Check</Link>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out
                  ${location.pathname === item.to
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <item.icon className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;