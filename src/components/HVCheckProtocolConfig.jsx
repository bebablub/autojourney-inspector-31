import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const HVCheckProtocolConfig = ({ protocol, setProtocol }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">HV-Check Protocol</h2>
      <RadioGroup value={protocol} onValueChange={setProtocol}>
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="vci" id="vci" />
          <Label htmlFor="vci">VCI (when connected to the car)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="ui" id="ui" />
          <Label htmlFor="ui">UI (manual trigger)</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default HVCheckProtocolConfig;