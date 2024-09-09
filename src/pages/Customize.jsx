import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Navigation from '../components/Navigation';
import ValueSectionDropdown from '../components/ValueSectionDropdown';
import CarReportInfoConfig from '../components/CarReportInfoConfig';
import PDFPreview from '../components/PDFPreview';
import ModuleSelection from '../components/ModuleSelection';
import OverviewLogicConfig from '../components/OverviewLogicConfig';
import HVCheckProtocolConfig from '../components/HVCheckProtocolConfig';
import ResultPresentationConfig from '../components/ResultPresentationConfig';

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
  const [hvCheckProtocol, setHVCheckProtocol] = useState('vci');
  const [resultPresentation, setResultPresentation] = useState(['ui']);

  const handleSave = () => {
    console.log('Saved configuration:', { 
      selectedModules, 
      overviewLogic, 
      hvCheckProtocol, 
      resultPresentation 
    });
    // Here you would typically send this data to your backend or state management system
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Customize HV-Check Report</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ModuleSelection selectedModules={selectedModules} setSelectedModules={setSelectedModules} />
            
            {selectedModules.carAndReportBasicInfo && <CarReportInfoConfig />}
            
            {selectedModules.safetyValues && (
              <ValueSectionDropdown 
                title="Safety Values" 
                defaultValues={[
                  'Insulation resistance',
                  'HV interlock',
                  'Isolation monitoring',
                  'Potential equalization',
                  'HV system status'
                ]}
              />
            )}
            
            {selectedModules.batteryValues && (
              <ValueSectionDropdown 
                title="Battery Values" 
                defaultValues={[
                  'State of Charge (SoC)',
                  'State of Health (SoH)',
                  'Cell voltages',
                  'Temperature distribution',
                  'Capacity',
                  'Internal resistance'
                ]}
              />
            )}
            
            {selectedModules.troubleCodes && (
              <ValueSectionDropdown 
                title="Trouble Codes" 
                defaultValues={[
                  'Active DTCs',
                  'Pending DTCs',
                  'Permanent DTCs',
                  'DTC description',
                  'Freeze frame data'
                ]}
              />
            )}
            
            {selectedModules.compactOverview && (
              <OverviewLogicConfig overviewLogic={overviewLogic} setOverviewLogic={setOverviewLogic} />
            )}
            
            <HVCheckProtocolConfig protocol={hvCheckProtocol} setProtocol={setHVCheckProtocol} />
            
            <ResultPresentationConfig 
              presentation={resultPresentation} 
              setPresentation={setResultPresentation} 
            />
            
            <Button onClick={handleSave} className="mt-4">Save Configuration</Button>
          </div>
          
          <div>
            <PDFPreview selectedModules={selectedModules} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;