import React from 'react';

interface FieldWrapperProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

export const FieldWrapper = ({ label, error, children, required, className = "" }: FieldWrapperProps) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    {/* min-h-[42px] asegura estabilidad visual entre texto (lectura) e inputs (escritura) */}
    <div className="min-h-[42px] flex items-center text-slate-700 text-sm">
      {children}
    </div>
    {error && <span className="text-xs text-red-500 font-medium animate-pulse">{error}</span>}
  </div>
);