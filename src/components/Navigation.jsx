import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, HomeIcon, SettingsIcon, FileTextIcon, ToolIcon } from 'lucide-react';
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

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold text-foreground flex items-center">
            <HomeIcon className="mr-2" />
            Diagnostics Tool
          </Link>
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/start-check">
                    <Button variant="outline">
                      <ToolIcon className="mr-2 h-4 w-4" />
                      Start Check
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Start a new diagnostic check</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
                  <DropdownMenuItem onSelect={() => setIsProfileOpen(false)}>
                    <Link to="/customize" className="text-foreground flex items-center">
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      Customize
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setIsProfileOpen(false)}>
                    <Link to="/reports" className="text-foreground flex items-center">
                      <FileTextIcon className="mr-2 h-4 w-4" />
                      Reports
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setIsProfileOpen(false)}>
                    <Link to="/account" className="text-foreground flex items-center">
                      <UserIcon className="mr-2 h-4 w-4" />
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setIsProfileOpen(false)}>
                    <Link to="/vci-management" className="text-foreground flex items-center">
                      <ToolIcon className="mr-2 h-4 w-4" />
                      VCI Management
                    </Link>
                  </DropdownMenuItem>
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