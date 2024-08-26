import React, { ChangeEvent, useState } from 'react';
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDateFilterTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newFilterType = event.target.value as DateFilterType;
    onDateFilterTypeChange(newFilterType);
    onFilterChange(FilterOptions.Date);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    let updatedPriorities = [...selectedPriorities];
    if (checked) {
      updatedPriorities.push(value as Priority);
    } else {
      updatedPriorities = updatedPriorities.filter((priority) => priority !== value);
    }
    onPrioritiesChange(updatedPriorities);
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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
        <div className="dropdown mt-4">
          <label
            tabIndex={0}
            className="btn m-1"
            onClick={toggleDropdown}
          >
            {selectedPriorities.length > 0 ? selectedPriorities.join(', ') : 'Select Priority'}
          </label>
          {dropdownOpen && (
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow z-[100] bg-base-100 rounded-box w-52 ">
              {Object.values(Priority).map(priority => (
                <li key={priority}>
                  <label className="cursor-pointer label" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      value={priority}
                      checked={selectedPriorities.includes(priority)}
                      onChange={handlePriorityChange}
                      className="checkbox"
                    />
                    <span className="label-text">{priority}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterInput;
