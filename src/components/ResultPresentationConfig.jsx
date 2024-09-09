import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ResultPresentationConfig = ({ presentation, setPresentation }) => {
  const handleChange = (value) => {
    setPresentation(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Result Presentation</h2>
      {['ui', 'mail', 'api'].map(option => (
        <div key={option} className="flex items-center space-x-2 mb-2">
          <Checkbox 
            id={option} 
            checked={presentation.includes(option)}
            onCheckedChange={() => handleChange(option)}
          />
          <Label htmlFor={option}>{option.toUpperCase()}</Label>
        </div>
      ))}
    </div>
  );
};

export default ResultPresentationConfig;