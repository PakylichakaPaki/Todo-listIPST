import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  selectedDate: Date;
  onChange: (date: Date | null) => void; // Разрешаем null
}

const CustomDatePicker: React.FC<DatePickerProps> = ({ selectedDate, onChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => onChange(date ?? new Date())} // Заменяем null на текущую дату
      className="border rounded p-2"
      dateFormat="yyyy-MM-dd"
    />
  );
};


export default CustomDatePicker;