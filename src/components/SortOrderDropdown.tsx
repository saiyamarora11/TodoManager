import React from 'react';
import { OrderBy, SortType } from '../types/userTable'; 

type SortOrderDropdownProps = {
  sortOrder: OrderBy;
  sortType: SortType; 
  onOrderChange: (order: OrderBy) => void;
  onTypeChange: (type: SortType) => void;
};

const SortOrderDropdown: React.FC<SortOrderDropdownProps> = ({
  sortOrder,
  sortType,
  onOrderChange,
  onTypeChange,
}) => {
  const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onOrderChange(event.target.value as OrderBy);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onTypeChange(event.target.value as SortType);
  };

  return (
    <div className="mt-4 relative">
      <label className="text-white text-sm">Sort Options:</label>
      <div className="flex flex-col mt-2 space-y-2">
        <div className="flex items-center gap-x-4">
          <select
            value={sortType}
            onChange={handleTypeChange}
            className="select-container"
          >
            <option value="name">By Name</option>
            <option value="priority">By Priority</option>
            <option value="date">By Date</option>
          </select>
          <select
            value={sortOrder}
            onChange={handleOrderChange}
            className="select-container"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SortOrderDropdown;
