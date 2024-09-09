import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";

const ModuleSelection = ({ selectedModules, setSelectedModules }) => {
  const handleModuleChange = (moduleName) => {
    setSelectedModules(prev => ({
      ...prev,
      [moduleName]: !prev[moduleName]
    }));
  };

  return (
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
  );
};

export default ModuleSelection;