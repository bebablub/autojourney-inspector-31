import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold text-gray-800">Diagnostics Tool</Link>
          <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <Tooltip content="Profile">
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <UserIcon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
            </Tooltip>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setIsProfileOpen(false)}>
                <Link to="/customize">Customize</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setIsProfileOpen(false)}>
                <Link to="/reports">Reports</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setIsProfileOpen(false)}>
                <Link to="/account">Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setIsProfileOpen(false)}>
                <Link to="/vci-management">VCI Management</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;