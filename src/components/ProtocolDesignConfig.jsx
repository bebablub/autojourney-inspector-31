import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from "@/components/ui/card";
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

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Card className="w-full md:w-1/2 p-4">
        <CardContent>
          <div className="space-y-4">
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
                      {key.split(/(?=[A-Z])/).join(" ")}
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
