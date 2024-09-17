import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGame } from '../contexts/GameContext';
import { useToast } from "@/components/ui/use-toast";
import DiagnosticStartPointConfig from '../components/DiagnosticStartPointConfig';
import ProtocolDesignConfig from '../components/ProtocolDesignConfig';
import VisualizationConfig from '../components/VisualizationConfig';
import ModuleCard from '../components/ModuleCard';
import { motion } from 'framer-motion';
import { Settings2Icon, FileTextIcon, EyeIcon, ZapIcon, ActivityIcon, CarIcon, ClipboardCheckIcon, AlertTriangleIcon, CodeIcon, ClockIcon, RulerIcon, HashIcon } from 'lucide-react';

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
  const [activatedModules, setActivatedModules] = useState(['HV-Check', 'Evaluate', 'workSafe Guided', 'Mileage Check']);

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

  const baseConfigOptions = [
    { id: 'startPoint', title: 'Diagnostic Starting Point', description: 'Configure how the diagnostic session is initiated', icon: Settings2Icon },
    { id: 'protocolDesign', title: 'Protocol Design', description: 'Customize the style, logo, and module order of your protocol', icon: FileTextIcon },
    { id: 'visualization', title: 'Visualization', description: 'Choose and configure how results are presented', icon: EyeIcon },
  ];

  const moduleOptions = [
    { id: 'hvCheck', title: 'HV-Check', description: 'Comprehensive high-voltage system diagnostics', icon: ZapIcon, active: true },
    { id: 'evaluate', title: 'Evaluate', description: 'Advanced vehicle evaluation and analysis', icon: ActivityIcon, active: true },
    { id: 'workSafeGuided', title: 'workSafe Guided', description: 'Step-by-step safety procedures for technicians', icon: ClipboardCheckIcon, active: true },
    { id: 'guidedDisconnect', title: 'Guided Disconnect', description: 'Safe high-voltage system disconnection guide', icon: CarIcon, active: false },
    { id: 'maintenanceCheck', title: 'Maintenance Check', description: 'Routine vehicle maintenance diagnostics', icon: WrenchIcon, active: false },
    { id: 'crashCheck', title: 'Crash Check', description: 'Post-accident vehicle analysis', icon: AlertTriangleIcon, active: false },
    { id: 'troubleCodeCheck', title: 'Trouble Code Check', description: 'Comprehensive DTC analysis', icon: CodeIcon, active: false },
    { id: 'timePlausibilityCheck', title: 'Time Plausibility Check', description: 'Verify time-based vehicle data', icon: ClockIcon, active: false },
    { id: 'mileageCheck', title: 'Mileage Check', description: 'Odometer and mileage verification', icon: RulerIcon, active: true },
    { id: 'vinCheck', title: 'VIN Check', description: 'Vehicle Identification Number verification', icon: HashIcon, active: false },
  ];

  const renderConfigContent = () => {
    switch (activeConfig) {
      case 'startPoint':
        return <DiagnosticStartPointConfig startPoint={diagnosticStartPoint} setStartPoint={setDiagnosticStartPoint} />;
      case 'protocolDesign':
        return <ProtocolDesignConfig design={protocolDesign} setDesign={setProtocolDesign} activatedModules={activatedModules} />;
      case 'visualization':
        return <VisualizationConfig presentation={resultPresentation} setPresentation={setResultPresentation} />;
      default:
        const module = moduleOptions.find(m => m.id === activeConfig);
        if (module) {
          return <ModuleCard 
            title={module.title}
            description={module.description}
            icon={module.icon}
            active={module.active}
          />;
        }
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
        <>
          <h2 className="text-2xl font-semibold mb-4">Base Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {baseConfigOptions.map((option) => (
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
                    <option.icon className="w-8 h-8 mb-2 text-primary" />
                    <CardTitle>{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <h2 className="text-2xl font-semibold mb-4">Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {moduleOptions.map((option) => (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Card 
                  className={`cursor-pointer hover:shadow-lg transition-shadow ${option.active ? '' : 'opacity-50'}`}
                  onClick={() => setActiveConfig(option.id)}
                >
                  <CardHeader>
                    <option.icon className="w-8 h-8 mb-2 text-primary" />
                    <CardTitle>{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Customize;
