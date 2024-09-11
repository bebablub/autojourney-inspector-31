import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ProfileOption = ({ title, description, linkTo }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Link to={linkTo}>
        <Button variant="outline" className="w-full">Go to {title}</Button>
      </Link>
    </CardContent>
  </Card>
);

const Profile = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProfileOption
          title="Customize"
          description="Configure your diagnostic settings"
          linkTo="/customize"
        />
        <ProfileOption
          title="Reports"
          description="View your diagnostic reports"
          linkTo="/reports"
        />
        <ProfileOption
          title="Account"
          description="Manage your account settings"
          linkTo="/account"
        />
        <ProfileOption
          title="Hardware"
          description="Manage your diagnostic hardware"
          linkTo="/hardware"
        />
      </div>
    </div>
  );
};

export default Profile;