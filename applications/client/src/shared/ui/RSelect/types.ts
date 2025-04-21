import React from "react";

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface RSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
}
