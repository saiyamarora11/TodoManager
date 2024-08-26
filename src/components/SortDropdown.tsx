import React from 'react';
import { SortOptions } from '../types/userTable';

type SortDropdownProps = {
  onSelect: (sort: SortOptions) => void;
};

const SortDropdown: React.FC<SortDropdownProps> = ({ onSelect }) => {
  const sortOptions: SortOptions[] = [SortOptions.Name, SortOptions.Priority, SortOptions.Date];

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn h-8 mb-2">Sort</button>
      <ul tabIndex={0} className="dropdown-container">
        {sortOptions.map((sort) => (
          <li key={sort} className="dropdown-item">
            <div onClick={() => onSelect(sort)} className="flex items-center">
              <span>{sort}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortDropdown;
