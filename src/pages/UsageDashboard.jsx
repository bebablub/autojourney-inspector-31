import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UsageDashboard = () => {
  const usageData = [
    { name: 'Jan', checks: 65 },
    { name: 'Feb', checks: 59 },
    { name: 'Mar', checks: 80 },
    { name: 'Apr', checks: 81 },
    { name: 'May', checks: 56 },
    { name: 'Jun', checks: 55 },
  ];

  const problemIndicators = [
    { name: 'Failed Checks', value: 12 },
    { name: 'Device Errors', value: 5 },
    { name: 'Incomplete Reports', value: 3 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Usage Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>HV-Checks Performed</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="checks" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Problem Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {problemIndicators.map((indicator, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{indicator.name}</span>
                  <span className="font-bold">{indicator.value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UsageDashboard;