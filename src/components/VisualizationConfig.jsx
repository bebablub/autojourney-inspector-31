import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const VisualizationConfig = ({ presentation, setPresentation }) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [apiParameters, setApiParameters] = useState('');

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
        <CardDescription>Choose and configure how you want to visualize and share your diagnostic results</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="ui" 
              checked={presentation.includes('ui')}
              onCheckedChange={() => handleChange('ui')}
            />
            <Label htmlFor="ui">User Interface</Label>
          </div>
          <p className="text-sm text-gray-500 ml-6">Results will be displayed directly in the application interface.</p>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="mail" 
              checked={presentation.includes('mail')}
              onCheckedChange={() => handleChange('mail')}
            />
            <Label htmlFor="mail">Email</Label>
          </div>
          {presentation.includes('mail') && (
            <div className="ml-6 space-y-2">
              <Input 
                type="email" 
                placeholder="Enter email address" 
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
              <p className="text-sm text-gray-500">Diagnostic reports will be sent to this email address after each session.</p>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="api" 
              checked={presentation.includes('api')}
              onCheckedChange={() => handleChange('api')}
            />
            <Label htmlFor="api">API</Label>
          </div>
          {presentation.includes('api') && (
            <div className="ml-6 space-y-2">
              <Input 
                type="text" 
                placeholder="Enter additional API parameters" 
                value={apiParameters}
                onChange={(e) => setApiParameters(e.target.value)}
              />
              <p className="text-sm text-gray-500">
                Specify additional parameters to be sent along with the diagnostic data via API.
                Format: key1=value1&key2=value2
              </p>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="pdf" 
              checked={presentation.includes('pdf')}
              onCheckedChange={() => handleChange('pdf')}
            />
            <Label htmlFor="pdf">PDF</Label>
          </div>
          <p className="text-sm text-gray-500 ml-6">Generate a downloadable PDF report after each diagnostic session.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualizationConfig;