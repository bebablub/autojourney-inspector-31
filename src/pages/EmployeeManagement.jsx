import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const EmployeeManagement = () => {
  const employees = [
    { id: 1, name: 'John Doe', role: 'Technician', devices: 2, reports: 15 },
    { id: 2, name: 'Jane Smith', role: 'Senior Technician', devices: 3, reports: 22 },
    { id: 3, name: 'Bob Johnson', role: 'Manager', devices: 1, reports: 5 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Employee Management</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Devices</TableHead>
            <TableHead>Reports</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell>{employee.devices}</TableCell>
              <TableCell>{employee.reports}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2">Edit</Button>
                <Button variant="outline">View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button>Add New Employee</Button>
    </div>
  );
};

export default EmployeeManagement;