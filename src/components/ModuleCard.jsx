import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ModuleCard = ({ title, description, icon: Icon, active }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Icon className="w-8 h-8 mr-2 text-primary" />
            <CardTitle>{title}</CardTitle>
          </div>
          <Switch id={`${title}-active`} checked={active} />
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">
          {description}
        </CardDescription>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id={`${title}-option1`} />
            <Label htmlFor={`${title}-option1`}>Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id={`${title}-option2`} />
            <Label htmlFor={`${title}-option2`}>Option 2</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id={`${title}-option3`} />
            <Label htmlFor={`${title}-option3`}>Option 3</Label>
          </div>
        </div>
        {!active && (
          <Button className="mt-4">Purchase Module</Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ModuleCard;
