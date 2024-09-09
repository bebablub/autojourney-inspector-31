import React from 'react';
import Navigation from '../components/Navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const sampleReports = [
  { id: 'HV-2023-001-123', date: '2023-03-23', make: 'Volkswagen', model: 'ID.Buzz', status: 'Pass' },
  { id: 'HV-2023-001-124', date: '2023-03-24', make: 'Tesla', model: 'Model 3', status: 'Fail' },
  { id: 'HV-2023-001-125', date: '2023-03-25', make: 'BMW', model: 'i3', status: 'Pass' },
];

const Reports = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">HV-Check Reports</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Make</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>{report.make}</TableCell>
                <TableCell>{report.model}</TableCell>
                <TableCell>{report.status}</TableCell>
                <TableCell>
                  <Button variant="outline">View Report</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Reports;