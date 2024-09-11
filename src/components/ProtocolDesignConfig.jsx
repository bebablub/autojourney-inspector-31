import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

const ProtocolDesignConfig = ({ selectedModules, setSelectedModules }) => {
  const [logo, setLogo] = useState(null);
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSelectedModules((items) => {
        const oldIndex = Object.keys(items).indexOf(active.id);
        const newIndex = Object.keys(items).indexOf(over.id);
        
        const newOrder = arrayMove(Object.keys(items), oldIndex, newIndex);
        const newItems = {};
        newOrder.forEach(key => {
          newItems[key] = items[key];
        });
        
        return newItems;
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Protocol Design</CardTitle>
          <CardDescription>Customize the appearance and order of your diagnostic protocol</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="logo">Upload Logo</Label>
              <Input id="logo" type="file" onChange={(e) => setLogo(e.target.files[0])} />
            </div>
            <div>
              <Label htmlFor="primaryColor">Primary Color</Label>
              <Input id="primaryColor" type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <Input id="secondaryColor" type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Module Order</CardTitle>
          <CardDescription>Drag and drop to reorder modules</CardDescription>
        </CardHeader>
        <CardContent>
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={Object.keys(selectedModules)} strategy={verticalListSortingStrategy}>
              <ul className="space-y-2">
                {Object.keys(selectedModules).map((key) => (
                  <SortableItem key={key} id={key}>
                    {key.split(/(?=[A-Z])/).join(" ")}
                  </SortableItem>
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>PDF Preview</CardTitle>
          <CardDescription>See how your protocol will look</CardDescription>
        </CardHeader>
        <CardContent>
          <PDFPreview 
            selectedModules={selectedModules} 
            logo={logo} 
            primaryColor={primaryColor} 
            secondaryColor={secondaryColor} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProtocolDesignConfig;