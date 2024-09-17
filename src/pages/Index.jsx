import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightIcon, ActivityIcon, Settings2Icon, FileTextIcon, WrenchIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, linkTo }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card className="flex flex-col justify-between h-full transition-all duration-300 hover:shadow-lg bg-card text-card-foreground cursor-pointer" onClick={() => navigate(linkTo)}>
        <CardHeader>
          <Icon className="w-12 h-12 mb-2 text-primary" />
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full group">
            Get Started
            <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="text-center pt-8">
        <div className="flex justify-center mb-6">
          <ActivityIcon className="w-24 h-24 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Welcome to HV-Check Diagnostic Tool</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Empower your automotive diagnostics with our comprehensive tool for modern vehicles.
        </p>
        <Button size="lg" onClick={() => navigate('/start-check')} className="mb-8">
          Start AI-Powered Vehicle Check
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <FeatureCard
          icon={Settings2Icon}
          title="Customize HV-Check"
          description="Configure modules and parameters for your specific diagnostic needs."
          linkTo="/customize"
        />
        <FeatureCard
          icon={WrenchIcon}
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
