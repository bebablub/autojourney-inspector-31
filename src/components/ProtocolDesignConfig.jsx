import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PDFPreview from './PDFPreview';

const ProtocolDesignConfig = ({ selectedModules, setSelectedModules }) => {
  const [logo, setLogo] = useState(null);
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(Object.keys(selectedModules));
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const newSelectedModules = {};
    items.forEach(item => {
      newSelectedModules[item] = selectedModules[item];
    });

    setSelectedModules(newSelectedModules);
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
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="modules">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                  {Object.keys(selectedModules).map((key, index) => (
                    <Draggable key={key} draggableId={key} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-gray-100 p-2 rounded"
                        >
                          {key.split(/(?=[A-Z])/).join(" ")}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
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