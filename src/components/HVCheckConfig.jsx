import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModuleSelection from './ModuleSelection';
import ValueSectionDropdown from './ValueSectionDropdown';
import CarReportInfoConfig from './CarReportInfoConfig';
import OverviewLogicConfig from './OverviewLogicConfig';
import PDFPreview from './PDFPreview';

const HVCheckConfig = () => {
  const [selectedModules, setSelectedModules] = useState({
    carAndReportBasicInfo: true,
    compactOverview: true,
    safetyValues: true,
    batteryValues: true,
    troubleCodes: true,
    disclaimer: true
  });
  const [overviewLogic, setOverviewLogic] = useState('');
  const [safetyValues, setSafetyValues] = useState([]);
  const [batteryValues, setBatteryValues] = useState([]);
  const [troubleCodes, setTroubleCodes] = useState([]);

  const design = {
    logo: null,
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    moduleOrder: ['carAndReportBasicInfo', 'compactOverview', 'safetyValues', 'batteryValues', 'troubleCodes', 'disclaimer']
  };

  return (
    <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
      <div className="w-full lg:w-1/2">
        <Tabs defaultValue="modules" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="values">Values</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>
          <TabsContent value="modules">
            <ModuleSelection selectedModules={selectedModules} setSelectedModules={setSelectedModules} />
            {selectedModules.carAndReportBasicInfo && <CarReportInfoConfig />}
          </TabsContent>
          <TabsContent value="values">
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
                selectedValues={safetyValues}
                setSelectedValues={setSafetyValues}
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
                selectedValues={batteryValues}
                setSelectedValues={setBatteryValues}
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
                selectedValues={troubleCodes}
                setSelectedValues={setTroubleCodes}
              />
            )}
          </TabsContent>
          <TabsContent value="overview">
            <OverviewLogicConfig overviewLogic={overviewLogic} setOverviewLogic={setOverviewLogic} />
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-full lg:w-1/2">
        <PDFPreview design={design} selectedModules={Object.keys(selectedModules).filter(key => selectedModules[key])} />
      </div>
    </div>
  );
};

export default HVCheckConfig;
