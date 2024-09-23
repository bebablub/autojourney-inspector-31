import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserIcon, HomeIcon, SettingsIcon, FileTextIcon, WrenchIcon, UsersIcon, LayoutDashboardIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminMode = location.pathname.startsWith('/admin');

  const toggleMode = () => {
    if (isAdminMode) {
      navigate('/user');
    } else {
      navigate('/admin');
    }
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold text-foreground flex items-center">
            <HomeIcon className="mr-2" />
            HV-Check Tool
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={toggleMode}>
              {isAdminMode ? 'Switch to User Mode' : 'Switch to Admin Mode'}
            </Button>
            {isAdminMode && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to="/admin">
                      <Button variant="outline">
                        <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Admin Dashboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <TooltipProvider>
              <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <UserIcon className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Profile</p>
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="end" className="bg-background border-border">
                  {isAdminMode ? (
                    <>
                      <DropdownMenuItem onSelect={() => setIsProfileOpen(false)}>
                        <Link to="/admin/customize" className="text-foreground flex items-center">
                          <SettingsIcon className="mr-2 h-4 w-4" />
                          Customize
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setIsProfileOpen(false)}>
                        <Link to="/admin/employees" className="text-foreground flex items-center">
                          <UsersIcon className="mr-2 h-4 w-4" />
                          Employees
                        </Link>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onSelect={() => setIsProfileOpen(false)}>
                        <Link to="/user/profile" className="text-foreground flex items-center">
                          <UserIcon className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setIsProfileOpen(false)}>
                        <Link to="/user/devices" className="text-foreground flex items-center">
                          <WrenchIcon className="mr-2 h-4 w-4" />
                          My Devices
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setIsProfileOpen(false)}>
                        <Link to="/user/reports" className="text-foreground flex items-center">
                          <FileTextIcon className="mr-2 h-4 w-4" />
                          My Reports
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
