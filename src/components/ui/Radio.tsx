import React from 'react';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className = '', ...props }, ref) => (
    <label className={`inline-flex items-center gap-2 cursor-pointer select-none text-foreground ${className}`}>
      <input
        ref={ref}
        type="radio"
        className="appearance-none w-5 h-5 rounded-full border border-[#444a54] bg-[#23272f] checked:bg-accent checked:border-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-150"
        {...props}
      />
      {label && <span className="text-sm">{label}</span>}
    </label>
  )
);
Radio.displayName = 'Radio'; 