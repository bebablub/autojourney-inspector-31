import React from 'react';
import { Input } from "@/components/ui/input";

const OverviewLogicConfig = ({ overviewLogic, setOverviewLogic }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Configure Overview Logic</h2>
      <Input
        placeholder="Enter logic for overview generation (e.g., SoC > 80% && InsulationResistance > 100 kΩ)"
        value={overviewLogic}
        onChange={(e) => setOverviewLogic(e.target.value)}
        className="mb-4"
      />
    </div>
  );
};

export default OverviewLogicConfig;