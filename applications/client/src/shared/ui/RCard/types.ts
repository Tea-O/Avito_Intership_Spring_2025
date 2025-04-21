import React from "react";

export interface RCardProps {
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}