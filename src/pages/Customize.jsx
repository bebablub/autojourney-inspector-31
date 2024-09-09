import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Navigation from '../components/Navigation';
import ValueSectionDropdown from '../components/ValueSectionDropdown';

const Customize = () => {
  const [selectedModules, setSelectedModules] = useState({
    carAndReportBasicInfo: true,
    compactOverview: true,
    safetyValues: true,
    batteryValues: true,
    troubleCodes: true,
    disclaimer: true
  });

  const [overviewLogic, setOverviewLogic] = useState('');

  const handleModuleChange = (moduleName) => {
    setSelectedModules(prev => ({
      ...prev,
      [moduleName]: !prev[moduleName]
    }));
  };

  const handleSave = () => {
    console.log('Saved configuration:', { selectedModules, overviewLogic });
    // Here you would typically send this data to your backend or state management system
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Customize HV-Check Report</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Modules</h2>
          {Object.entries(selectedModules).map(([key, value]) => (
            <div key={key} className="flex items-center mb-2">
              <Checkbox
                id={key}
                checked={value}
                onCheckedChange={() => handleModuleChange(key)}
              />
              <label htmlFor={key} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {key.split(/(?=[A-Z])/).join(" ")}
              </label>
            </div>
          ))}
        </div>

        {selectedModules.safetyValues && (
          <ValueSectionDropdown title="Safety Values" />
        )}

        {selectedModules.batteryValues && (
          <ValueSectionDropdown title="Battery Values" />
        )}

        {selectedModules.troubleCodes && (
          <ValueSectionDropdown title="Trouble Codes" />
        )}

        {selectedModules.compactOverview && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Configure Overview Logic</h2>
            <Input
              placeholder="Enter logic for overview generation"
              value={overviewLogic}
              onChange={(e) => setOverviewLogic(e.target.value)}
              className="mb-4"
            />
          </div>
        )}

        <Button onClick={handleSave} className="mt-4">Save Configuration</Button>
      </div>
    </div>
  );
};

export default Customize;