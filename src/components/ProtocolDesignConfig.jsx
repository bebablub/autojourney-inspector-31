import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import PDFPreview from './PDFPreview';

const SortableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-secondary p-3 rounded mb-2 cursor-move hover:bg-secondary/80 transition-colors">
      {children}
    </div>
  );
};

const ProtocolDesignConfig = ({ design, setDesign, activatedModules }) => {
  const [activeTab, setActiveTab] = useState('hvCheck');
  const { toast } = useToast();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDesign({ ...design, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setDesign((prev) => {
        const oldIndex = prev.moduleOrder.indexOf(active.id);
        const newIndex = prev.moduleOrder.indexOf(over.id);
        
        return {
          ...prev,
          moduleOrder: arrayMove(prev.moduleOrder, oldIndex, newIndex),
        };
      });
    }
  };

  const handleModuleChange = (moduleName) => {
    setDesign(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleName]: {
          ...prev.modules[moduleName],
          active: !prev.modules[moduleName].active
        }
      }
    }));
  };

  const handleValueChange = (moduleName, valueName) => {
    setDesign(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleName]: {
          ...prev.modules[moduleName],
          values: {
            ...prev.modules[moduleName].values,
            [valueName]: !prev.modules[moduleName].values[valueName]
          }
        }
      }
    }));
  };

  const handleCustomValueAdd = (moduleName) => {
    const customValue = document.getElementById(`${moduleName}-customValue`).value;
    if (customValue) {
      setDesign(prev => ({
        ...prev,
        modules: {
          ...prev.modules,
          [moduleName]: {
            ...prev.modules[moduleName],
            values: {
              ...prev.modules[moduleName].values,
              [customValue]: true
            }
          }
        }
      }));
      document.getElementById(`${moduleName}-customValue`).value = '';
    }
  };

  const handleOverviewLogicChange = (e) => {
    setDesign(prev => ({
      ...prev,
      overviewLogic: e.target.value
    }));
  };

  const renderModuleConfig = (moduleName) => {
    const module = design.modules[moduleName];
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`module-${moduleName}`}
            checked={module.active}
            onCheckedChange={() => handleModuleChange(moduleName)}
          />
          <Label htmlFor={`module-${moduleName}`}>{module.title}</Label>
        </div>
        {module.active && (
          <div className="ml-6 space-y-2">
            {Object.entries(module.values).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={`${moduleName}-${key}`}
                  checked={value}
                  onCheckedChange={() => handleValueChange(moduleName, key)}
                />
                <Label htmlFor={`${moduleName}-${key}`}>{key}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Input
                id={`${moduleName}-customValue`}
                placeholder="Add custom value"
              />
              <Button onClick={() => handleCustomValueAdd(moduleName)}>Add</Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Card className="w-full md:w-1/2 p-4">
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="hvCheck">HV-Check</TabsTrigger>
              <TabsTrigger value="evaluate">Evaluate</TabsTrigger>
              <TabsTrigger value="workSafeGuided">WorkSafe Guided</TabsTrigger>
              <TabsTrigger value="mileageCheck">Mileage Check</TabsTrigger>
            </TabsList>
            <TabsContent value="hvCheck">
              {renderModuleConfig('hvCheck')}
            </TabsContent>
            <TabsContent value="evaluate">
              {renderModuleConfig('evaluate')}
            </TabsContent>
            <TabsContent value="workSafeGuided">
              {renderModuleConfig('workSafeGuided')}
            </TabsContent>
            <TabsContent value="mileageCheck">
              {renderModuleConfig('mileageCheck')}
            </TabsContent>
          </Tabs>
          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="overviewLogic">Configure Overview Logic</Label>
              <Input
                id="overviewLogic"
                placeholder="Enter logic for overview generation (e.g., SoC > 80% && InsulationResistance > 100 kΩ)"
                value={design.overviewLogic}
                onChange={handleOverviewLogicChange}
              />
            </div>
            <div>
              <Label htmlFor="logo">Upload Logo</Label>
              <Input id="logo" type="file" onChange={handleLogoChange} accept="image/*" />
            </div>
            <div>
              <Label htmlFor="primaryColor">Primary Color</Label>
              <Input 
                id="primaryColor" 
                type="color" 
                value={design.primaryColor} 
                onChange={(e) => setDesign({ ...design, primaryColor: e.target.value })} 
              />
            </div>
            <div>
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <Input 
                id="secondaryColor" 
                type="color" 
                value={design.secondaryColor} 
                onChange={(e) => setDesign({ ...design, secondaryColor: e.target.value })} 
              />
            </div>
            <div>
              <Label>Module Order (Drag to reorder)</Label>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={design.moduleOrder} strategy={verticalListSortingStrategy}>
                  {design.moduleOrder.map((key) => (
                    <SortableItem key={key} id={key}>
                      {design.modules[key].title}
                    </SortableItem>
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="w-full md:w-1/2">
        <PDFPreview design={design} activatedModules={activatedModules} />
      </div>
    </div>
  );
};

export default ProtocolDesignConfig;
