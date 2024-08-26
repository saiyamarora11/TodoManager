import React, { ChangeEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import { DateFilterType, FilterOptions, Priority } from '../types/userTable';
import { XMarkIcon } from "@heroicons/react/24/solid";

type FilterInputProps = {
  selectedFilter: FilterOptions | '';
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedPriorities: Priority[];
  onPrioritiesChange: (priorities: Priority[]) => void;
  onFilterChange: (filter: FilterOptions) => void; 
  dateFilterType: DateFilterType;
  onDateFilterTypeChange: (filterType: DateFilterType) => void;
};

const FilterInput: React.FC<FilterInputProps> = ({
  selectedFilter,
  searchTerm,
  onSearchChange,
  selectedPriorities,
  onPrioritiesChange,
  onFilterChange,
  dateFilterType,
  onDateFilterTypeChange
}) => {
  const handleDateFilterTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newFilterType = event.target.value as DateFilterType;
    onDateFilterTypeChange(newFilterType);
    onFilterChange(FilterOptions.Date);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const handlePriorityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as Priority;
    const updatedPriorities = event.target.checked
      ? [...selectedPriorities, value]
      : selectedPriorities.filter(priority => priority !== value);
    onPrioritiesChange(updatedPriorities);
    onFilterChange(FilterOptions.Priority); 
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      onSearchChange(date.toISOString().split('T')[0]); 
    } else {
      onSearchChange('');
    }
  };

  const handleClearDate = () => {
    onSearchChange(''); 
  };

  return (
    <div>
      {selectedFilter === FilterOptions.Date && (
        <div className='flex gap-x-4 items-center mt-4'>
          <label htmlFor="dateFilterType">Date Filter Type:</label>
          <select
            id="dateFilterType"
            className='select-container w-1/3'
            value={dateFilterType}
            onChange={handleDateFilterTypeChange}
          >
            <option value={DateFilterType.Is}>Is</option>
            <option value={DateFilterType.IsBefore}>Is Before</option>
            <option value={DateFilterType.IsAfter}>Is After</option>
          </select>
          <div className='relative'>
            <DatePicker
              selected={searchTerm ? new Date(searchTerm) : null}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd" 
              className='rounded-md p-2'
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearDate}
                className='absolute top-3 right-2'
              >
                <XMarkIcon className="size-4 text-white" />
              </button>
            )}
          </div>
        </div>
      )}

      {selectedFilter === FilterOptions.Name && (
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          className='input-container'
          onChange={handleSearchChange}
        />
      )}

      {selectedFilter === FilterOptions.Priority && (
        <div className='mt-4'>
          <label className='block mb-2'>Select Priorities:</label>
          <div className='flex flex-col'>
            {Object.values(Priority).map(priority => (
              <label key={priority} className='flex items-center'>
                <input
                  type="checkbox"
                  value={priority}
                  checked={selectedPriorities.includes(priority)}
                  onChange={handlePriorityChange}
                  className='mr-2'
                />
                {priority}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterInput;
