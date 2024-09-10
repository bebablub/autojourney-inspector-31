import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const VisualizationConfig = ({ presentation, setPresentation }) => {
  const handleChange = (value) => {
    setPresentation(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visualization Configuration</CardTitle>
        <CardDescription>Choose how you want to visualize and share your HV-Check results</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {['ui', 'mail', 'api', 'pdf'].map(option => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox 
                id={option} 
                checked={presentation.includes(option)}
                onCheckedChange={() => handleChange(option)}
              />
              <Label htmlFor={option} className="capitalize">{option}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualizationConfig;