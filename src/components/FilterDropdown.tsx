// FilterDropdown.tsx
import React from 'react';
import { FilterOptions } from "../types/userTable";
import { handleClick } from '../utils/general';

type FilterDropdownProps = {
  onSelect: (filter: FilterOptions) => void;
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onSelect }) => {
  const filterOptions: FilterOptions[] = [FilterOptions.Name, FilterOptions.Priority, FilterOptions.Date];

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn mb-2">Filter</div>
      <ul onClick={handleClick} tabIndex={0} className="dropdown-container">
        {filterOptions.map((filter) => (
          <li key={filter}>
            <a onClick={() => onSelect(filter)}>{filter}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterDropdown;
