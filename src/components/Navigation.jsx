import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, SettingsIcon, FileTextIcon, PlayIcon } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="flex items-center">
            <HomeIcon className="w-5 h-5 mr-2" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/customize" className="flex items-center">
            <SettingsIcon className="w-5 h-5 mr-2" />
            Customize
          </Link>
        </li>
        <li>
          <Link to="/start-check" className="flex items-center">
            <PlayIcon className="w-5 h-5 mr-2" />
            Start HV-Check
          </Link>
        </li>
        <li>
          <Link to="/reports" className="flex items-center">
            <FileTextIcon className="w-5 h-5 mr-2" />
            Reports
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;