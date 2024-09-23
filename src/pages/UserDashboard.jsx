import React from 'react';
import { Outlet } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <Outlet />
    </div>
  );
};

export default UserDashboard;