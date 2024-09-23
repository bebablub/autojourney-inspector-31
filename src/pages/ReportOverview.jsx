import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const ReportOverview = () => {
  const reports = [
    { id: 'HV-2024-001', date: '2024-03-15', technician: 'John Doe', vehicle: 'Volkswagen ID.4', status: 'Pass' },
    { id: 'HV-2024-002', date: '2024-03-10', technician: 'Jane Smith', vehicle: 'Tesla Model 3', status: 'Fail' },
    { id: 'HV-2024-003', date: '2024-03-12', technician: 'Bob Johnson', vehicle: 'BMW i3', status: 'Pass' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Report Overview</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Report ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Technician</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.id}</TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>{report.technician}</TableCell>
              <TableCell>{report.vehicle}</TableCell>
              <TableCell>{report.status}</TableCell>
              <TableCell>
                <Button variant="outline">View Report</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportOverview;