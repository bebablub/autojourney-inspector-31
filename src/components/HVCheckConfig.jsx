import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const HVCheckConfig = () => {
  const [config, setConfig] = useState({
    testData: {
      date: true,
      protocolNumber: true
    },
    vehicleData: {
      make: true,
      model: true,
      mileage: true,
      vin: true
    },
    safetyIndicators: {
      isolationResistances: true,
      hvSystem: true
    },
    batteryInformation: {
      controllerData: true,
      temperatures: true
    },
    errorCodes: true
  });

  const handleConfigChange = (section, item) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      [section]: typeof prevConfig[section] === 'object'
        ? { ...prevConfig[section], [item]: !prevConfig[section][item] }
        : !prevConfig[section]
    }));
  };

  const renderCheckboxes = (section, items) => (
    <div className="space-y-2">
      {Object.entries(items).map(([key, value]) => (
        <div key={key} className="flex items-center space-x-2">
          <Checkbox
            id={`${section}-${key}`}
            checked={value}
            onCheckedChange={() => handleConfigChange(section, key)}
          />
          <Label htmlFor={`${section}-${key}`}>{key}</Label>
        </div>
      ))}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>HV-Check Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="testData">
          <TabsList>
            <TabsTrigger value="testData">Test Data</TabsTrigger>
            <TabsTrigger value="vehicleData">Vehicle Data</TabsTrigger>
            <TabsTrigger value="safetyIndicators">Safety Indicators</TabsTrigger>
            <TabsTrigger value="batteryInformation">Battery Information</TabsTrigger>
            <TabsTrigger value="errorCodes">Error Codes</TabsTrigger>
          </TabsList>
          <TabsContent value="testData">
            {renderCheckboxes('testData', config.testData)}
          </TabsContent>
          <TabsContent value="vehicleData">
            {renderCheckboxes('vehicleData', config.vehicleData)}
          </TabsContent>
          <TabsContent value="safetyIndicators">
            {renderCheckboxes('safetyIndicators', config.safetyIndicators)}
          </TabsContent>
          <TabsContent value="batteryInformation">
            {renderCheckboxes('batteryInformation', config.batteryInformation)}
          </TabsContent>
          <TabsContent value="errorCodes">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="errorCodes"
                checked={config.errorCodes}
                onCheckedChange={() => handleConfigChange('errorCodes')}
              />
              <Label htmlFor="errorCodes">Include Error Codes</Label>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HVCheckConfig;
