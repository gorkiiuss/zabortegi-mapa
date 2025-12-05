// src/shared/components/CardShell.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardShellProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const CardShell = ({ title, icon, children, className }: CardShellProps) => (
  <div 
    className={cn(
      "rounded-xl border border-slate-200 bg-white shadow-sm p-4", 
      className
    )}
  >
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
      {icon && <span className="text-slate-400">{icon}</span>}
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);