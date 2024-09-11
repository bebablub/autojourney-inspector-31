import React from 'react';

const PDFPreview = ({ design }) => {
  const { logo, primaryColor, secondaryColor, moduleOrder } = design;

  const renderModule = (moduleName) => {
    switch (moduleName) {
      case 'carAndReportBasicInfo':
        return (
          <div className="bg-gray-100 p-2 mb-2 rounded">
            <h4 className="font-semibold">Car and Report Info</h4>
            <p className="text-sm">VIN, Make, Model, Year, etc.</p>
          </div>
        );
      case 'compactOverview':
        return (
          <div className="bg-gray-100 p-2 mb-2 rounded">
            <h4 className="font-semibold">Compact Overview</h4>
            <p className="text-sm">Key diagnostic results</p>
          </div>
        );
      case 'safetyValues':
        return (
          <div className="bg-gray-100 p-2 mb-2 rounded">
            <h4 className="font-semibold">Safety Values</h4>
            <p className="text-sm">Insulation resistance, HV interlock, etc.</p>
          </div>
        );
      case 'batteryValues':
        return (
          <div className="bg-gray-100 p-2 mb-2 rounded">
            <h4 className="font-semibold">Battery Values</h4>
            <p className="text-sm">SoC, SoH, Cell voltages, etc.</p>
          </div>
        );
      case 'troubleCodes':
        return (
          <div className="bg-gray-100 p-2 mb-2 rounded">
            <h4 className="font-semibold">Trouble Codes</h4>
            <p className="text-sm">Active DTCs, Pending DTCs, etc.</p>
          </div>
        );
      case 'disclaimer':
        return (
          <div className="bg-gray-100 p-2 mb-2 rounded">
            <h4 className="font-semibold">Disclaimer</h4>
            <p className="text-sm">Legal information and disclaimers</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border-2 border-gray-300 p-4 rounded-lg" style={{ backgroundColor: secondaryColor, color: primaryColor }}>
      {logo && <img src={logo} alt="Company Logo" className="mb-4 max-w-full h-auto" />}
      <h2 className="text-2xl font-bold mb-4">HV-CHECK Diagnostic Report</h2>
      {moduleOrder.map((moduleName) => renderModule(moduleName))}
    </div>
  );
};

export default PDFPreview;