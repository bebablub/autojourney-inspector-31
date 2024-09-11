import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import ValueSectionDropdown from '../components/ValueSectionDropdown';
import CarReportInfoConfig from '../components/CarReportInfoConfig';
import PDFPreview from '../components/PDFPreview';
import ModuleSelection from '../components/ModuleSelection';
import OverviewLogicConfig from '../components/OverviewLogicConfig';
import DiagnosticStartPointConfig from '../components/DiagnosticStartPointConfig';
import VisualizationConfig from '../components/VisualizationConfig';
import ProtocolDesignConfig from '../components/ProtocolDesignConfig';
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
  const [diagnosticStartPoint, setDiagnosticStartPoint] = useState('vci');
  const [resultPresentation, setResultPresentation] = useState(['ui']);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeConfig, setActiveConfig] = useState(null);

  const { incrementConfigSaves, configSaves } = useGame();
  const { toast } = useToast();

  const handleSave = () => {
    console.log('Saved configuration:', { 
      selectedModules, 
      overviewLogic, 
      diagnosticStartPoint, 
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
    { id: 'startPoint', title: 'Diagnostic Starting Point', description: 'Configure how the diagnostic session is initiated' },
    { id: 'protocolDesign', title: 'Protocol Design', description: 'Customize the style, logo, and module order of your protocol' },
    { id: 'hvModule', title: 'HV-Check Module', description: 'Configure the HV-Check information module' },
    { id: 'manipulationModule', title: 'Manipulation Module', description: 'Set up manipulation detection module' },
    { id: 'crashModule', title: 'Crash Module', description: 'Configure crash detection and analysis' },
    { id: 'guidedHVDisconnectModule', title: 'Guided HV Disconnect Module', description: 'Step-by-step HV system disconnection guide' },
    { id: 'visualization', title: 'Visualization', description: 'Choose and configure how results are presented' },
  ];

  const renderModuleCard = (module) => (
    <Card key={module.id} className="mb-6">
      <CardHeader>
        <CardTitle>{module.title}</CardTitle>
        <CardDescription>{module.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          {module.id === 'manipulationModule' && "Detect and report unauthorized changes to vehicle systems."}
          {module.id === 'crashModule' && "Analyze crash data for improved safety and incident reconstruction."}
          {module.id === 'guidedHVDisconnectModule' && "Provide step-by-step guidance for safely disconnecting HV systems."}
        </p>
        <Button>Purchase Module</Button>
      </CardContent>
    </Card>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold">Customize Diagnostics</h1>
      
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
      
      {activeConfig === 'startPoint' && (
        <DiagnosticStartPointConfig startPoint={diagnosticStartPoint} setStartPoint={setDiagnosticStartPoint} />
      )}
      
      {activeConfig === 'protocolDesign' && (
        <div className="flex space-x-4">
          <div className="w-1/2">
            <ProtocolDesignConfig selectedModules={selectedModules} setSelectedModules={setSelectedModules} />
          </div>
          <div className="w-1/2">
            <PDFPreview selectedModules={selectedModules} />
          </div>
        </div>
      )}
      
      {activeConfig === 'hvModule' && (
        <div className="flex space-x-4">
          <div className="w-1/2">
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
              <TabsContent value="overview">
                <OverviewLogicConfig overviewLogic={overviewLogic} setOverviewLogic={setOverviewLogic} />
              </TabsContent>
            </Tabs>
          </div>
          <div className="w-1/2">
            <PDFPreview selectedModules={selectedModules} />
          </div>
        </div>
      )}
      
      {activeConfig === 'manipulationModule' && renderModuleCard(configOptions.find(o => o.id === 'manipulationModule'))}
      
      {activeConfig === 'crashModule' && renderModuleCard(configOptions.find(o => o.id === 'crashModule'))}
      
      {activeConfig === 'guidedHVDisconnectModule' && renderModuleCard(configOptions.find(o => o.id === 'guidedHVDisconnectModule'))}
      
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
    </motion.div>
  );
};

export default Customize;