import React, { useState } from 'react';

interface ChipSelectProps {
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  label: string;
  placeholder?: string;
  search?: boolean;
  ariaLabel?: string;
}

const ChipSelect: React.FC<ChipSelectProps> = ({ options, selected, onChange, label, placeholder, search = true, ariaLabel }) => {
  const [query, setQuery] = useState('');
  const filteredOptions = search
    ? options.filter(opt => opt.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const handleRemove = (value: string) => {
    onChange(selected.filter(v => v !== value));
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-foreground mb-2">{label}</label>
      {search && (
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder || 'Search...'}
          className="w-full px-3 py-2 mb-2 bg-card text-foreground rounded-lg border border-border focus:border-accent focus:outline-none"
          aria-label={ariaLabel || label}
        />
      )}
      <div className="flex flex-wrap gap-2">
        {filteredOptions.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleToggle(opt.value)}
            className={`px-3 py-1 rounded-full border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent ${
              selected.includes(opt.value)
                ? 'bg-accent text-accent-foreground border-accent shadow'
                : 'bg-card text-muted border-border hover:bg-muted'
            }`}
            aria-pressed={selected.includes(opt.value)}
            aria-label={opt.label}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map(val => {
            const opt = options.find(o => o.value === val);
            return (
              <span key={val} className="flex items-center bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                {opt?.label || val}
                <button
                  type="button"
                  onClick={() => handleRemove(val)}
                  className="ml-2 text-accent-foreground hover:text-destructive focus:outline-none"
                  aria-label={`Remove ${opt?.label || val}`}
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChipSelect; 