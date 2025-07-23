import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (start: Date | null, end: Date | null) => void;
  required?: boolean;
  error?: string;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
  required,
  error,
  className = '',
}) => (
  <div className={`flex gap-2 ${className}`}>
    <DatePicker
      selected={startDate}
      onChange={date => onChange(date, endDate)}
      selectsStart
      startDate={startDate}
      endDate={endDate}
      placeholderText="Start Date"
      className="p-2 border rounded text-foreground bg-[#23272f] border-[#444a54] focus:outline-none focus:ring-2 focus:ring-accent"
      aria-label="Start Date"
      aria-required={required}
      aria-invalid={!!error}
    />
    <DatePicker
      selected={endDate}
      onChange={date => onChange(startDate, date)}
      selectsEnd
      startDate={startDate}
      endDate={endDate}
      placeholderText="End Date"
      className="p-2 border rounded text-foreground bg-[#23272f] border-[#444a54] focus:outline-none focus:ring-2 focus:ring-accent"
      aria-label="End Date"
      aria-required={required}
      aria-invalid={!!error}
    />
  </div>
); 