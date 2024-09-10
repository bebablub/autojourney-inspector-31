import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightIcon, SettingsIcon, PlayIcon, FileTextIcon } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, linkTo }) => (
  <Card className="flex flex-col justify-between h-full transition-all duration-300 hover:shadow-lg">
    <CardHeader>
      <Icon className="w-10 h-10 mb-2 text-blue-500" />
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Link to={linkTo}>
        <Button variant="outline" className="w-full group">
          Get Started
          <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </Link>
    </CardContent>
  </Card>
);

const Index = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to HV-Check Diagnostic Tool</h1>
        <p className="text-xl text-gray-600 mb-8">
          Empower your automotive diagnostics with our comprehensive tool for modern vehicles.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={SettingsIcon}
          title="Customize HV-Check"
          description="Configure modules and parameters for your specific diagnostic needs."
          linkTo="/customize"
        />
        <FeatureCard
          icon={PlayIcon}
          title="Start HV-Check"
          description="Begin a new high-voltage check with your customized settings."
          linkTo="/start-check"
        />
        <FeatureCard
          icon={FileTextIcon}
          title="View Reports"
          description="Access and manage all your generated HV-Check reports."
          linkTo="/reports"
        />
      </div>
    </div>
  );
};

export default Index;