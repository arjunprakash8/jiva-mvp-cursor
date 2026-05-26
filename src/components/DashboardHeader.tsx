import React from 'react';
import Header from './Header';
import ConnectionBanner from './ConnectionBanner';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  userInitial?: string;
}

export default function DashboardHeader({ title, subtitle, userInitial }: DashboardHeaderProps) {
  return (
    <>
      <Header title={title} subtitle={subtitle} userInitial={userInitial} />
      <ConnectionBanner />
    </>
  );
}
