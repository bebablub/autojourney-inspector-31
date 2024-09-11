import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PDFPreview from './PDFPreview';

const SortableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-gray-100 p-2 rounded mb-2 cursor-move">
      {children}
    </li>
  );
};

const ProtocolDesignConfig = ({ design, setDesign }) => {
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
    <div className="flex space-x-4">
      <div className="w-1/2 space-y-4">
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
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={design.moduleOrder} strategy={verticalListSortingStrategy}>
              <ul className="space-y-2">
                {design.moduleOrder.map((key) => (
                  <SortableItem key={key} id={key}>
                    {key.split(/(?=[A-Z])/).join(" ")}
                  </SortableItem>
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </div>
      </div>
      <div className="w-1/2">
        <PDFPreview design={design} />
      </div>
    </div>
  );
};

export default ProtocolDesignConfig;