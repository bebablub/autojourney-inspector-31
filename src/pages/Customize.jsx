import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGame } from '../contexts/GameContext';
import { useToast } from "@/components/ui/use-toast";
import DiagnosticStartPointConfig from '../components/DiagnosticStartPointConfig';
import ProtocolDesignConfig from '../components/ProtocolDesignConfig';
import HVCheckConfig from '../components/HVCheckConfig';
import ModuleCard from '../components/ModuleCard';
import VisualizationConfig from '../components/VisualizationConfig';
import { motion } from 'framer-motion';

const Customize = () => {
  const [activeConfig, setActiveConfig] = useState(null);
  const [diagnosticStartPoint, setDiagnosticStartPoint] = useState('vci');
  const [protocolDesign, setProtocolDesign] = useState({
    logo: null,
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    moduleOrder: ['carAndReportBasicInfo', 'compactOverview', 'safetyValues', 'batteryValues', 'troubleCodes', 'disclaimer', 'guidedDisconnect', 'measurementResults', 'completedSteps']
  });
  const [resultPresentation, setResultPresentation] = useState(['ui']);
  const [activatedModules, setActivatedModules] = useState(['carAndReportBasicInfo', 'compactOverview', 'safetyValues', 'batteryValues', 'troubleCodes', 'disclaimer', 'guidedDisconnect']);

  const { incrementConfigSaves, configSaves } = useGame();
  const { toast } = useToast();

  const handleSave = () => {
    console.log('Saved configuration:', { 
      diagnosticStartPoint, 
      protocolDesign,
      resultPresentation,
      activatedModules
    });
    incrementConfigSaves();

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

  const renderConfigContent = () => {
    switch (activeConfig) {
      case 'startPoint':
        return <DiagnosticStartPointConfig startPoint={diagnosticStartPoint} setStartPoint={setDiagnosticStartPoint} />;
      case 'protocolDesign':
        return <ProtocolDesignConfig design={protocolDesign} setDesign={setProtocolDesign} activatedModules={activatedModules} />;
      case 'hvModule':
        return <HVCheckConfig design={protocolDesign} />;
      case 'manipulationModule':
        return <ModuleCard 
          title="Manipulation Module"
          problem="Unauthorized changes to vehicle systems can compromise safety and performance."
          solution="Our Manipulation Detection Module uses advanced algorithms to identify and report any unauthorized modifications, ensuring the integrity of your vehicle's systems."
        />;
      case 'crashModule':
        return <ModuleCard 
          title="Crash Module"
          problem="Traditional crash analysis methods often lack real-time data and comprehensive insights."
          solution="Our Crash Module provides instant, detailed crash data analysis, improving safety assessments and facilitating quicker, more informed responses to incidents."
        />;
      case 'guidedHVDisconnectModule':
        return <ModuleCard 
          title="Guided HV Disconnect Module"
          problem="Disconnecting high-voltage systems can be complex and dangerous without proper guidance."
          solution="Our step-by-step HV Disconnect Guide ensures safe and efficient disconnection procedures, minimizing risks and streamlining maintenance processes."
        />;
      case 'visualization':
        return <VisualizationConfig presentation={resultPresentation} setPresentation={setResultPresentation} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Customize Diagnostics</h1>
      
      {activeConfig ? (
        <>
          <Button onClick={() => setActiveConfig(null)} variant="outline">Back to Overview</Button>
          {renderConfigContent()}
          <Button onClick={handleSave} className="w-full">Save Configuration</Button>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {configOptions.map((option) => (
            <motion.div
              key={option.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow" 
                onClick={() => setActiveConfig(option.id)}
              >
                <CardHeader>
                  <CardTitle>{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Customize;
