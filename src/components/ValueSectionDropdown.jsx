import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ValueSectionDropdown = ({ title, defaultValues }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [customValue, setCustomValue] = useState('');

  const handleValueChange = (value) => {
    setSelectedValues(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const handleAddCustomValue = () => {
    if (customValue && !selectedValues.includes(customValue)) {
      setSelectedValues(prev => [...prev, customValue]);
      setCustomValue('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {defaultValues.map(value => (
        <div key={value} className="flex items-center mb-2">
          <Checkbox
            id={`${title}-${value}`}
            checked={selectedValues.includes(value)}
            onCheckedChange={() => handleValueChange(value)}
          />
          <label htmlFor={`${title}-${value}`} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {value}
          </label>
        </div>
      ))}
      <div className="mt-4">
        <Input
          placeholder="Add custom value"
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleAddCustomValue} variant="outline">Add Custom Value</Button>
      </div>
    </div>
  );
};

export default ValueSectionDropdown;