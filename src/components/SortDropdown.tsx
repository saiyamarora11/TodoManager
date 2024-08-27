import React, { useState } from 'react';
import { SortOptions } from '../types/userTable';
import { handleClick } from '../utils/general';

type SortDropdownProps = {
  onSelect: (sort: SortOptions) => void;
};

const SortDropdown: React.FC<SortDropdownProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sortOptions: SortOptions[] = [SortOptions.Name, SortOptions.Priority, SortOptions.Date];

  const handleSelect = (sort: SortOptions) => {
    onSelect(sort);
    setIsOpen(false); 
  };

  return (
    <div className="dropdown dropdown-end">
      <button 
        tabIndex={0} 
        className="btn h-8 mb-2"
        onClick={() => setIsOpen(!isOpen)} 
      >
        Sort
      </button>
      {isOpen && (
        <ul onClick={handleClick} tabIndex={0} className="dropdown-container">
          {sortOptions.map((sort) => (
            <li key={sort} className="dropdown-item">
              <div onClick={() => handleSelect(sort)} className="flex items-center">
                <span>{sort}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
