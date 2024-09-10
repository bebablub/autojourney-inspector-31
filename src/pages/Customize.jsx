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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold">Customize HV-Check</h1>
      
      <Tabs defaultValue="protocol" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="protocol">HV-Check Protocol</TabsTrigger>
          <TabsTrigger value="hvcheck">HV-Check Report</TabsTrigger>
          <TabsTrigger value="manipulation">Manipulation Report</TabsTrigger>
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
        </TabsList>
        <TabsContent value="protocol">
          <HVCheckProtocolConfig protocol={hvCheckProtocol} setProtocol={setHVCheckProtocol} />
        </TabsContent>
        <TabsContent value="hvcheck">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
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
            </div>
            <div>
              <PDFPreview selectedModules={selectedModules} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="manipulation">
          <ManipulationReportConfig />
        </TabsContent>
        <TabsContent value="visualization">
          <VisualizationConfig 
            presentation={resultPresentation} 
            setPresentation={setResultPresentation} 
          />
        </TabsContent>
      </Tabs>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button onClick={handleSave} className="w-full">Save Configuration</Button>
      </motion.div>
      
      {showConfetti && <ConfettiAnimation />}
    </motion.div>
  );
};

export default Customize;