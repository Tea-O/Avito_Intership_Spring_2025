import { TextareaHTMLAttributes } from 'react';

export interface RTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  children: React.ReactNode;
}

