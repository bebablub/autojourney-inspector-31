import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGame } from '../contexts/GameContext';
import { useToast } from "@/components/ui/use-toast";
import DiagnosticStartPointConfig from '../components/DiagnosticStartPointConfig';
import ProtocolDesignConfig from '../components/ProtocolDesignConfig';
import VisualizationConfig from '../components/VisualizationConfig';
import { motion } from 'framer-motion';
import { Settings2Icon, FileTextIcon, EyeIcon } from 'lucide-react';

const Customize = () => {
  const [activeConfig, setActiveConfig] = useState(null);
  const [diagnosticStartPoint, setDiagnosticStartPoint] = useState('vci');
  const [protocolDesign, setProtocolDesign] = useState({
    logo: null,
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    moduleOrder: ['hvCheck', 'evaluate', 'workSafeGuided', 'mileageCheck'],
    modules: {
      hvCheck: {
        title: "HV-Check",
        active: true,
        values: {
          "State of Charge (SoC)": true,
          "State of Health (SoH)": true,
          "Cell voltages": true,
          "Temperature distribution": true,
          "Capacity": true,
          "Internal resistance": true
        }
      },
      evaluate: {
        title: "Evaluate",
        active: true,
        values: {
          "Overall condition": true,
          "Battery health": true,
          "Maintenance history": true,
          "Performance metrics": true
        }
      },
      workSafeGuided: {
        title: "workSafe Guided",
        active: true,
        values: {
          "Safety steps completed": true,
          "Personal protective equipment": true,
          "HV system deactivation": true,
          "Voltage-free state verification": true
        }
      },
      mileageCheck: {
        title: "Mileage Check",
        active: true,
        values: {
          "Current mileage": true,
          "Last known mileage": true,
          "Average monthly mileage": true,
          "Mileage plausibility": true
        }
      }
    },
    overviewLogic: "SoC > 80% && InsulationResistance > 100 kΩ"
  });
  const [resultPresentation, setResultPresentation] = useState(['ui']);

  const { incrementConfigSaves, configSaves } = useGame();
  const { toast } = useToast();

  const handleSave = () => {
    console.log('Saved configuration:', { 
      diagnosticStartPoint, 
      protocolDesign,
      resultPresentation
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

  const renderConfigContent = () => {
    switch (activeConfig) {
      case 'startPoint':
        return <DiagnosticStartPointConfig startPoint={diagnosticStartPoint} setStartPoint={setDiagnosticStartPoint} />;
      case 'protocolDesign':
        return <ProtocolDesignConfig design={protocolDesign} setDesign={setProtocolDesign} activatedModules={Object.keys(protocolDesign.modules).filter(key => protocolDesign.modules[key].active)} />;
      case 'visualization':
        return <VisualizationConfig presentation={resultPresentation} setPresentation={setResultPresentation} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Customize HV-Check</h1>
      
      {activeConfig ? (
        <>
          <Button onClick={() => setActiveConfig(null)} variant="outline">Back to Overview</Button>
          {renderConfigContent()}
          <Button onClick={handleSave} className="w-full">Save Configuration</Button>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Customize;
