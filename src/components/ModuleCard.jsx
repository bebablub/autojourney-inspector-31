import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ModuleCard = ({ title, problem, solution }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">
          <strong>Problem:</strong> {problem}
        </CardDescription>
        <CardDescription className="mb-4">
          <strong>Solution:</strong> {solution}
        </CardDescription>
        <Button>Purchase Module</Button>
      </CardContent>
    </Card>
  );
};

export default ModuleCard;