import React from 'react';
import { SortOptions } from '../types/userTable';
import { handleClick } from '../utils/general';

type SortDropdownProps = {
  onSelect: (sort: SortOptions) => void;
};

const SortDropdown: React.FC<SortDropdownProps> = ({ onSelect }) => {
  const sortOptions: SortOptions[] = [SortOptions.Name, SortOptions.Priority, SortOptions.Date];

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn h-8 m-1">Sort</div>
      <ul onClick={handleClick} tabIndex={0} className="dropdown-container">
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
