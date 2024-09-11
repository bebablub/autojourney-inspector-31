import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import ValueSectionDropdown from '../components/ValueSectionDropdown';
import CarReportInfoConfig from '../components/CarReportInfoConfig';
import PDFPreview from '../components/PDFPreview';
import ModuleSelection from '../components/ModuleSelection';
import OverviewLogicConfig from '../components/OverviewLogicConfig';
import HVCheckProtocolConfig from '../components/HVCheckProtocolConfig';
import ResultPresentationConfig from '../components/ResultPresentationConfig';
import ConfettiAnimation from '../components/ConfettiAnimation';
import ManipulationReportConfig from '../components/ManipulationReportConfig';
import VisualizationConfig from '../components/VisualizationConfig';
import { useGame } from '../contexts/GameContext';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeConfig, setActiveConfig] = useState(null);

  const { incrementConfigSaves, configSaves } = useGame();
  const { toast } = useToast();

  const handleSave = () => {
    console.log('Saved configuration:', { 
      selectedModules, 
      overviewLogic, 
      hvCheckProtocol, 
      resultPresentation 
    });
    incrementConfigSaves();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    toast({
      title: "Configuration Saved!",
      description: `You've saved ${configSaves + 1} configurations. Keep it up!`,
    });

    if (configSaves + 1 === 5) {
      toast({
        title: "Achievement Unlocked!",
        description: "Configuration Master - You've saved 5 configurations!",
        variant: "success",
      });
    }
  };

  const configOptions = [
    { id: 'protocol', title: 'HV-Check Protocol', description: 'Configure how the HV-Check is initiated' },
    { id: 'report', title: 'HV-Check Report', description: 'Customize the contents of the HV-Check report' },
    { id: 'manipulation', title: 'Manipulation Report', description: 'Set up manipulation detection settings' },
    { id: 'visualization', title: 'Visualization', description: 'Choose how results are presented' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold">Customize HV-Check</h1>
      
      {activeConfig ? (
        <Button onClick={() => setActiveConfig(null)} variant="outline">Back to Overview</Button>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {configOptions.map((option) => (
            <Card key={option.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveConfig(option.id)}>
              <CardHeader>
                <CardTitle>{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
      
      {activeConfig === 'protocol' && (
        <HVCheckProtocolConfig protocol={hvCheckProtocol} setProtocol={setHVCheckProtocol} />
      )}
      
      {activeConfig === 'report' && (
        <Tabs defaultValue="modules" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="values">Values</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="modules">
            <ModuleSelection selectedModules={selectedModules} setSelectedModules={setSelectedModules} />
            {selectedModules.carAndReportBasicInfo && <CarReportInfoConfig />}
            {selectedModules.compactOverview && (
              <OverviewLogicConfig overviewLogic={overviewLogic} setOverviewLogic={setOverviewLogic} />
            )}
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
          </TabsContent>
          <TabsContent value="preview">
            <PDFPreview selectedModules={selectedModules} />
          </TabsContent>
        </Tabs>
      )}
      
      {activeConfig === 'manipulation' && (
        <ManipulationReportConfig />
      )}
      
      {activeConfig === 'visualization' && (
        <VisualizationConfig 
          presentation={resultPresentation} 
          setPresentation={setResultPresentation} 
        />
      )}
      
      {activeConfig && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button onClick={handleSave} className="w-full">Save Configuration</Button>
        </motion.div>
      )}
      
      {showConfetti && <ConfettiAnimation />}
    </motion.div>
  );
};

export default Customize;