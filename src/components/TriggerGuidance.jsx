import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TriggerGuidance = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trigger Guidance</CardTitle>
        <CardDescription>Learn when and how to initiate an HV-Check</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          <li>Perform an HV-Check after any work on the high-voltage system</li>
          <li>Conduct regular HV-Checks as part of routine maintenance</li>
          <li>Initiate an HV-Check if any battery or electrical system warnings appear</li>
          <li>Always perform an HV-Check before and after software updates</li>
          <li>Consider an HV-Check after any collision, even if minor</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default TriggerGuidance;