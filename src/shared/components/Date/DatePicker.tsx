import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({ selectedDate, onChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      className="border rounded p-2"
      dateFormat="yyyy-MM-dd"
    />
  );
};

export default CustomDatePicker;