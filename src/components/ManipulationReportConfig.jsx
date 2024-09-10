import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ManipulationReportConfig = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Card className="bg-gray-100">
      <CardHeader>
        <CardTitle>Manipulation Report Configuration</CardTitle>
        <CardDescription>Configure settings for manipulation detection reports</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Manipulation detection helps identify unauthorized changes to the vehicle's systems.</p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Configure Manipulation Report</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upgrade Required</DialogTitle>
              <DialogDescription>
                The Manipulation Report module is a premium feature. Please purchase this module to access advanced manipulation detection capabilities.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ManipulationReportConfig;