import { ButtonHTMLAttributes } from 'react';

export interface RButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
