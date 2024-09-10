import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HVCheckProtocolConfig = ({ protocol, setProtocol }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>HV-Check Protocol</CardTitle>
        <CardDescription>Choose how to initiate the HV-Check</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={protocol} onValueChange={setProtocol}>
          <div className="flex items-center space-x-2 mb-4">
            <RadioGroupItem value="vci" id="vci" />
            <div>
              <Label htmlFor="vci" className="font-medium">VCI (Vehicle Communication Interface)</Label>
              <p className="text-sm text-gray-500">Automatically triggers when connected to the vehicle. Ensures consistent and standardized checks.</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ui" id="ui" />
            <div>
              <Label htmlFor="ui" className="font-medium">UI (User Interface)</Label>
              <p className="text-sm text-gray-500">Manually initiated through the app. Offers flexibility but requires user action to start the check.</p>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default HVCheckProtocolConfig;