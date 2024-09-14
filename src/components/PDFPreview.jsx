import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PDFPreview = ({ design, activatedModules }) => {
  const { logo, primaryColor, secondaryColor, moduleOrder } = design;

  const renderModule = (moduleName) => {
    if (!activatedModules.includes(moduleName)) return null;

    const moduleContent = {
      carAndReportBasicInfo: {
        title: "Car and Report Info",
        content: "VIN, Make, Model, Year, etc."
      },
      compactOverview: {
        title: "Compact Overview",
        content: "Key diagnostic results"
      },
      safetyValues: {
        title: "Safety Values",
        content: "Insulation resistance, HV interlock, etc."
      },
      batteryValues: {
        title: "Battery Values",
        content: "SoC, SoH, Cell voltages, etc."
      },
      troubleCodes: {
        title: "Trouble Codes",
        content: "Active DTCs, Pending DTCs, etc."
      },
      disclaimer: {
        title: "Disclaimer",
        content: "Legal information and disclaimers"
      },
      guidedDisconnect: {
        title: "Guided HV Disconnect",
        content: "Step-by-step guide for HV system disconnection"
      },
      measurementResults: {
        title: "Measurement Results",
        content: "Detailed measurement data and analysis"
      },
      completedSteps: {
        title: "Completed Steps",
        content: "Overview of completed diagnostic steps"
      }
    };

    const { title, content } = moduleContent[moduleName] || {};

    return (
      <Card key={moduleName} className="mb-4 shadow-sm">
        <CardHeader className="py-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <p className="text-xs text-muted-foreground">{content}</p>
        </CardContent>
      </Card>
    );
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
