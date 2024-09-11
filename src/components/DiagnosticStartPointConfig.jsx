import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DiagnosticStartPointConfig = ({ startPoint, setStartPoint }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Diagnostic Start Point</CardTitle>
        <CardDescription>Choose how to initiate the diagnostic session</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={startPoint} onValueChange={setStartPoint}>
          <div className="flex items-center space-x-2 mb-4">
            <RadioGroupItem value="vci" id="vci" />
            <div>
              <Label htmlFor="vci" className="font-medium">VCI (Vehicle Communication Interface)</Label>
              <p className="text-sm text-gray-500">
                Automatically triggers when connected to the vehicle. Ensures consistent and standardized checks.
                This option is ideal for routine diagnostics and provides a seamless start to the process.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ui" id="ui" />
            <div>
              <Label htmlFor="ui" className="font-medium">UI (User Interface)</Label>
              <p className="text-sm text-gray-500">
                Manually initiated through the app. Offers flexibility but requires user action to start the check.
                This option is useful for specific diagnostic needs or when you want more control over the process initiation.
              </p>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default DiagnosticStartPointConfig;