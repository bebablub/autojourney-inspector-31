import React from 'react';

const PDFPreview = ({ selectedModules }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">PDF Preview</h2>
      <div className="border-2 border-gray-300 p-4 rounded-lg">
        <div className="bg-gray-100 p-2 mb-2 rounded">
          <h3 className="font-bold">HV-Check Report</h3>
        </div>
        {selectedModules.carAndReportBasicInfo && (
          <div className="bg-gray-100 p-2 mb-2 rounded">
            <h4 className="font-semibold">Car and Report Basic Info</h4>
            <p className="text-sm">VIN, Make, Model, Year, etc.</p>
          </div>
        )}
        {selectedModules.compactOverview && (
          <div className="bg-gray-100 p-2 mb-2 rounded">
            <h4 className="font-semibold">Compact Overview</h4>
            <p className="text-sm">Overall health status based on configured logic</p>
          </div>
        )}
        {selectedModules.safetyValues && (
          <div className="bg-gray-100 p-2 mb-2 rounded">
            <h4 className="font-semibold">Safety Values</h4>
            <p className="text-sm">Insulation resistance, HV interlock, etc.</p>
          </div>
        )}
        {selectedModules.batteryValues && (
          <div className="bg-gray-100 p-2 mb-2 rounded">
            <h4 className="font-semibold">Battery Values</h4>
            <p className="text-sm">State of Charge, State of Health, etc.</p>
          </div>
        )}
        {selectedModules.troubleCodes && (
          <div className="bg-gray-100 p-2 mb-2 rounded">
            <h4 className="font-semibold">Trouble Codes</h4>
            <p className="text-sm">Active DTCs, Pending DTCs, etc.</p>
          </div>
        )}
        {selectedModules.disclaimer && (
          <div className="bg-gray-100 p-2 mb-2 rounded">
            <h4 className="font-semibold">Disclaimer</h4>
            <p className="text-sm">Legal disclaimer text</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFPreview;